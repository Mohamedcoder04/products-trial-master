import {Component, inject, OnInit} from "@angular/core";
import {ProductsService} from "app/modules/pages/products/data-access/products.service";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {MatTableDataSource} from "@angular/material/table";
import {ProductDto} from "../data-access/product.model";
import {Action, Column} from "../../../../shared/generic-table/generic-table.types";
import {GenericTableComponent} from "../../../../shared/generic-table/generic-table.component";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {NewEditProductComponent} from "../new-edit-product/new-edit-product.component";
import {TokenService} from "../../../../core/auth/token.service";
import {NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {ConfirmDialogComponent} from "../../../../shared/confirmation-dialog/confirmation-dialog.component";
import {ListEnvieService} from "../../list-envie/data-access/list-envie.service";
import {PanierService} from "../../panier/data-access/panier.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, GenericTableComponent, MatIcon, NgIf],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
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
      rowValue: element => +element.price,
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
  isAdmin: boolean = false;
  actions: Action[] = [
    {
      name: 'ajouter',
      label: 'Ajouter',
      icon: 'heroicons_solid:panier',
      color: 'text-green-500'
    },
    {
      name: 'save',
      label: 'Enregistrer',
      icon: 'heroicons_solid:favoris',
      color: 'text-gray-500'
    },
    {
      name: 'update',
      label: 'Modifier',
      icon: 'heroicons_solid:pencil-square',
      color: 'text-blue-500',
      hidden: () => !this.isAdmin
    },
    {
      name: 'delete',
      label: 'Supprimer',
      icon: 'heroicons_solid:trash',
      color: 'text-red-500',
      hidden: () => !this.isAdmin
    }
  ]

  constructor(
    private _matDialog: MatDialog,
    private _tokenService: TokenService,
    private _toastrService: ToastrService,
    private _listEnvieService: ListEnvieService,
    private _panierService: PanierService
  ) {
  }

  ngOnInit() {
    this.findAllProducts();

    this.isAdmin = this._tokenService.isAdmin();
  }

  findAllProducts() {
    this.productsService.get().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  openAddEditProudct(data?: ProductDto) {
    const dialog = this._matDialog.open(NewEditProductComponent, {
      data: data,
      disableClose: true
    })

    dialog.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.findAllProducts();
        }
      }
    })
  }

  triggerActions(event: { action: string; row: any }) {
    if (event.action === 'update') {
      this.openAddEditProudct(event.row);
    } else if (event.action === 'delete') {
      this.deleteProduct(event.row);
    } else if (event.action === 'save') {
      this.addProductToListEnvie(event.row);
    } else if (event.action === 'ajouter') {
      this.addProductToPanier(event.row);
    }
  }

  private deleteProduct(row: ProductDto) {
    const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmation',
        message: 'Êtes-vous sûr de vouloir Supprimer le product ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.delete(row.id).subscribe({
          next: () => {
            this._toastrService.success('Product deleted successfully.');
            this.findAllProducts();
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    });


  }

  private addProductToListEnvie(row: ProductDto) {
    this._listEnvieService.addProductToList(
      this._tokenService.userId, row.id
    ).subscribe({
      next: () => {
        this._toastrService.success('Product added successfully.');
      },
      error: (err) => {
        this._toastrService.info(err.error.message);
      }
    })
  }

  private addProductToPanier(row: ProductDto) {
    this._panierService.addProductToPanier(
      this._tokenService.userId,
      row.id
    ).subscribe({
      next: () => {
        this._panierService.addToPanier.next(true);
      }
    })
  }
}
