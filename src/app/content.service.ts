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

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(
    private readonly http: HttpClient
  ) {}

  readonly getCitiesList$ = this.http.get<City[]>('/assets/json/cities.json');

  readonly getCityText$ = this.getCitiesList$.pipe(
    switchMap((allCities) => {
      const rndCity = allCities[Math.floor(Math.random() * allCities.length)];
      return this.http.get<CityContent>(`https://api.sygictraveldata.com/1.0/en/places/list?query=${rndCity.cityLabel}`)
    })
  )
}
