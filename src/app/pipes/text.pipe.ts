import { Pipe, PipeTransform } from '@angular/core';
import {TextService, T} from "../services/text.service";

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {

  constructor(private textService: TextService) {
  }

  transform(value: T, ...args: unknown[]): unknown {
    return this.textService.get(value);
  }
}
