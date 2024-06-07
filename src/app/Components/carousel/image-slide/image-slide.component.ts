import {Component, Input} from '@angular/core';
import {T} from "../../../services/text.service";

@Component({
  selector: 'app-image-slide',
  templateUrl: './image-slide.component.html',
  styleUrl: './image-slide.component.scss'
})
export class ImageSlideComponent {
  @Input() image: string;
  @Input() category: string;

  constructor() {
  }

  onIconClick() {
    console.log('Icon clicked!');
    const imageFileName = this.image.split('/').pop();
    // this.router.navigate(['/detail', imageFileName, this.category]);
    const url = `/detail/${imageFileName}/${this.category}`;
    window.open(url, '_blank');
  }

  protected readonly T = T;
}
