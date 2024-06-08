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
  labelWidth: InputSignal<string> = input<string>('150px');
  canBeCopied: InputSignal<boolean> = input<boolean>(false);
  copyText: InputSignal<string> = input<string>('Copy');
  successCopyMessage: InputSignal<string> = input<string>('copied into the Clipboard!');

  isHovered = false;

  protected readonly T = T;
  protected readonly unassignedIcon = unassignedIcon;

  copyToClipboard() {
    const value = this.value();
    navigator.clipboard.writeText(value).then(() => {
      const message = `${value} ${this.successCopyMessage()}`;
      alert(message);
    });
  }
}
