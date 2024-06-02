import { Component } from '@angular/core';
import {T} from "../../../services/text.service";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
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

  protected readonly T = T;
}
