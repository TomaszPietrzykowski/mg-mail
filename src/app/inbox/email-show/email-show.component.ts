import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.scss'],
})
export class EmailShowComponent {
  email: Email;

  constructor(private route: ActivatedRoute) {
    // 1. initialize with snapshot
    this.email = this.route.snapshot.data['email'];
    // 2. subscribe for changes
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    });
  }

  ngOnInit() {}
}
