import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ContentService } from '../content.service';

interface CC {
  line1: string;
  line2: string;
  img1: string;
  img2: string;
  pos1: Coords;
  pos2: Coords;
}

interface Coords {
  x: number,
  y: number
}

@Component({
  selector: 'cc',
  templateUrl: './cc.component.html'
})
export class CcComponent {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  readonly content$ = this.contentService.getCelebAndThing$.pipe(
    map((allStuff) => {
      const rndPerson = allStuff.people[Math.floor(Math.random() * allStuff.people.length)];
      const rndThing = allStuff.things[Math.floor(Math.random() * allStuff.things.length)];
      const isFemale = rndPerson.sex_or_genderLabel === 'female';

      const w = window.innerWidth;

      const rndX1 = (Math.random() * w * 0.8) - (w * 0.4);
      const rndX2 = (Math.random() * w * 0.8) - (w * 0.4);
      const rndY1 = Math.random() * 40;
      const rndY2 = Math.random() * -40;

      const joke: CC = {
        line1: `${rndPerson.humanLabel} called.`,
        line2: `${isFemale ? 'She' : 'He'} wants ${isFemale ? 'her' : 'his'} ${rndThing.itemLabel} back.`,
        img1: rndPerson.image,
        img2: rndThing.image,
        pos1: {x: rndX1, y: rndY1},
        pos2: {x: rndX2, y: rndY2},
      }
      return joke;
    })
  );
}
