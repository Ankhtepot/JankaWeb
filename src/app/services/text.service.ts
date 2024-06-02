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
  aboutMe_anchor = 'O me',
  services_anchor = 'Sluzby',
  services_header = '>Placeholder co nabizim<',
  contact_anchor = 'Kontakt',
  about_me = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis posuere morbi leo urna molestie at. Mattis vulputate enim nulla aliquet. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque purus semper eget duis. Diam volutpat commodo sed egestas egestas fringilla. Pretium quam vulputate dignissim suspendisse in est ante in. Tincidunt dui ut ornare lectus. Donec ac odio tempor orci dapibus ultrices in iaculis. Id velit ut tortor pretium viverra suspendisse potenti. Varius sit amet mattis vulputate enim nulla. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.\\n"' +
    '      "\\n"' +
    '      "Rhoncus dolor purus non enim praesent elementum facilisis leo. Amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Quam vulputate dignissim suspendisse in. Arcu ac tortor dignissim convallis. Tincidunt dui ut ornare lectus sit amet. Vitae turpis massa sed elementum tempus egestas sed. Ac odio tempor orci dapibus. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Faucibus ornare suspendisse sed nisi lacus. Massa eget egestas purus viverra accumsan in nisl nisi. Cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Habitant morbi tristique senectus et netus et. Consequat interdum varius sit amet. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Ridiculus mus mauris vitae ultricies leo. Quisque sagittis purus sit amet volutpat consequat. Ut ornare lectus sit amet est placerat in egestas erat.\\n"' +
    '      "\\n"' +
    '      "In nisl nisi scelerisque eu ultrices vitae. Tellus rutrum tellus pellentesque eu tincidunt tortor. Quis risus sed vulputate odio ut enim blandit volutpat. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Elit eget gravida cum sociis. Tristique nulla aliquet enim tortor at auctor urna. Et odio pellentesque diam volutpat. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Neque sodales ut etiam sit amet nisl purus in. Diam phasellus vestibulum lorem sed. Aliquam faucibus purus in massa tempor. Nisi est sit amet facilisis magna etiam tempor orci. Ultricies integer quis auctor elit sed vulputate mi sit. Hac habitasse platea dictumst quisque. Ut lectus arcu bibendum at. Vitae proin sagittis nisl rhoncus mattis. Quis varius quam quisque id diam vel quam. Eget mi proin sed libero. Egestas congue quisque egestas diam in arcu."',
  paintings_header = '>Placeholder for paintings<',
  paintings_subtitle = '>Placeholder for painting subtitle<',
  paintings_footer_message = '>Placeholder for painting footer message<',
  photography_header = '>Placeholder for photography<',
  photography_subtitle = '>Placeholder for photography subtitle<',
  photography_footer_message = '>Placeholder for photography footer message<',
  photography_category_1 = '>Placeholder for category 1<',
  photography_category_2 = '>Placeholder for category 2<',
  photography_category_3 = '>Placeholder for category 3<',
  photography_category_4 = '>Placeholder for category 4<',
  candles_header = '>Placeholder for candles<',
  candles_subtitle = '>Placeholder for candles subtitle<',
  candles_footer_message = '>Placeholder for candles footer message<',
  write_me = '>Placeholder for write me<',
  p404_Title = '>Placeholder for 404 title<',
  p404_Message = '>Placeholder for 404 message<',
  go_home = '>Placeholder for go home<',
}

