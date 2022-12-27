import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
})
export class EmailFormComponent {
  @Input() email!: Email;

  emailForm!: FormGroup;

  ngOnInit() {
    const { subject, from, to, text } = this.email;

    this.emailForm = new FormGroup({
      subject: new FormControl(subject),
      from: new FormControl(from),
      to: new FormControl(to),
      text: new FormControl(text),
    });
  }
}
