import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces';
import { DetailsComponent } from '../details/details.component';
import { MovieDetails } from '../../interfaces/index';

@Component({
  selector: 'app-slider-poster',
  templateUrl: './slider-poster.component.html',
  styleUrls: ['./slider-poster.component.scss'],
})
export class SliderPosterComponent implements OnInit {
  @Input() movies: Movie[] = [];
  @Input() loaded: boolean = false;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async showDetails(id: number) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: { id },
    });
    modal.present();
  }
}
