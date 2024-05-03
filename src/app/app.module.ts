import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AboutMeComponent} from './pages/about-me/about-me.component';
import {ServicesComponent} from './pages/services/services.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { ContactComponent } from './pages/contact/contact.component';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import { AppCarouselComponent } from './Components/carousel/app-carousel.component';
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    ServicesComponent,
    PageNotFoundComponent,
    ContactComponent,
    AppCarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    NgOptimizedImage,
    MatProgressSpinner,
  ],
  providers: [
    provideAnimationsAsync('animations')
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
