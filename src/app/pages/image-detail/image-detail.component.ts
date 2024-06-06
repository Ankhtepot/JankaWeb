import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  @ViewChild('image', { static: true }) imageElement: ElementRef<HTMLImageElement>;
  filename: string;
  category: string;
  imageUrl: string;
  scale: number = 1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')!;
      this.filename = params.get('filename')!;
      this.imageUrl = `../../../assets/images/${this.category.toLowerCase()}/${this.filename}`;
    });
  }

  zoomIn() {
    this.scale += 0.1;
    this.applyScale();
  }

  zoomOut() {
    if (this.scale > 0.1) {
      this.scale -= 0.1;
      this.applyScale();
    }
  }

  zoomMax() {
    const img = this.imageElement.nativeElement;
    const container = img.parentElement;
    if (container) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const widthScale = img.naturalWidth / containerWidth;
      const heightScale = img.naturalHeight / containerHeight;
      this.scale = Math.max(widthScale, heightScale);
      this.applyScale();
    }
  }

  zoomMin() {
    this.scale = 1;
    this.applyScale();
  }

  applyScale() {
    const img = this.imageElement.nativeElement;
    img.style.transform = `scale(${this.scale})`;
    img.style.transformOrigin = 'center'; // Center the image
  }
}
