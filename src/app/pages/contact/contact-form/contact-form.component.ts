import {Component} from '@angular/core';
import {T} from "../../../services/text.service";
import {FormGroup} from "@angular/forms";
import emailjs, {EmailJSResponseStatus} from 'emailjs-com';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const body = {
        to_name: 'Janka',
        web_name: 'JolyArt',
        from_name: this.contact.name,
        email: this.contact.email,
        message: this.contact.message
      };

      emailjs.send(
        environment.emailServiceId,
        environment.emailTemplateId,
        body,
        environment.emailUserId)
        .then((response: EmailJSResponseStatus) => {
          console.log('SUCCESS!', response.status, response.text);
          alert(T.email_sent_success);
        }, (error) => {
          console.log('FAILED...', error);
          alert(T.email_sent_failed);
        });
    }
  }

  protected readonly T = T;
}
