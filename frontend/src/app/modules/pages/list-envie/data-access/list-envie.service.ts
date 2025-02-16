import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {ListEnvieDto} from "./list-envie.model";

@Injectable({
  providedIn: 'root'
})
export class ListEnvieService {
  private apiUrl = environment.server + '/list-envie';

  constructor(
    private http: HttpClient
  ) {
  }

  addProductToList(userId: number, productId: number): Observable<any> {
    return this.http.post<any>(this.apiUrl + `/${userId}/${productId}`, {});
  }

  deleteProductFromList(userId: number, productId: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + `/${userId}/remove/${productId}`);
  }

  findByUserId(userId: number): Observable<ListEnvieDto> {
    return this.http.get<ListEnvieDto>(this.apiUrl + `/${userId}`);
  }
}
