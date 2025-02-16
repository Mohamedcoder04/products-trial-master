import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TokenService} from "./token.service";
import {BehaviorSubject, Observable, of, switchMap, throwError} from "rxjs";
import {AuthenticationRequest, AuthenticationResponse, RegistrationRequest} from "./auth.types";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {
  public _authenticated: boolean = false;
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private _tokenService = inject(TokenService);
  private loggedIn = new BehaviorSubject<boolean>(!this._tokenService.isTokenNotValid());
  isLogged = this.loggedIn.asObservable();
  private apiUrl = environment.server;

  signIn(request: AuthenticationRequest): Observable<any> {
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }
    return this._httpClient.post<AuthenticationResponse>(this.apiUrl + '/token', request).pipe(
      switchMap((response: any) => {
        this._authenticated = true;
        this.loggedIn.next(true);
        this._tokenService.token = response.token;
        return of(response);
      }),
    );
  }

  signOut() {
    localStorage.clear();
    this.loggedIn.next(false);
    this._authenticated = false;
    this._router.navigate(['sign-in']);
  }

  signUp(request: RegistrationRequest): Observable<any> {
    return this._httpClient.post(this.apiUrl + '/account', request);
  }

}
