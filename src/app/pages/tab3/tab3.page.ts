import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Genre, MovieDetails } from 'src/app/interfaces';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ComponentsModule],
})
export class Tab3Page {
  movies: MovieDetails[] = [];
  genres: Genre[] = [];
  filterMovies: { genre: string; movies: MovieDetails[] }[] = [];
  loaded: boolean = false;
  constructor(
    private storageService: StorageService,
    private moviesService: MoviesService
  ) {}

  async ionViewWillEnter() {
    this.movies = await this.storageService.getMovies();
    this.moviesService.getGenreMovies().subscribe((genres) => {
      this.genres = genres;
      this.filterMovies = this.genres
        .map((genre) => ({
          genre: genre.name,
          movies: this.filterByGenre(genre),
        }))
        .filter((movie) => movie.movies.length > 0);
      this.loaded = true;
    });
  }

  filterByGenre(genre: Genre): MovieDetails[] {
    return this.movies.filter((movie) =>
      movie.genres.some((g) => g.id === genre.id)
    );
  }
}
