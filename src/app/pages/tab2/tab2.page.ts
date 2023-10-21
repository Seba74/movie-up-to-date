import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IonSearchbar, IonicModule, ModalController } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { Movie } from 'src/app/interfaces';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ComponentsModule, PipesModule],
})
export class Tab2Page {
  searchInput: string = '';
  isFocused: boolean = false;
  searching: boolean = false;

  movies: Movie[] = [];

  @ViewChild(IonSearchbar) searchBar!: IonSearchbar;

  topSearches = [
    'El Escuadrón Suicida',
    'Spider-Man: Sin camino a casa',
    'La casa del caracol',
    'Black Widow',
    'Dune',
    'Space Jam: Una nueva era',
    'No respires 2',
    'Loki',
  ];

  constructor(
    private movieService: MoviesService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {}

  searchMovieByInput(event: any) {
    this.searchInput = event.detail.value;
    this.searching = true;
    this.searchMovie(this.searchInput);
  }

  clearSearchInput() {
    this.searchInput = '';
    this.movies = [];
  }

  searchMovie(text: string) {
    this.movieService.searchMovie(text).subscribe((movies) => {
      this.movies = movies;
      this.searching = false;
    });
  }

  searchMovieByList(title: string) {
    this.searchInput = title;
    this.searching = true;
    this.searchMovie(this.searchInput);
  }

  async showDetails(id: number) {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: { id },
    });
    modal.present();
  }
}
