import { Component } from '@angular/core';
import {T} from "../../services/text.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  protected readonly T = T;
}
