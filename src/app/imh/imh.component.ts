import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ContentService } from '../content.service';

interface IMH {
  line1: string;
  line2: string;
  line3: string;
}

@Component({
  selector: 'app-imh',
  templateUrl: './imh.component.html',
  styleUrls: ['./imh.component.scss']
})
export class ImhComponent implements OnInit {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  readonly content$ = this.contentService.getCityText$.pipe(
    map((cities) => {
      console.log(cities);
      const city = cities.data.places.find(city => !!city.perex) || cities.data.places[0];
      const desc = city.perex ? city.perex.replace(`${city.name} is`,'').replace(`${city.name}, `,'').replace(`Located in`,'a place located in') : city.name;

      const joke: IMH = {
        line1: `I took my wife to ${desc}`,
        line2: `${city.name}?`,
        line3: `${city.name}? I married her!`,
      }
      return joke;
    })
  );

  ngOnInit() {
    console.log('loaded');
  }
}
