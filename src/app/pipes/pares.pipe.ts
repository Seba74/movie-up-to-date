import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pares',
})
export class ParesPipe implements PipeTransform {
  transform(movies: any[]): any {
    const pares = movies.reduce((result, value, index, movies) => {
      if (index % 2 === 0) {
        result.push(movies.slice(index, index + 2));
      }
      return result;
    }, []);
    return pares;
  }
}
