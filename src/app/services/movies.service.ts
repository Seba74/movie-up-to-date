import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Genre,
  GenreResponse,
  MatchResponse,
  Movie,
  MovieDetails,
  creditsDetails,
} from '../interfaces';

const apiKey = environment.movieKey;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  API_URL: string = 'https://api.themoviedb.org/3';
  private actualPage: number = 0;
  private requestQuery<T>(query: string) {
    const url = `${this.API_URL}${query}&api_key=${apiKey}&language=es&include_image_language=es,null`;
    return this.http.get<T>(url);
  }

  constructor(private http: HttpClient) {}

  getTheatresMovies(): Observable<Movie[]> {
    const today = new Date();
    const lastDay = today.getDate();
    const month = today.getMonth() + 1;
    let monthString;

    if (month < 10) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const start = `${today.getFullYear()}-${monthString}-01`;
    const end = `${today.getFullYear()}-${monthString}-${lastDay}`;

    return this.requestQuery<MatchResponse>(
      `/discover/movie?primary_release_date.gte=${start}&primary_release_date.lte=${end}`
    ).pipe(map((res: MatchResponse) => res.results));
  }

  getPopularMovies(): Observable<Movie[]> {
    this.actualPage++;
    return this.requestQuery<MatchResponse>(
      `/discover/movie?sort_by=popularity.desc&page=${this.actualPage}`
    ).pipe(map((res: MatchResponse) => res.results));
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.requestQuery<MovieDetails>(`/movie/${id}?a=1`);
  }

  searchMovie(text: string): Observable<Movie[]> {
    return this.requestQuery<MatchResponse>(`/search/movie?query=${text}`).pipe(
      map((res: MatchResponse) => res.results)
    );
  }

  getActors(id: number): Observable<creditsDetails> {
    return this.requestQuery<creditsDetails>(`/movie/${id}/credits?a=1`);
  }

  getGenreMovies(): Observable<Genre[]> {
    return this.requestQuery<GenreResponse>(`/genre/movie/list?a=1`).pipe(
      map((res: GenreResponse) => res.genres)
    );
  }
}
