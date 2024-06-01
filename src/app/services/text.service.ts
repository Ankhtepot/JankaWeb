import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  _textMap: Map<T, string> = new Map<T, string>();

  constructor() {
    this.populateTextMap();
  }

  public get(textEnum: T): string {
    if (this._textMap.has(textEnum)) {
      return this._textMap.get(textEnum);
    } else {
      console.log('Text not found for key: ' + textEnum);
      return '>>text not found<<';
    }
  }

  private populateTextMap() {
    Object.keys(T).forEach(key => {
      this._textMap.set(T[key as keyof typeof T], T[key as keyof typeof T]);
    });
  }
}

export enum T {
  aboutMe = 'O me',
  services = 'Sluzby',
  contact = 'Kontakt'
}

