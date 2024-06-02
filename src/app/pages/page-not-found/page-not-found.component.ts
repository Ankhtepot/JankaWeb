import { Component } from '@angular/core';
import {T} from "../../services/text.service";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

  protected readonly T = T;
}
