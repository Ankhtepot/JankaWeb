import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import Swiper from "swiper";
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {Category, ImagesService} from "../../services/images.service";
import {ScreenService} from "../../services/screen.service";
import {Subscription} from "rxjs";
import {T} from "../../services/text.service";

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

function resolveSlidesPerCount(mediaBreakpoint: string) {
  if (mediaBreakpoint === 'xs' || mediaBreakpoint === 'sm') {
    return 1;
  } else {
    return 2;
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
  fillImageUrl: string = 'assets/images/seamless_cosm_1.jpg';
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

    // Ensure the container element exists (use element ref to scope)
    const swiperEl: HTMLElement | null = this.elementRef.nativeElement.querySelector('.swiper');
    if (!swiperEl) {
      return;
    }

    // Destroy previous instance if any
    if (this.swiper) {
      try { this.swiper.destroy(true, true); } catch (e) { /* ignore */ }
      this.swiper = undefined as any;
    }

    // Create Swiper on the element itself and enable observer options so it reacts to DOM changes (tabs/show-hide)
    this.swiper = new Swiper(swiperEl as any, {
      slidesPerView: resolveSlidesCount(this.screenService.mediaBreakpoint$.value),
      slidesPerGroup: resolveSlidesPerCount(this.screenService.mediaBreakpoint$.value),
      centeredSlides: true,
      spaceBetween: 0,
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      modules: [Navigation, Pagination, Autoplay],
      // Use elements scoped inside the swiper container so they continue to work when the DOM is re-rendered
      pagination: {
        el: swiperEl.querySelector('.swiper-pagination') as any,
      },
      navigation: {
        nextEl: swiperEl.querySelector('.swiper-button-next') as any,
        prevEl: swiperEl.querySelector('.swiper-button-prev') as any,
      },
      scrollbar: {
        el: swiperEl.querySelector('.swiper-scrollbar') as any,
      },
      // Key: observe DOM changes/parents so Swiper updates when tabs hide/show or Angular changes slides
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
    });

    // Keep background image on the scoped element
    swiperEl.style.backgroundImage = `url('${this.fillImageUrl}')`;
    this.setSlideStyles();

    // Ensure Swiper updates after a tick (Angular might still be rendering slide content)
    setTimeout(() => {
      try { this.swiper.update(); } catch (e) { /* ignore */ }
    }, 0);
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

    // Allow Angular to re-render slides via the images array, then initialize swiper
    setTimeout(() => {
      this.setSwiper();
    });
  }

  // Public helper: force Swiper to update (useful when parent components switch tabs)
  public refresh(): void {
    if (!this.swiper) return;
    try {
      this.swiper.update();
      this.swiper.slideToLoop(this.swiper.realIndex, 0); // keep current slide in loop mode
    } catch (e) {
      // ignore
    }
  }

  protected readonly T = T;
}
