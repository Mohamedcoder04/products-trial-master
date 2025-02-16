import {Component, OnInit} from '@angular/core';
import {ListEnvieService} from "./data-access/list-envie.service";
import {TokenService} from "../../../core/auth/token.service";
import {Action, Column} from "../../../shared/generic-table/generic-table.types";
import {MatTableDataSource} from "@angular/material/table";
import {ProductDto} from "../products/data-access/product.model";
import {GenericTableComponent} from "../../../shared/generic-table/generic-table.component";
import {ToastrService} from "ngx-toastr";
import {NgIf} from "@angular/common";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-envie',
  standalone: true,
  imports: [
    GenericTableComponent,
    NgIf
  ],
  templateUrl: './list-envie.component.html',
  styleUrl: './list-envie.component.scss'
})
export class ListEnvieComponent implements OnInit {
  dataSource: MatTableDataSource<ProductDto> = new MatTableDataSource<ProductDto>();
  columns: Column<ProductDto>[] = [
    {
      name: 'name',
      headerValue: 'Name',
      rowValue: element => element.name,
      filterable: true,
      filterType: 'text'
    },
    {
      name: 'category',
      headerValue: 'Category',
      filterable: true,
      rowValue: element => element.category,
      filterType: 'text'
    },
    {
      name: 'price',
      headerValue: 'Price',
      filterable: true,
      rowValue: element => element.price,
      filterType: 'text'
    },
    {
      name: 'rating',
      headerValue: 'Rating',
      filterable: true,
      rowValue: element => +element.rating,
      filterType: 'text'
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
    private _listEnvieService: ListEnvieService,
    private _tokenService: TokenService,
    private _toastrService: ToastrService,
    private _authService: AuthService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this._authService.isLogged.subscribe((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        this._router.navigate(['sign-in'])
      }
    })
    this.findListEnvieByUserId();
  }

  findListEnvieByUserId() {
    this._listEnvieService.findByUserId(
      this._tokenService.userId
    ).subscribe({
      next: (data) => {
        this.dataSource.data = data.productsDtos
      }
    })
  }


  triggerActions(event: { action: string; row: any }) {
    if (event.action === 'delete') {
      this.deleteProductFromList(event.row);
    }
  }

  private deleteProductFromList(row: ProductDto) {
    this._listEnvieService.deleteProductFromList(
      this._tokenService.userId,
      row.id
    ).subscribe({
      next: () => {
        this._toastrService.success('Product deleted successfully.');
        this.findListEnvieByUserId();
      }
    })
  }
}

