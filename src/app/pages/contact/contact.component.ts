import { Component } from '@angular/core';
import {T, TextService} from "../../services/text.service";
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  protected readonly T = T;
  labelWidth: string = '100px'; // Default width

  constructor(private textService: TextService, private seo: SeoService) {
    this.seo.update({
      title: 'Kontakt | Janka Zemianek',
      description: 'Kontaktujte Janku Zemianek. E-mail, telefon a dalsie kontaktne informacie.',
      path: '/contact',
      type: 'website'
    });
  }

  getText(address_value: T) {
    return this.textService.get(address_value);
  }
}
