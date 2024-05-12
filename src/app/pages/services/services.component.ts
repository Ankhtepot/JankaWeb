import {AfterViewInit, Component, OnInit} from '@angular/core';
import Swiper from "swiper";
import {Category, ImagesService} from "../../services/images.service";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit, AfterViewInit {
  swiper: Swiper;

  constructor(private imageService: ImagesService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 5,
      centeredSlides: true,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 500,
        disableOnInteraction: false,
      },
    });
  }

  getImages(category: Category) {
    return this.imageService.getImagesData(category).map(image => image.miniatureUrl);
  }

  protected readonly Category = Category;

}
