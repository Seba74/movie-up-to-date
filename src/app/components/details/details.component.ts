import { Component, Input, OnInit } from '@angular/core';
import { Cast, MovieDetails, creditsDetails } from 'src/app/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { Observable, forkJoin } from 'rxjs';
import { ModalController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() id: number = 0;
  movieDetails!: MovieDetails;
  $movieDetails!: Observable<MovieDetails>;
  $creditDetails!: Observable<creditsDetails>;
  castDetails: Cast[] = [];
  shortText: number = 150;
  favoriteExist: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private modalController: ModalController,
    private storageService: StorageService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {

    this.favoriteExist = await this.storageService.movieExist(this.id); 
    this.$movieDetails = this.moviesService.getMovieDetails(this.id);
    this.$creditDetails = this.moviesService.getActors(this.id);

    forkJoin([this.$movieDetails, this.$creditDetails]).subscribe(
      ([movieDetails, creditDetails]) => {
        this.movieDetails = movieDetails;
        this.castDetails = creditDetails.cast;
      }
    );
  }

  goBack() {
    this.modalController.dismiss();
  }

  addToFav() {
    this.favoriteExist = !this.favoriteExist;
    this.storageService.saveMovie(this.movieDetails);
  }
}
