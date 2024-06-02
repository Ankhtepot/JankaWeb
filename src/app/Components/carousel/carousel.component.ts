import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import Swiper from "swiper";
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {Category, ImagesService} from "../../services/images.service";
import {ScreenService} from "../../services/screen.service";
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
  fillImageUrl: string = 'assets/images/seamless-cosmic-background.jpg';
  images: string[];

  constructor(
    private imageService: ImagesService,
    private screenService: ScreenService,
    private elementRef: ElementRef,
  ) {
  }

  ngOnInit(): void {
    this.resizeSubscription = this.screenService.mediaBreakpoint$.subscribe(() => {
      this.initializeSwiper()
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
  }

  ngAfterViewInit(): void {
    this.setSwiper();
  }

  initializeSwiper() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
    this.setSwiper();
  }

  private setSwiper() {
    this.images = this.getImages();
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
    this.setSlideStyles();
  }

  getImages(): any[] {
    return this.imageService.getImagesData(this.category).map(image => image.miniatureUrl);
  }

  private setSlideStyles() {
    const slides = this.elementRef.nativeElement.querySelectorAll('.swiper-slide');
    slides.forEach((slide: HTMLElement) => {
      slide.style.height = this.maxHeight;
      slide.style.display = 'flex';
      slide.style.justifyContent = 'center';
      slide.style.alignItems = 'center';
    });
  }

  public reinitializeSwiper(category: Category) {
    this.category = category;
    this.images = this.getImages();

    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
    this.removeSwiperElements();
    setTimeout(() => {
      this.setSwiper();
    });
  }

  private removeSwiperElements() {
    const swiperContainer = this.elementRef.nativeElement.querySelector('.swiper');
    if (swiperContainer) {
      swiperContainer.innerHTML = `
        <div class="swiper-wrapper">
          ${this.images.map(image => `
            <div class="swiper-slide">
              <img src="${image}" alt="Image" style="max-height: ${this.maxHeight};"/>
            </div>`).join('')}
        </div>
`;
    }
  }
}
