import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.scss'],
})
export class EmailCreateComponent {
  showModal = false;
  email: Email;

  constructor(
    private authService: AuthService,
    private emailService: EmailService
  ) {
    this.email = {
      id: '',
      subject: '',
      to: '',
      from: `${this.authService.username}@angular-email.com`,
      html: '',
      text: '',
    };
  }

  onSubmit(email: Email) {
    // send email using email service
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
