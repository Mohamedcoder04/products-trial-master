import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Action, Column, Pagination} from "./generic-table.types";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, Subscription} from "rxjs";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import {CommonModule} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSort, Sort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, MatRippleModule, MatIconModule, MatMenuModule, MatButtonModule, ReactiveFormsModule, MatPaginatorModule, MatProgressBarModule, MatSort],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss'
})
export class GenericTableComponent implements OnInit, AfterViewInit {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() columns!: Column<any>[];
  @Input() includeConfigColumns!: boolean;
  @Input() includeFilters!: boolean;
  @Input() includePagination: boolean = true;
  @Input() actions!: Action[];
  @Input() notDisplayedColumns: String[] = [];
  @Output() actionTaken = new EventEmitter<{ action: string, row: any }>();
  @Input() pagination!: Pagination;
  @Output() pageChange = new EventEmitter<{ page: PageEvent, filterValue: any }>();
  @Output() filterChange = new EventEmitter<{ page: Pagination, filterValue: any }>;
  filterForm!: FormGroup;
  @Input() includeSelection!: boolean;
  @Input() isFilterMaxWidth!: boolean;
  displayedColumns!: String[];
  displayedFilters!: any[];
  formValue: any = {};
  subscriptions: Subscription[] = [];
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @Output() rowSelected = new EventEmitter<any>();
  selection = new SelectionModel<any>(true, []);
  @Output() sortChange = new EventEmitter<Sort>();

  constructor(
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initializeDisplayedColumnsAndFilters();
    this.initializeFilterForm();
  }

  ngAfterViewInit() {
    if (!this.pagination) {
      this.dataSource.paginator = this.paginator;
    }

  }


  selectRow(row: any) {
    this.selection.toggle(row);
    this.rowSelected.emit({isChecked: this.selection.isSelected(row), element: row});
  }

  initializeDisplayedColumnsAndFilters() {
    this.displayedColumns = this.columns.map(column => column.name).filter(column => !this.notDisplayedColumns.includes(column));
    this.displayedFilters = this.columns.map(column => ({
      value: column.name,
      columnValue: column.name + 'Filter',
      viewValue: column.filterable ? column.headerValue : '',
      type: column.filterType
    })).filter(column => !this.notDisplayedColumns.includes(column.value));
    if (this.actions) {
      this.appendActionsToColumnsAndFilters();
    }
  }

  appendActionsToColumnsAndFilters() {
    this.displayedColumns.push('actions');
    this.displayedFilters.push({
      value: 'actions',
      columnValue: 'actionsFilter',
      viewValue: ''
    });
  }

  initializeFilterForm() {
    this.columns.forEach(result => {
      this.formValue[result.name] = [''];
    });
    this.filterForm = this._formBuilder.group(this.formValue);
    Object.keys(this.filterForm.controls).forEach(controlName => {
      this.subscribeToControl(controlName);
    });
  }

  takeAction(action: string, row: any) {
    this.actionTaken.emit({action, row})
  }

  getFilterColumnValues(columns: any) {
    return columns.map((column: { columnValue: any; }) => column.columnValue)
  }

  triggerPaginationChange(page: PageEvent) {
    this.pageChange.emit({
      page,
      filterValue: this.filterForm.value
    })
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }


  subscribeToControl(controlName: string) {
    const control = this.filterForm.get(controlName);
    if (control) {
      const subscription = control.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
        if (!this.pagination) {
          this.applyFilter(value);
        }
        if (this.pagination) {
          this.triggerFilter(value);
        }

      });

      this.subscriptions.push(subscription);
    } else {
      console.error(`Form control '${controlName}' not found.`);
    }
  }

  resetFilters($event?: FocusEvent) {
    this.filterForm.reset();
  }

  setupFilter(column: string) {
    if (!this.pagination) {
      this.resetFilters();
      this.dataSource.filterPredicate = (d: any, filter: string) => {
        const textToSearch = d[column] && d[column].toString().toLowerCase() || '';
        return textToSearch.indexOf(filter) !== -1;
      };
    }

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue?.trim()?.toLowerCase();
  }

  triggerFilter(value: string) {
    if (value) {
      this.filterChange.emit({
        page: {
          number: this.paginator.pageIndex,
          size: this.paginator.pageSize
        },
        filterValue: this.filterForm.value
      })
    } else {
      this.filterChange.emit({
        page: {
          number: 0,
          size: 5
        },
        filterValue: this.filterForm.value
      })
    }
  }

  protected readonly length = length;

  isAvailableActions(element: any) {
    return this.actions.some(action => !action.hidden || !action.hidden(element))
  }

}

