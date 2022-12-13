import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    passwordConfirmation: new FormControl(''),
  });
}
