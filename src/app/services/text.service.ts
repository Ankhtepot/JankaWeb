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
  aboutMe_anchor = 'O me', // tlacitko na presun na stranku O me
  services_anchor = 'Sluzby', // tlacitko na presun na stranku Sluzby
  contact_anchor = 'Kontakt', // tlacitko na presun na stranku Kontakt
  services_header = '>Placeholder co nabizim<', // nadpis na strance sluzby
  about_me = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis posuere morbi leo urna molestie at. Mattis vulputate enim nulla aliquet. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Scelerisque purus semper eget duis. Diam volutpat commodo sed egestas egestas fringilla. Pretium quam vulputate dignissim suspendisse in est ante in. Tincidunt dui ut ornare lectus. Donec ac odio tempor orci dapibus ultrices in iaculis. Id velit ut tortor pretium viverra suspendisse potenti. Varius sit amet mattis vulputate enim nulla. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.\\n"' +
    '      "\\n"' +
    '      "Rhoncus dolor purus non enim praesent elementum facilisis leo. Amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Quam vulputate dignissim suspendisse in. Arcu ac tortor dignissim convallis. Tincidunt dui ut ornare lectus sit amet. Vitae turpis massa sed elementum tempus egestas sed. Ac odio tempor orci dapibus. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Faucibus ornare suspendisse sed nisi lacus. Massa eget egestas purus viverra accumsan in nisl nisi. Cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Habitant morbi tristique senectus et netus et. Consequat interdum varius sit amet. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Ridiculus mus mauris vitae ultricies leo. Quisque sagittis purus sit amet volutpat consequat. Ut ornare lectus sit amet est placerat in egestas erat.\\n"' +
    '      "\\n"' +
    '      "In nisl nisi scelerisque eu ultrices vitae. Tellus rutrum tellus pellentesque eu tincidunt tortor. Quis risus sed vulputate odio ut enim blandit volutpat. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Elit eget gravida cum sociis. Tristique nulla aliquet enim tortor at auctor urna. Et odio pellentesque diam volutpat. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Neque sodales ut etiam sit amet nisl purus in. Diam phasellus vestibulum lorem sed. Aliquam faucibus purus in massa tempor. Nisi est sit amet facilisis magna etiam tempor orci. Ultricies integer quis auctor elit sed vulputate mi sit. Hac habitasse platea dictumst quisque. Ut lectus arcu bibendum at. Vitae proin sagittis nisl rhoncus mattis. Quis varius quam quisque id diam vel quam. Eget mi proin sed libero. Egestas congue quisque egestas diam in arcu."',
  // text o Tobe :)
  paintings_header = '>Placeholder for paintings<', // nadpis na strance obrazy
  paintings_subtitle = '>Placeholder for painting subtitle<', // podtitul na strance obrazy
  paintings_footer_message = '>Placeholder for painting footer message<', // text pod fotkami obrazov
  photography_header = '>Placeholder for photography<', // nadpis na strance fotky
  photography_subtitle = '>Placeholder for photography subtitle<', // podtitul na strance fotky
  photography_category_1 = '>Placeholder for category 1<', // nazev fotek kategorie 1
  photography_category1_subtitle = '>Placeholder for category 1 subtitle<', // podtitul fotek kategorie 1
  photography_category1_footer_message = '>Placeholder for category 1 footer message<', // text pod fotkami kategorie 1
  photography_category_2 = '>Placeholder for category 2<', // nazev kategorie 2
  photography_category2_subtitle = '>Placeholder for category 2 subtitle<', // podtitul kategorie 2
  photography_category2_footer_message = '>Placeholder for category 2 footer message<', // text pod fotkami kategorie 2
  photography_category_3 = '>Placeholder for category 3<', // nazev kategorie 3
  photography_category3_subtitle = '>Placeholder for category 3 subtitle<', // podtitul kategorie 3
  photography_category3_footer_message = '>Placeholder for category 3 footer message<', // text pod fotkami kategorie 3
  photography_category_4 = '>Placeholder for category 4<', // nazev kategorie 4
  photography_category4_subtitle = '>Placeholder for category 4 subtitle<', // podtitul kategorie 4
  photography_category4_footer_message = '>Placeholder for category 4 footer message<', // text pod fotkami kategorie 4
  candles_header = '>Placeholder for candles<', // nadpis na strance sviecky
  candles_subtitle = '>Placeholder for candles subtitle<', // podtitul na strance sviecky
  candles_footer_message = '>Placeholder for candles footer message<', // text pod fotkami sviecok
  write_me = '>Placeholder for write me<', // nadpis na strance Kontakt
  p404_Title = '>404<', // nadpis 404 stranky
  p404_Message = '>Stranka nenalezena<', // text na 404 strance
  go_home = '>Na hlavni stranku<', // text pro tlacitko na 404 strance, ktery prepne na hlavni stranku
  input_name = 'Meno', // Nadpis Meno v kontaktnim formulari
  input_name_required = 'Pole \'Meno\' je povinné.', // Chybova hlaska v kontaktnim formulari pro prazdne jmeno
  input_name_length = '\'Meno\' musí mať minimálne 3 znaky.', // Chybova hlaska v kontaktnim formulari pro prilis kratke jmeno
  input_email = 'Email', // Nadpis Email v kontaktnim formulari
  input_email_required = 'Pole \'Email\' je povinné.', // Chybova hlaska v kontaktnim formulari pro prazdny email
  input_email_invalid = 'Zadajte platný email.', // Chybova hlaska v kontaktnim formulari pro neplatny email
  input_message = 'Zpráva', // Nadpis Zprava v kontaktnim formulari
  input_message_required = 'Pole \'Zpráva\' je povinné.', // Chybova hlaska v kontaktnim formulari pro zpravu
  button_send = 'Odoslať', // odesle zpravu napsanou v kontaktnim formulari
}

