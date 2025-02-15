import { NgModule } from '@angular/core';
import { RandomizePipe } from './shared/pipes/randomize.pipe';

@NgModule({
  declarations: [RandomizePipe],
  exports: [RandomizePipe]
})
export class SharedModule {}
