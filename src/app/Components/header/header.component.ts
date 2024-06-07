import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ScreenService} from "../../services/screen.service";
import {T} from "../../services/text.service";
import {Router} from "@angular/router";

const showTime = 2000;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title: string;
  aboutMe = 'O me';
  services = 'Sluzby';
  contact = 'Kontakt';
  private subscriptions: Subscription = new Subscription();
  public showHeader = true;
  public mediaBreakpoint: string;
  private hideHeaderTimer: any;

  constructor(
    private screenService: ScreenService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.listenToScrollEvents();
    this.onShowHeader();
  }

  private listenToScrollEvents() {
    this.subscriptions.add(
      this.screenService.scrolledUp$.subscribe(scrolledUp => {
        if (scrolledUp) {
          this.showHeader = true;
          this.screenService.headerVisibilityChanged$.next(this.showHeader);
        }
      })
    );

    this.subscriptions.add(
      this.screenService.scrolledDown$.subscribe(scrolledDown => {
        if (scrolledDown) {
          this.showHeader = false;
          this.onMouseLeave();
        }
      })
    );

    this.subscriptions.add(
      this.screenService.scrolledToTop$.subscribe(scrolledToTop => {
        if (scrolledToTop) {
          this.onShowHeader();
        }
      })
    );

    this.subscriptions.add(
      this.screenService.mediaBreakpoint$.subscribe(mediaBreakpoint => {
        this.mediaBreakpoint = mediaBreakpoint;
      })
    );
  }

  @HostListener('window:wheel', ['$event'])
  onWindowWheel(event: WheelEvent) {
    // Check if the user is at the top of the page and trying to scroll up
    if (window.scrollY === 0 && event.deltaY < 0) {
      this.onShowHeader();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.onMouseEnter();
  }

  onShowHeader() {
    this.showHeader = true;
    this.screenService.headerVisibilityChanged$.next(this.showHeader);
    this.onMouseLeave();
  }

  onMouseEnter() {
    clearTimeout(this.hideHeaderTimer); // Clear any existing timer
  }

  onMouseLeave() {
    clearTimeout(this.hideHeaderTimer); // Clear any existing timer
    this.hideHeaderTimer = setTimeout(() => {
      this.showHeader = false;
      this.screenService.headerVisibilityChanged$.next(this.showHeader);
    }, showTime);
  }

  isOnEligiblePage() {
    return !this.router.url.includes('/detail/');
  }

  protected readonly T = T;
}
