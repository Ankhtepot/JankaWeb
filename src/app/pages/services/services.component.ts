import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Category, ImagesService} from "../../services/images.service";
import {T, TextService} from "../../services/text.service";
import {CarouselComponent} from "../../Components/carousel/carousel.component";
import {MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit, AfterViewInit {
  @ViewChild('tabGroup', { static: true }) tabGroup: MatTabGroup;
  @ViewChild('paintingsCarousel') paintingsCarousel: CarouselComponent;
  @ViewChild('photographyCarousel') photographyCarousel: CarouselComponent;
  @ViewChild('candlesCarousel') candlesCarousel: CarouselComponent;

  constructor(
    private imageService: ImagesService,
    private textService: TextService
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.tabGroup.selectedIndexChange.subscribe((index: number) => {
      this.handleTabChange(index);
    });
  }

  handleTabChange(index: number) {
    setTimeout(() => {
      if (index === 0 && this.paintingsCarousel) {
        this.paintingsCarousel.reinitializeSwiper();
      } else if (index === 1 && this.photographyCarousel) {
        this.photographyCarousel.reinitializeSwiper();
      } else if (index === 2 && this.candlesCarousel) {
        this.candlesCarousel.reinitializeSwiper();
      }
    }, 50);
  }

  protected readonly Category = Category;

  protected readonly T = T;

  getText(text_enum: T) {
    return this.textService.get(text_enum);
  }
}
