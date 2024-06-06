import {Component, Input} from '@angular/core';
import {T} from "../../../services/text.service";

@Component({
  selector: 'app-image-slide',
  templateUrl: './image-slide.component.html',
  styleUrl: './image-slide.component.scss'
})
export class ImageSlideComponent {
  @Input() image: string;

  onIconClick() {
    console.log('Icon clicked!');
  }

  protected readonly T = T;
}
