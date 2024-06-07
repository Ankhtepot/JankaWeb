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
  maxScale: number = 5;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')!;
      this.filename = params.get('filename')!;
      this.imageUrl = `../../../assets/images/${this.category.toLowerCase()}/${this.filename}`;
    });
  }

  zoomMax() {
    this.scale = this.maxScale;
    this.applyScale();
  }

  resetZoom() {
    this.scale = 1;
    this.applyScale();
  }

  applyScale() {
    const img = this.imageElement.nativeElement;
    img.style.transform = `scale(${this.scale})`;
    img.style.transformOrigin = 'center'; // Center the image
  }
}
