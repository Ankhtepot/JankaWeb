import {Component, OnInit} from '@angular/core';
import {Category, ImageSize, ImagesService} from "./services/images.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Joly art';
  backgroundImageUrls: string[];

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit() {
    this.backgroundImageUrls = this.imagesService.getImages(Category.Paintings, ImageSize.Full);
  }

}
