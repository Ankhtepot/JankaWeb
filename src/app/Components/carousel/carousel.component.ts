import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import Swiper from "swiper";
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {Category, ImagesService} from "../../services/images.service";
import {ScreenSizeService} from "../../services/screen-size.service";
import {Subscription} from "rxjs";

function resolveSlidesCount(mediaBreakpoint: string) {
  if (mediaBreakpoint === 'xs' || mediaBreakpoint === 'sm') {
    return 1;
  } else if (mediaBreakpoint === 'md') {
    return 3;
  } else if (mediaBreakpoint === 'lg' || mediaBreakpoint === 'xl') {
    return 4;
  } else {
    return 5;
  }
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() category: Category;
  @Input() maxHeight: string;
  resizeSubscription: Subscription;

  swiper: Swiper;
  fillImageUrl: string = 'assets/images/seamless-canvas-pale-brown.jpg';

  constructor(
    private imageService: ImagesService,
    private screenService: ScreenSizeService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.resizeSubscription = this.screenService.mediaBreakpoint$.subscribe(() => {
      if (this.swiper) {
        this.swiper.destroy();
      }
      this.setSwiper();
      // this.swiper.update();
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.setSwiper();
  }

  private setSwiper() {
    this.swiper = new Swiper('.swiper', {
      slidesPerView: resolveSlidesCount(this.screenService.mediaBreakpoint$.value),
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
    this.elementRef.nativeElement.querySelector('.swiper').style.backgroundImage = `url('${this.fillImageUrl}')`
  }

  getImages(): any[] {
    return this.imageService.getImages(this.category).map(image => image.miniatureUrl);
  }
}
