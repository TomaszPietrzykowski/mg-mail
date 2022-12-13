import { Injectable } from '@angular/core';
import { FormControl, AsyncValidator } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: FormControl) => {
    const { value } = control;
    return (
      this.authService
        .usernameAvailable(value)
        // if username unavailable no value will be returned, error will be emited and no operators called
        // only case map is called is when response is success - no check within map needed
        // check on error with catchError required instead
        .pipe(
          map(() => null),
          catchError((err) => {
            // of() as shortcut for creating new Observable()
            if (err.error.username) {
              return of({
                nonUniqueUsername: true,
              });
            } else {
              return of({ connectionError: true });
            }
          })
        )
    );
  };
}
