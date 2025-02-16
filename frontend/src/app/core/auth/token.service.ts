import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtHelper = new JwtHelperService();
  private decodedJwt: any;

  constructor() {
  }


  set token(token: string) {
    localStorage.setItem("token", token);
  }

  get token(): string {
    return localStorage.getItem("token") as string;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  private isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }

    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  private getEmail(): string {
    this.decodedJwt = this.jwtHelper.decodeToken(this.token);
    return this.decodedJwt.email;
  }

  get userId(): number {
    this.decodedJwt = this.jwtHelper.decodeToken(this.token);
    return this.decodedJwt.userId;
  }

  isAdmin(): boolean {
    return this.getEmail() === 'admin@admin.com';
  }

}
