import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AsyncValidatorFn,
} from '@angular/forms';
import { MatchPasswords } from '../validators/match-passwords';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  authForm: FormGroup = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate as AsyncValidatorFn]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPasswords.validate] }
  );

  constructor(
    private matchPasswords: MatchPasswords,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signup(this.authForm.value).subscribe({
      next: (res) => {
        // navigate to route
      },
      error: (err) => {
        if (!err.status) {
          // set err to form errors to read them in template
          this.authForm.setErrors({ connectionError: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
