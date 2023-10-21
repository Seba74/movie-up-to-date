import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable, forkJoin } from 'rxjs';
import { ComponentsModule } from 'src/app/components/components.module';
import { Movie } from 'src/app/interfaces';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, PipesModule, ComponentsModule],
})
export class Tab1Page implements OnInit {
  movies: Movie[] = [];
  popularMovies: Movie[] = [];
  loaded: boolean = false;

  $movies!: Observable<Movie[]>;
  $popularMovies!: Observable<Movie[]>;

  actualPage: number = 1;

  constructor(private movieService: MoviesService) {
    this.$movies = this.movieService.getTheatresMovies();
    this.$popularMovies = this.movieService.getPopularMovies();
  }

  ngOnInit(): void {
    forkJoin([this.$movies, this.$popularMovies]).subscribe(
      ([movies, popularMovies]) => {
        this.movies = movies;
        this.popularMovies = popularMovies;
      }
    );
    this.loaded = true;
  }

  loadMore(event: boolean){
    this.movieService.getPopularMovies().subscribe(movies => {
      this.popularMovies = [...this.popularMovies, ...movies];
    })    
  }

}
