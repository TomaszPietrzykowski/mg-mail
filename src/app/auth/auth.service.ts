import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  availaible: boolean;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SignupResponse {
  username: string;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl: string = 'https://api.angular-email.com/auth/';
  signedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}username`,
      {
        username,
      }
    );
  }

  // add options { withCtredentials: true } to stop angular from discarding cookies
  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}signup`, credentials)
      .pipe(
        tap(() => {
          this.signedIn$.next(true);
        })
      );
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.rootUrl}signedin`).pipe(
      tap(({ authenticated }) => {
        this.signedIn$.next(authenticated);
      })
    );
  }
}
