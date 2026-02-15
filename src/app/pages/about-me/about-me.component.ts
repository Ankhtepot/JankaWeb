import {Component, OnInit} from '@angular/core';
import {Category, ImageSize, ImagesService} from "../../services/images.service";
import {T} from "../../services/text.service";
import {ETextStyle} from "../../pipes/text.pipe";
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit {
  profileImagePath: string;

  constructor(private imagesService: ImagesService, private seo: SeoService) {
  }

  ngOnInit(): void {
    this.profileImagePath = this.imagesService.getRandomImageUrl(Category.Profile, ImageSize.Full);
    this.seo.update({
      title: 'O mne | Janka Zemianek',
      description: 'Som Janka Zemianek (Joly). Fotografujem, malujem a vyrabam rucne sviecky s laskou.',
      path: '/about-me',
      type: 'profile'
    });
  }

  protected readonly Text = Text;
  protected readonly T = T;
  protected readonly ETextStyle = ETextStyle;
}
