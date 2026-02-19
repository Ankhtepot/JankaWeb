import {Component, OnInit} from '@angular/core';
import {Category, ImageSize, ImagesService} from "./services/images.service";
import {RandomizePipe} from "./shared/pipes/randomize.pipe";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [RandomizePipe]
})
export class AppComponent implements OnInit {
  title = 'Joly art';
  backgroundImageUrls: string[];

  constructor(private imagesService: ImagesService, private randomizePipe: RandomizePipe) {
  }

  ngOnInit() {
    this.backgroundImageUrls = this.randomizePipe.transform(this.imagesService.getImages(Category.All, ImageSize.Full));
  }

}
