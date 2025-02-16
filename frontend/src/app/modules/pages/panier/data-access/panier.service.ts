import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ListEnvieDto} from "../../list-envie/data-access/list-envie.model";
import {PanierDto} from "./panier.model";

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  public addToPanier = new BehaviorSubject<boolean>(false);
  addToPanier$ = this.addToPanier.asObservable()
  private apiUrl = environment.server+'/panier';
  constructor(
    private http: HttpClient
  ) { }



  addProductToPanier(userId: number,productId: number) : Observable<any>{
    return this.http.post<any>(this.apiUrl+`/${userId}/${productId}`,{});
  }
  deleteProductFromPanier(userId: number,productId: number): Observable<any>{
    return this.http.delete<any>(this.apiUrl+`/${userId}/remove/${productId}`);
  }
  findByUserId(userId: number):Observable<PanierDto>{
    return this.http.get<PanierDto>(this.apiUrl+`/${userId}`);
  }
}
