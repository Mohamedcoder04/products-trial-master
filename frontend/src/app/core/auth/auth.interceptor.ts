import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {TokenService} from "./token.service";

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  let newReq = req.clone({withCredentials: true});
  if (tokenService.token && !tokenService.isTokenNotValid()) {
    newReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + tokenService.token),
    });
  }
  return next(newReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401 :
          case 403 :
            authService.signOut();
        }
      }
      return throwError(error)
    })
  );
};
