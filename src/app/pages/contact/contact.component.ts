import { Component } from '@angular/core';
import {AUTO_STYLE} from "@angular/animations";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact = {
    meno: '',
    email: '',
    zprava: ''
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Sending email:', this.contact);
      // Implement email sending functionality here
    }
  }

  protected readonly AUTO_STYLE = AUTO_STYLE;
}
