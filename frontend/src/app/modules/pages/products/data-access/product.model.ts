export interface ProductDto {
  id: number;
  code: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
  internalReference: string;
  shellId: number;
  inventoryStatus: InventoryStatus;
  rating: number;
  createdAt: number;
  updatedAt: number;
}

export enum InventoryStatus {
  "INSTOCK", "LOWSTOCK", "OUTOFSTOCK"
}
