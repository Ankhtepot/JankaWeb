import { Component } from '@angular/core';
import {T, TextService} from "../../services/text.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  protected readonly T = T;
  labelWidth: string = '100px'; // Default width

  constructor(private textService: TextService) { }

  getText(address_value: T) {
    return this.textService.get(address_value);
  }
}
