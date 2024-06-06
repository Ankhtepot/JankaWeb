import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutMeComponent} from "./pages/about-me/about-me.component";
import {ServicesComponent} from "./pages/services/services.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {ImageDetailComponent} from "./pages/image-detail/image-detail.component";

const routes: Routes = [
  {path: '', redirectTo: 'about-me', pathMatch: 'full'},
  {path: 'about-me', component: AboutMeComponent},
  {path: 'services', component: ServicesComponent},
  {path: "contact", component: ContactComponent},
  {path: 'detail/:filename/:category', component: ImageDetailComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
