import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ContentService } from '../content.service';

interface IMH {
  line1: string;
  line2: string;
  line3: string;
}

@Component({
  selector: 'imh',
  templateUrl: './imh.component.html'
})
export class ImhComponent {
  constructor(
    private readonly contentService: ContentService,
  ) {
    this.content$ = this.getContent();
  }

  content$?: Observable<IMH>;

  redo() {
    this.content$ = this.getContent();
  }

  getContent() {
    return this.contentService.getCityText().pipe(
      map((cities) => {
        const city = cities.data.places.find(city =>
          !!city.perex && (city.level === 'city' || city.level === 'region' || city.level === 'town')
        ) || cities.data.places[0];
        console.log(city.level);
        const cityIs = new RegExp(`(^.*? is |^${city.original_name}.*? is )`, 'i');
        const desc = city.perex ? city.perex.replace(cityIs,'').replace(`${city.name}, `,'').replace(`Located in`,'a place located in') : city.name;
  
        const joke: IMH = {
          line1: `I took my wife to ${desc}`,
          line2: `${city.name}?`,
          line3: `${city.name}? I married her!`,
        }
        return joke;
      })
    );
  }
}
