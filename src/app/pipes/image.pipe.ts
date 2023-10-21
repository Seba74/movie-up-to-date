import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  private url = 'https://image.tmdb.org/t/p/';
  public defaultImg = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';

  transform(value: string, size: string = 'w500'): string {
    if (!value || value === '') {
      return this.defaultImg;
    }

    return `${this.url}${size}${value}`;
  }
}
