import { Pipe, PipeTransform } from '@angular/core';
import {TextService, T} from "../services/text.service";

export enum ETextStyle {
  Header = 'header',
}

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {

  constructor(private textService: TextService) {
  }

  transform(value: T, ...args: unknown[]): unknown {
    const text = this.textService.get(value);
    if (args.length > 0) {
      switch (args[0]) {
        case ETextStyle.Header:
          return '<span class="text-header">' + text + '</span>';
        default:
          return text;
      }
    } else {
      return text;
    }
  }
}
