import {Component, Input} from '@angular/core';
import {T} from "../../../services/text.service";
import {Router} from "@angular/router";
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-image-slide',
  templateUrl: './image-slide.component.html',
  styleUrl: './image-slide.component.scss'
})
export class ImageSlideComponent {
  @Input() image: string;
  @Input() category: string;

  constructor(
      private router: Router,
      private locationStrategy: LocationStrategy,
  ) {
  }

  onIconClick() {
    console.log('Icon clicked!');
    const imageFileName = this.image.split('/').pop();
    // this.router.navigate(['/detail', imageFileName, this.category]);
    let location = window.location;
    const url = this.router.serializeUrl(this.router.createUrlTree(['detail', imageFileName, this.category]));
    const fullUrl = `${location.origin}${this.locationStrategy.getBaseHref()}${url}`;
    window.open(fullUrl, '_blank');
  }

  protected readonly T = T;
}
