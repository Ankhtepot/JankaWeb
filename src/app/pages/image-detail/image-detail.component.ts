import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  filename: string;
  category: string;
  imageUrl: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.filename = params.get('filename')!;
      this.category = params.get('category')!;
      this.imageUrl = `../../../assets/images/${this.category.toLowerCase()}/${this.filename}`;
    });
  }

  zoomIn() {
    const img = document.getElementById('image') as HTMLImageElement;
    img.style.transform = `scale(${parseFloat(img.style.transform.slice(6, -1)) + 0.1})`;
  }

  zoomOut() {
    const img = document.getElementById('image') as HTMLImageElement;
    img.style.transform = `scale(${parseFloat(img.style.transform.slice(6, -1)) - 0.1})`;
  }
}
