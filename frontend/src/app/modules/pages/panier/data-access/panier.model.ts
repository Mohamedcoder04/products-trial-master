import {ProductDto} from "../../products/data-access/product.model";

export interface PanierDto {
  productsDtos: ProductDto[];
  userDto: any;
}

