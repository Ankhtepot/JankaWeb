import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {ScreenService} from "../../services/screen.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title: string;
  private subscriptions: Subscription = new Subscription();
  public showHeader = true;
  private hideHeaderTimer: any;

  constructor(private screenSizeService: ScreenService) {}

  ngOnInit() {
    this.listenToScrollEvents();
  }

  private listenToScrollEvents() {
    this.subscriptions.add(
      this.screenSizeService.scrolledUp$.subscribe(scrolledUp => {
        if (scrolledUp) {
          this.showHeader = true;
        }
      })
    );

    this.subscriptions.add(
      this.screenSizeService.scrolledDown$.subscribe(scrolledDown => {
        if (scrolledDown) {
          this.showHeader = false;
          this.onMouseLeave();
        }
      })
    );

    this.subscriptions.add(
      this.screenSizeService.scrolledToTop$.subscribe(scrolledToTop => {
        if (scrolledToTop || this.screenSizeService.scrolledUp$) {
          this.showHeader = true;
          this.onMouseLeave();
        }
      })
    );
  }

  @HostListener('window:wheel', ['$event'])
  onWindowWheel(event: WheelEvent) {
    // Check if the user is at the top of the page and trying to scroll up
    if (window.scrollY === 0 && event.deltaY < 0) {
      this.showHeader = true;
      this.onMouseLeave();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    clearTimeout(this.hideHeaderTimer);
  }

  onMouseEnter() {
    clearTimeout(this.hideHeaderTimer); // Clear any existing timer
  }

  onMouseLeave() {
    // Start a timer to hide the header after 3 seconds
    this.hideHeaderTimer = setTimeout(() => {
      this.showHeader = false;
    }, 3000);
  }
}
