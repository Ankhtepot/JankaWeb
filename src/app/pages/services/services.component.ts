import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../services/images.service";
import {T, TextService} from "../../services/text.service";
import {CarouselComponent} from "../../Components/carousel/carousel.component";
import {MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit, OnDestroy {
  @ViewChild('tab_group_main', {static: true}) mainTabGroup: MatTabGroup;
  @ViewChild('tab_group_photo', {static: true}) photoTabGroup: MatTabGroup;
  @ViewChild('carousel') carousel: CarouselComponent;
  protected readonly Category = Category;
  protected readonly T = T;
  footerText: string;
  lastPhotoSubTabIndex: number = -1;

  constructor(
    private textService: TextService
  ) {
  }

  ngOnInit(): void {
    this.footerText = this.getText(T.paintings_footer_message);
    this.mainTabGroup.selectedIndexChange.subscribe((index: number) => {
      this.handleTabChange(index);
    });
    this.photoTabGroup.selectedIndexChange.subscribe((index: number) => {
      this.handleTabChange(index+10);
    });
  }

  ngOnDestroy(): void {
    this.mainTabGroup.selectedIndexChange.unsubscribe();
    this.photoTabGroup.selectedIndexChange.unsubscribe();
    this.lastPhotoSubTabIndex = -1;
  }

  handleTabChange(index: number) {
      let category: Category;

      if (index === 1 && this.lastPhotoSubTabIndex !== -1) {
        index = this.lastPhotoSubTabIndex;
      }

      if (index === 0) {
        category = Category.Paintings;
        this.footerText = this.getText(T.paintings_footer_message);
      } else if (index === 1 || index === 10) {
        category = Category.PhotoOne;
        this.lastPhotoSubTabIndex = index;
        this.footerText = this.getText(T.photography_category1_footer_message);
      } else if (index === 2) {
        category = Category.Candles;
        this.footerText = this.getText(T.candles_footer_message);
      } else if (index === 11) {
        category = Category.PhotoTwo;
        this.lastPhotoSubTabIndex = index;
        this.footerText = this.getText(T.photography_category2_footer_message);
      } else if (index === 12) {
        category = Category.PhotoThree;
        this.lastPhotoSubTabIndex = index;
        this.footerText = this.getText(T.photography_category3_footer_message);
      } else if (index === 13) {
        category = Category.PhotoFour;
        this.lastPhotoSubTabIndex = index;
        this.footerText = this.getText(T.photography_category4_footer_message);
      }

    if (this.carousel) {
      this.carousel.reinitializeSwiper(category);
    }
  }

  getText(text_enum: T) {
    return this.textService.get(text_enum);
  }
}
