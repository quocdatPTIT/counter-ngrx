// Angular
// -----------------------------------------------------------------------------------------------------
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../environments/environment";

// Models
// -----------------------------------------------------------------------------------------------------
import {AuthPayloadRes} from "./models/auth-payload-res.model";
import {User} from "../shared/models/user.model";

// Rxjs
// -----------------------------------------------------------------------------------------------------
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthPayloadRes> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`;
    const reqBodyPayload = { email, password, returnSecureToken: true };
    return this.http.post<AuthPayloadRes>(url, reqBodyPayload);
  }

  signUp(email: string, password: string): Observable<AuthPayloadRes> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`;
    const reqBodyPayload = { email, password, returnSecureToken: true };
    return this.http.post<AuthPayloadRes>(url, reqBodyPayload);
  }

  formatUser(data: AuthPayloadRes): User {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    return new User(data.email, data.idToken, data.localId, expirationDate);
  }

  getErrorMessage(message: string): string {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      case 'INVALID_PASSWORD':
        return 'Invalid password';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }
}
