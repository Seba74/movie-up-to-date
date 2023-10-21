import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-slider-pares',
  templateUrl: './slider-pares.component.html',
  styleUrls: ['./slider-pares.component.scss'],
})
export class SliderParesComponent implements OnInit {
  @Input() movies: Movie[] = [];
  @Input() loaded: boolean = false;
  @Output() loadMore = new EventEmitter();

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  loadMoreMovies() {
    this.loadMore.emit(true);
  }

  async showDetails(id: number) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: { id },
    });
    modal.present();
  }
}
