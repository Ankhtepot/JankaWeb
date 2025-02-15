import {Component, OnInit} from '@angular/core';
import {Category, ImageSize, ImagesService} from "../../services/images.service";
import {T} from "../../services/text.service";
import {ETextStyle} from "../../pipes/text.pipe";

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit {
  profileImagePath: string;

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit(): void {
    this.profileImagePath = this.imagesService.getRandomImageUrl(Category.Profile, ImageSize.Full);
  }

  protected readonly Text = Text;
  protected readonly T = T;
  protected readonly ETextStyle = ETextStyle;
}
