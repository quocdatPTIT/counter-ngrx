// Angular
// -----------------------------------------------------------------------------------------------------
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../environments/environment";

// Models
// -----------------------------------------------------------------------------------------------------
import {LoginPayloadRes} from "./models/login-payload-res.model";
import {User} from "../shared/models/user.model";

// Rxjs
// -----------------------------------------------------------------------------------------------------
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginPayloadRes> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`;
    const reqBodyPayload = { email, password, returnSecureToken: true };
    return this.http.post<LoginPayloadRes>(url, reqBodyPayload);
  }

  formatUser(data: LoginPayloadRes): User {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    return new User(data.email, data.idToken, data.localId, expirationDate);
  }
}
