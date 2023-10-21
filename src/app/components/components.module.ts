import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { PipesModule } from '../pipes/pipes.module';
import { SliderPosterComponent } from './slider-poster/slider-poster.component';
import { IonicModule } from '@ionic/angular';
import { SliderParesComponent } from './slider-pares/slider-pares.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [SliderComponent, SliderPosterComponent, SliderParesComponent, DetailsComponent],
  imports: [CommonModule, IonicModule, PipesModule],
  exports: [SliderComponent, SliderPosterComponent, SliderParesComponent, DetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
