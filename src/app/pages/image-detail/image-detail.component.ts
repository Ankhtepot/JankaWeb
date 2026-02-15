import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService, Category } from '../../services/images.service';
import { ScreenService } from '../../services/screen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('image', { static: true }) imageElement: ElementRef<HTMLImageElement>;
  filename: string;
  category: string;
  imageUrl: string;
  scale: number = 1;
  scaleStep: number = 0.1;
  minScale: number = 0.5;
  maxScale: number = 5;

  private isDragging: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private scrollLeft: number = 0;
  private scrollTop: number = 0;

  private wheelSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private imagesService: ImagesService,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')!;
      this.filename = params.get('filename')!;

      // Try to resolve the image from the generated images provider (covers all categories/subfolders)
      try {
        const all = this.imagesService.getImagesData(Category.All);
        const found = all.find(i => {
          const imgFile = i.imageUrl ? i.imageUrl.split('/').pop() : '';
          const miniFile = i.miniatureUrl ? i.miniatureUrl.split('/').pop() : '';
          return imgFile === this.filename || miniFile === this.filename;
        });
        if (found) {
          this.imageUrl = found.imageUrl;
          return;
        }
      } catch (e) {
        // if imagesService isn't available for some reason, fall back to default behavior
      }

      // Fallback: construct path based on category param (original behavior)
      this.imageUrl = `assets/images/${this.category.toLowerCase()}/${this.filename}`;
    });
  }

  ngAfterViewInit(): void {
    const img = this.imageElement.nativeElement;
    const container = img.parentElement;

    img.draggable = false;

    // Ensure initial sizing after the image loads
    img.onload = () => this.applyScale();
    if (img.complete && img.naturalWidth) {
      this.applyScale();
    }

    // Mouse wheel zoom using ScreenService
    this.wheelSubscription = this.screenService.mouseWheel$.subscribe((evt: WheelEvent) => {
      if (!container || !container.contains(evt.target as Node)) return;
      evt.preventDefault();
      if (evt.deltaY < 0) {
        this.zoomIn();
      } else if (evt.deltaY > 0) {
        this.zoomOut();
      }
    });

    // Mouse events
    this.renderer.listen(container, 'mousedown', this.onMouseDown.bind(this));
    this.renderer.listen(container, 'mouseup', this.onMouseUp.bind(this));
    this.renderer.listen(container, 'mouseleave', this.onMouseLeave.bind(this));
    this.renderer.listen(container, 'mousemove', this.onMouseMove.bind(this));

    // Touch events
    this.renderer.listen(container, 'touchstart', this.onTouchStart.bind(this));
    this.renderer.listen(container, 'touchend', this.onTouchEnd.bind(this));
    this.renderer.listen(container, 'touchmove', this.onTouchMove.bind(this));
  }

  ngOnDestroy(): void {
    const img = this.imageElement.nativeElement;
    const container = img.parentElement;

    // Clean up event listeners (this step is important to avoid memory leaks)
    this.renderer.listen(container, 'mousedown', null);
    this.renderer.listen(container, 'mouseup', null);
    this.renderer.listen(container, 'mouseleave', null);
    this.renderer.listen(container, 'mousemove', null);
    this.renderer.listen(container, 'touchstart', null);
    this.renderer.listen(container, 'touchend', null);
    this.renderer.listen(container, 'touchmove', null);
    if (this.wheelSubscription) {
      this.wheelSubscription.unsubscribe();
    }
  }

  zoomMax() {
    this.scale = this.maxScale;
    this.applyScale();
  }

  zoomIn() {
    if (this.scale >= this.maxScale) return;

    this.scale += this.scaleStep;
    if (this.scale > this.maxScale) this.scale = this.maxScale;
    this.applyScale();
  }

  zoomOut() {
    if (this.scale <= this.minScale) return;

    this.scale -= this.scaleStep;
    if (this.scale < this.minScale) this.scale = this.minScale;
    this.applyScale();
  }

  resetZoom() {
    this.scale = 1;
    this.applyScale();
  }

  applyScale() {
    const img = this.imageElement.nativeElement;
    const container = img.parentElement as HTMLElement;
    if (!img || !container) return;

    const naturalW = img.naturalWidth || img.width;
    const naturalH = img.naturalHeight || img.height;
    if (!naturalW || !naturalH) return;

    // Fit to container as base size; scale from that (keeps slider behavior consistent)
    const fitScale = Math.min(
      container.clientWidth / naturalW,
      container.clientHeight / naturalH,
      1
    );
    const baseW = Math.round(naturalW * fitScale);
    const baseH = Math.round(naturalH * fitScale);
    const scaledW = Math.round(baseW * this.scale);
    const scaledH = Math.round(baseH * this.scale);

    img.style.width = scaledW + 'px';
    img.style.height = scaledH + 'px';
    img.style.maxWidth = 'none';
    img.style.maxHeight = 'none';
    img.style.transform = '';

    // Center viewport after layout so the image stays centered when scaling
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const maxScrollLeft = Math.max(0, container.scrollWidth - container.clientWidth);
        const maxScrollTop = Math.max(0, container.scrollHeight - container.clientHeight);
        container.scrollLeft = Math.round(maxScrollLeft / 2);
        container.scrollTop = Math.round(maxScrollTop / 2);
      });
    });
  }

  private onMouseDown(event: MouseEvent): void {
    event.preventDefault(); // Prevent default behavior
    this.isDragging = true;
    const container = this.imageElement.nativeElement.parentElement;
    this.startX = event.pageX - container.offsetLeft;
    this.startY = event.pageY - container.offsetTop;
    this.scrollLeft = container.scrollLeft;
    this.scrollTop = container.scrollTop;
  }

  private onMouseUp(): void {
    this.isDragging = false;
  }

  private onMouseLeave(): void {
    this.isDragging = false;
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault(); // Prevent default behavior
    const container = this.imageElement.nativeElement.parentElement;
    const x = event.pageX - container.offsetLeft;
    const y = event.pageY - container.offsetTop;
    const walkX = (x - this.startX);
    const walkY = (y - this.startY);
    container.scrollLeft = this.scrollLeft - walkX;
    container.scrollTop = this.scrollTop - walkY;
  }

  private onTouchStart(event: TouchEvent): void {
    event.preventDefault(); // Prevent default behavior
    this.isDragging = true;
    const container = this.imageElement.nativeElement.parentElement;
    this.startX = event.touches[0].pageX - container.offsetLeft;
    this.startY = event.touches[0].pageY - container.offsetTop;
    this.scrollLeft = container.scrollLeft;
    this.scrollTop = container.scrollTop;
  }

  private onTouchEnd(): void {
    this.isDragging = false;
  }

  private onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    event.preventDefault(); // Prevent default behavior
    const container = this.imageElement.nativeElement.parentElement;
    const x = event.touches[0].pageX - container.offsetLeft;
    const y = event.touches[0].pageY - container.offsetTop;
    const walkX = (x - this.startX);
    const walkY = (y - this.startY);
    container.scrollLeft = this.scrollLeft - walkX;
    container.scrollTop = this.scrollTop - walkY;
  }
}
