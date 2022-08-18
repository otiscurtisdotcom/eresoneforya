import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, shareReplay, switchMap } from 'rxjs';

interface City {
  city: string,
  cityLabel: string,
}

interface CityContent {
  data: {
    places: {
      level: string;
      name: string;
      original_name?: string;
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

interface Person {
  humanLabel: string;
  image: string;
  sex_or_genderLabel: string;
}

interface Thing {
  image: string;
  itemLabel: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(
    private readonly http: HttpClient
  ) {}
  
  // IMH
  readonly getCitiesList$ = this.http.get<City[]>('assets/json/cities.json').pipe(shareReplay(1));

  getCityText() {
    return this.getCitiesList$.pipe(
      switchMap((allCities) => {
        const rndCity = allCities[Math.floor(Math.random() * allCities.length)];

        return this.http.get<CityContent>(`https://api.sygictraveldata.com/1.0/en/places/list?query=${rndCity.cityLabel}`)
        // return this.http.get<CityContent>(`https://api.sygictraveldata.com/1.0/en/places/list?query=Serekunda`);
      })
    )
  }

  // WTD
  readonly getWordsList$ = this.http.get<Words>('assets/json/words.json').pipe(shareReplay(1));

  getWordsText() {
    return this.getWordsList$.pipe(
    switchMap((allWords) => {
      const rndWord = allWords.data[Math.floor(Math.random() * allWords.data.length)];
      return this.http.get<WordContent[]>(`https://api.datamuse.com/words?ml=${rndWord.word}&md=d&max=5`)
    })
  )}

  // CC
  getCelebAndThing() {
    return combineLatest([
      this.http.get<Person[]>('assets/json/people.json'),
      this.http.get<Thing[]>('assets/json/things.json'),
    ])
      .pipe(
        shareReplay(1),
        map(([people, things]) => {
          return {people, things}
        })
    )
  }
}
