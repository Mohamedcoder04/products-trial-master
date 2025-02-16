import {ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {NgForOf} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {ProductDto} from "../products/data-access/product.model";
import {Action, Column} from "../../../shared/generic-table/generic-table.types";
import {PanierService} from "./data-access/panier.service";
import {TokenService} from "../../../core/auth/token.service";
import {GenericTableComponent} from "../../../shared/generic-table/generic-table.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [
    MatMenuTrigger,
    MatMenu,
    NgForOf,
    GenericTableComponent
  ],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent implements OnInit, OnChanges {
  dataSource: MatTableDataSource<ProductDto> = new MatTableDataSource<ProductDto>();
  columns: Column<ProductDto>[] = [
    {
      name: 'name',
      headerValue: 'Name',
      rowValue: element => element.name,
    },
    {
      name: 'price',
      headerValue: 'Price',
      rowValue: element => element.price,
    }
  ];
  actions: Action[] = [
    {
      name: 'delete',
      label: 'Supprimer',
      icon: 'heroicons_solid:trash',
      color: 'text-red-500'
    }
  ]

  constructor(
    private _panierService: PanierService,
    private _tokenService: TokenService,
    private _toastrService: ToastrService,
    private _detecteChange: ChangeDetectorRef,
  ) {
    this._panierService.addToPanier$.subscribe(b => {
      if (b) {
        this.findPanierByUserId();
      }
    });

  }

  ngOnInit(): void {
    this.findPanierByUserId()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._detecteChange.detectChanges()
    this._detecteChange.markForCheck()
  }


  findPanierByUserId() {
    this._panierService.findByUserId(
      this._tokenService.userId
    ).subscribe({
      next: (data) => {
        this.dataSource.data = data?.productsDtos
      }
    })
  }

  triggerActions(event: { action: string; row: any }) {
    if (event.action === 'delete') {
      this.deleteProductFromPanier(event.row);
    }
  }

  private deleteProductFromPanier(row: ProductDto) {
    this._panierService.deleteProductFromPanier(
      this._tokenService.userId, row.id
    ).subscribe({
      next: () => {
        this._panierService.addToPanier.next(true);
      }
    })
  }
}
