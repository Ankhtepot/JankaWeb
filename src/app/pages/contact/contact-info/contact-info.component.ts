import { Component, InputSignal, input } from '@angular/core';
import { T } from "../../../services/text.service";

const unassignedIcon = 'unassigned-icon';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent {
  label: InputSignal<string> = input<string>('label');
  value: InputSignal<string> = input<string>('value');
  icon: InputSignal<string> = input<string>(unassignedIcon);
  canBeCopied: InputSignal<boolean> = input<boolean>(false);
  labelWidth: InputSignal<string> = input<string>('150px'); // Default width

  protected readonly T = T;
  protected readonly unassignedIcon = unassignedIcon;
}
