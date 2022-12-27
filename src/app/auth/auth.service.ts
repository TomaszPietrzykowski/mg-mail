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

interface SigninResponse {
  username: string;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl: string = 'https://api.angular-email.com/auth/';
  signedIn$ = new BehaviorSubject<boolean | null>(null);
  username = '';

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}username`,
      {
        username,
      }
    );
  }

  // add options { withCtredentials: true } to stop angular from discarding cookies (moved to interceptor)
  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}signup`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedIn$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.rootUrl}signedin`).pipe(
      tap(({ authenticated, username }) => {
        this.signedIn$.next(authenticated);
        this.username = username;
      })
    );
  }

  signout() {
    return this.http.post(`${this.rootUrl}signout`, {}).pipe(
      tap(() => {
        this.signedIn$.next(false);
        this.username = '';
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http
      .post<SigninResponse>(`${this.rootUrl}signin`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedIn$.next(true);
          this.username = username;
        })
      );
  }
}
