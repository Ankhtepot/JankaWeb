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
  services_header = '>Čo ponúkam<', // nadpis na strance sluzby
  about_me_intro = 'Som kreatívna bytosť, ktorá miluje tvoriť🤎 🎨🖌️ Vesmír a duša sú mojím nekonečným zdrojom inšpirácie. Každé dielo, ktoré vytvorím, je odrazom môjho vnútorného sveta. \n' +
    '\n' +
    'Som (TVOR)KYŇA',
  about_me_title1 = 'Fotografka 📸', //'》Fotografka《📸'
  about_me_part1 = 'S láskou ♡ k fotografii zachytávam krásu okolo seba a premieňam bežné okamihy na magické spomienky, či už u seba v ateliéri, alebo vonku v lone prírody. ',
  about_me_title2 = 'Maliarka 🎨', //'》Maliarka《🎨'
  about_me_part2 = 'Vytváram obrazy, ktoré hovoria o hĺbke duše, vesmíru, sile vyšších bytostí a naše vzájomné prepojenie. Každý odtlačok môjho štetca spája umenie, emócie a duchovný svet.',
  about_me_title3 = 'Workshopy 🎨🖼', //'》Workshopy《🎨🖼'
  about_me_part3 = 'Pridaj sa k mojim workshopom intuitívneho maľovania, kde nepotrebuješ predchádzajúce skúsenosti ani zručnosti. Objav v sebe, čo dokážeš vyjadriť bez obmedzení. Každý ťah štetcom je krokom k sebe, k tvojej vnútornej sile a kreativite. Príď a uvoľni svoju tvorivosť! 🎨✨',
  paintings_header = '>Obrazy<', // nadpis na strance obrazy
  paintings_subtitle = '>Podtitulok pre obrazy<', // podtitul na strance obrazy
  paintings_footer_message = '>Správa pod obrazmi<', // text pod fotkami obrazov
  photography_header = '>Fotografia<', // nadpis na strance fotky
  photography_subtitle = '>Podtitulok pre fotografiu<', // podtitul na strance fotky
  photography_category_1 = '>Kategória 1<', // nazev fotek kategorie 1
  photography_category1_subtitle = '>Podtitulok pre kategóriu 1<', // podtitul fotek kategorie 1
  photography_category1_footer_message = '>Správa pod fotografiami kategórie 1<', // text pod fotkami kategorie 1
  photography_category_2 = '>Kategória 2<', // nazev kategorie 2
  photography_category2_subtitle = '>Podtitulok pre kategóriu 2<', // podtitul kategorie 2
  photography_category2_footer_message = '>Správa pod fotografiami kategórie 2<', // text pod fotkami kategorie 2
  photography_category_3 = '>Kategória 3<', // nazev kategorie 3
  photography_category3_subtitle = '>Podtitulok pre kategóriu 3<', // podtitul kategorie 3
  photography_category3_footer_message = '>Správa pod fotografiami kategórie 3<', // text pod fotkami kategorie 3
  photography_category_4 = '>Kategória 4<', // nazev kategorie 4
  photography_category4_subtitle = '>Podtitulok pre kategóriu 4<', // podtitul kategorie 4
  photography_category4_footer_message = '>Správa pod fotografiami kategórie 4<', // text pod fotkami kategorie 4
  candles_header = '>Sviečky<', // nadpis na strance sviecky
  candles_subtitle = '>Podtitulok pre sviečky<', // podtitul na strance sviecky
  candles_footer_message = '>Správa pod sviečkami<', // text pod fotkami sviecok
  write_me = '>Napíš mi<', // nadpis na strance Kontakt
  p404_Title = '>404<', // nadpis 404 stranky
  p404_Message = '>Stránka nenájdená<', // text na 404 strance
  go_home = '>Na hlavnú stránku<', // text pro tlacitko na 404 strance
  input_name = 'Meno',
  input_name_required = 'Pole "Meno" je povinné.',
  input_name_length = '"Meno" musí mať minimálne 3 znaky.',
  input_email = 'Email',
  input_email_required = 'Pole "Email" je povinné.',
  input_email_invalid = 'Zadajte platný email.',
  input_message = 'Správa',
  input_message_required = 'Pole "Správa" je povinné.',
  button_send = 'Odoslať',
  address_label = 'Adresa',
  address_value = 'Tobias Klima, 12345, Praha 5',
  phone_label = 'Telefón',
  phone_value = '+420 123 456 789',
  email_label = 'Email',
  email_value = 'foteniejeradost@gmail.com',
  expand_image = 'Zväčšiť obrázok',
  value_copied = 'bolo skopírované do pamäte'
}
