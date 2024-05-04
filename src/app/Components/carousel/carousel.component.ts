import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper/modules';
import {Category, ImagesService} from "../../services/images.service";
import {SwiperOptions} from "swiper/types";
import {SwiperDirective} from "../../Directives/swiper.directive";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-carousel',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    SwiperDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './carousel.component.scss',
  templateUrl: './carousel.component.html',
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input() category: Category;
  @Input() maxHeight: string;

  swiper: Swiper;

  public config: SwiperOptions = {
    modules: [Navigation, Pagination, Mousewheel],
    autoHeight: true,
    spaceBetween: 20,
    navigation: false,
    pagination: {clickable: true, dynamicBullets: true},
    slidesPerView: 1,
    centeredSlides: true,
    breakpoints: {
      400: {
        slidesPerView: "auto",
        centeredSlides: false
      },
    }
  }

  constructor(private imageService: ImagesService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.swiper = new Swiper('.swiper-container', {
    //   slidesPerView: 5,
    //   centeredSlides: true,
    //   spaceBetween: 30,
    //   loop: true,
    //   autoplay: {
    //     delay: 500,
    //     disableOnInteraction: false,
    //   },
    // });
  }

  getImages(): any[] {
    return this.imageService.getImages(this.category).map(image => image.miniatureUrl);
  }
}
