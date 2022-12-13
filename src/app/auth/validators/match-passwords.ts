import { Injectable } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MatchPasswords implements Validator {
  validate(formGroup: AbstractControl) {
    const { password, passwordConfirmation } = formGroup.value;
    if (password === passwordConfirmation) {
      return null;
    } else {
      return {
        passwordsDontMatch: true,
        values: { password, passwordConfirmation },
      };
    }
  }
}
