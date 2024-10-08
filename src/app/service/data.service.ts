import { Injectable } from '@angular/core';
import { from, map, mergeMap, of, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allImageUrl!: Array<string>;

  constructor() {
    this.allImageList();
  }

  allImageList() {
    of(...new Array(6)).pipe(
      map(() => {
        const id = Math.floor(Math.random() * 1000);
        return `https://picsum.photos/id/${id}/301/200`;
      }),
      mergeMap((url) => from([url, url])),
      toArray(),
      map((urls) => urls.sort(() => Math.random() - 0.5)),
    ).subscribe({
      next: (item) => {
        this.allImageUrl = item;
      }
    });
  }

}
