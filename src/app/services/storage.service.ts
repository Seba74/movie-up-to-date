import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { MovieDetails } from '../interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  
  public movies: MovieDetails[] = [];

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.getMovies();
  }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 500,
      position: 'top'
    });
    toast.present();
  }

  saveMovie(movie: MovieDetails) {
    if (!this.movies.find((m) => m.id === movie.id)) {
      this.movies.push(movie);
      this.presentToast('Película agregada a favoritos');
    } else {
      this.movies = this.movies.filter((m) => m.id !== movie.id);
      this.presentToast('Película eliminada de favoritos');
    }
    this.storage.set('movies', this.movies);
  }

  async getMovies() {
    this.movies = await this.storage.get('movies') || [];
    return this.movies;
  }

  async movieExist(id: number) {
    await this.getMovies();
    const exist = this.movies.find((m) => m.id === id);

    return exist ? true : false;

  }
}
