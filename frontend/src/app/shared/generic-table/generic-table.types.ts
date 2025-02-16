export interface Column<T> {
  name: string;
  headerValue: string;
  rowValue?(element: T, index?: number): string | Date | number;
  filterable?: boolean;
  filterType?: 'text' | 'date' | 'datetime-local' | 'time';
  rowValueStyle?(element: T): string;
  sort?: boolean;
  backgroundColor?(element: T): string;
}

export interface Action {
  name: string;
  label: string;
  icon: string;
  color?: string;

  hidden?(element: any): boolean;
}

export interface Pagination {
  totalElements?: number,
  size?: number,
  number?: number,
  numberOfElements?: number,
  totalPages?: number,
}

export interface Page<Item> extends Pagination {
  content: Item[],
}
