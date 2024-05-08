import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import Swiper from "swiper";
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {Category, ImagesService} from "../../services/images.service";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input() category: Category;
  @Input() maxHeight: string;

  swiper: Swiper;
  fillImageUrl: string = 'assets/images/seamless-canvas-pale-brown.jpg';

  constructor(private imageService: ImagesService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      slidesPerView: 5,
      centeredSlides: true,
      spaceBetween: 30,
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      modules: [Navigation, Pagination, Autoplay],
    });
  }

  getImages(): any[] {
    return this.imageService.getImages(this.category).map(image => image.miniatureUrl);
  }
}
