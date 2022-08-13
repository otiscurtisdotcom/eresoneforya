import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';

interface City {
  city: string,
  cityLabel: string,
}

interface CityContent {
  data: {
    places: {
      name: string;
      perex: string;
    }[];
  }
}

interface Words {
  data: {
    word: string;
  }[]
}

interface WordContent {
  defs: string[];
  tags: string[];
  word: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(
    private readonly http: HttpClient
  ) {}
  
  // IMH
  readonly getCitiesList$ = this.http.get<City[]>('/assets/json/cities.json');

  readonly getCityText$ = this.getCitiesList$.pipe(
    switchMap((allCities) => {
      const rndCity = allCities[Math.floor(Math.random() * allCities.length)];
      return this.http.get<CityContent>(`https://api.sygictraveldata.com/1.0/en/places/list?query=${rndCity.cityLabel}`)
    })
  )

  // WTD
  readonly getWordsList$ = this.http.get<Words>('/assets/json/words.json');

  readonly getWordsText$ = this.getWordsList$.pipe(
    switchMap((allWords) => {
      const rndWord = allWords.data[Math.floor(Math.random() * allWords.data.length)];
      return this.http.get<WordContent[]>(`https://api.datamuse.com/words?ml=${rndWord.word}&md=d&max=5`)
    })
  )
}
