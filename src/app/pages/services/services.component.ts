import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Category, ImagesService} from "../../services/images.service";
import {T, TextService} from "../../services/text.service";
import {CarouselComponent} from "../../Components/carousel/carousel.component";
import {MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit, AfterViewInit {
  @ViewChild('tabGroup', {static: true}) tabGroup: MatTabGroup;
  @ViewChild('carousel') carousel: CarouselComponent;
  protected readonly Category = Category;
  protected readonly T = T;
  footerText: string;

  constructor(
    private imageService: ImagesService,
    private textService: TextService
  ) {
  }

  ngOnInit(): void {
    this.footerText = this.getText(T.paintings_footer_message);
  }

  ngAfterViewInit(): void {
    this.tabGroup.selectedIndexChange.subscribe((index: number) => {
      this.handleTabChange(index);
    });
  }

  handleTabChange(index: number) {
      let category: Category;

      if (index === 0) {
        category = Category.Paintings;
        this.footerText = this.getText(T.paintings_footer_message);
      } else if (index === 1) {
        category = Category.PhotoOne;
        this.footerText = this.getText(T.photography_footer_message);
      } else if (index === 2) {
        category = Category.Candles;
        this.footerText = this.getText(T.candles_footer_message);
      }

    if (this.carousel) {
      this.carousel.reinitializeSwiper(category);
    }
  }

  getText(text_enum: T) {
    return this.textService.get(text_enum);
  }
}
