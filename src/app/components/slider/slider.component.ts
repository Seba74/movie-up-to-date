import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces';
import { register } from 'swiper/element/bundle';
import { DetailsComponent } from '../details/details.component';

register();

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent  implements OnInit {

  @Input() movies: Movie[] = [];
  @Input() loaded: boolean = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async showDetails(id: number) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: { id }
    });
    modal.present();
  }

}
