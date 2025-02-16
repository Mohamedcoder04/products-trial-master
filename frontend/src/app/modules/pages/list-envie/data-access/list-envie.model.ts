import {ProductDto} from "../../products/data-access/product.model";

export interface ListEnvieDto {
  productsDtos: ProductDto[];
  userDto: any;
}

