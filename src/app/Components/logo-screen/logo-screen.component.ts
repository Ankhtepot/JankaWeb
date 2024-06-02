import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ScreenService} from "../../services/screen.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-logo-screen',
  templateUrl: './logo-screen.component.html',
  styleUrl: './logo-screen.component.scss'
})
export class LogoScreenComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('logo') logo: ElementRef;
  headerVisibilitySubscription: Subscription;

  constructor(private screenService: ScreenService) {
  }

  ngOnInit(): void {
    this.headerVisibilitySubscription = this.screenService.headerVisibilityChanged$.subscribe(this.handleVisibility.bind(this));
  }

  ngAfterViewInit(): void {
    this.handleVisibility(true);
  }

  ngOnDestroy(): void {
    this.headerVisibilitySubscription.unsubscribe();
  }

  private handleVisibility(headerShown: boolean) {
    if (!headerShown) {
      this.logo.nativeElement.classList.remove('hide');
      this.logo.nativeElement.classList.add('show');
    } else {
      this.logo.nativeElement.classList.remove('show');
      this.logo.nativeElement.classList.add('hide');
    }
  };
}
