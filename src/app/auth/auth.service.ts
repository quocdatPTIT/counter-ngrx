// Angular
// -----------------------------------------------------------------------------------------------------
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../environments/environment";

// Models
// -----------------------------------------------------------------------------------------------------
import {ResLoginPayload} from "./models/res-login-payload.model";

// Rxjs
// -----------------------------------------------------------------------------------------------------
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<ResLoginPayload> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`;
    const reqBodyPayload = { email, password, returnSecureToken: true };
    return this.http.post<ResLoginPayload>(url, reqBodyPayload);
  }
}
