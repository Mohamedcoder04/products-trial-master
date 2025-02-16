import {inject, Injectable} from "@angular/core";
import {ProductDto} from "./product.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductsService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.server + "/products";


  public get(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(this.apiUrl);
  }

  public create(product: ProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(this.apiUrl, product);
  }

  public update(product: ProductDto): Observable<ProductDto> {
    return this.http.patch<ProductDto>(`${this.apiUrl}/${product.id}`, product);
  }

  public delete(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${productId}`);
  }
}
