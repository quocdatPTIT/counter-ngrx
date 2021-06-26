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

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {autoLogout} from "./store/auth.action";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

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

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  getUserInLocalStorage() {
    const userString = localStorage.getItem('userData');
    if (userString) {
      const userData = JSON.parse(userString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }

    return null;
  }

  private runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
    }, timeInterval);
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
