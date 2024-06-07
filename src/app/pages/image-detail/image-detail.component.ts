import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')!;
      this.filename = params.get('filename')!;
      this.imageUrl = `assets/images/${this.category.toLowerCase()}/${this.filename}`;
    });
  }

  ngAfterViewInit(): void {
    const img = this.imageElement.nativeElement;
    const container = img.parentElement;

    img.draggable = false;

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
    img.style.transform = `scale(${this.scale})`;
    // img.style.transformOrigin = 'center'; // Center the image
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
