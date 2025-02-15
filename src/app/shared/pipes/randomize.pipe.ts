import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomize'
})
export class RandomizePipe implements PipeTransform {
  transform<T>(array: T[]): T[] {
    return array.slice().sort(() => Math.random() - 0.5);
  }
}
