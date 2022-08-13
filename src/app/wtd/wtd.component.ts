import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ContentService } from '../content.service';

interface WTD {
  line1: string;
  line2: string;
}

@Component({
  selector: 'app-imh',
  templateUrl: './wtd.component.html'
})
export class WtdComponent {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  readonly content$ = this.contentService.getWordsText$.pipe(
    map((allWords) => {
      if (allWords) {
        const firstNoun = allWords.find(word => word.tags.includes('n')) || allWords[0];
        const vowels = ["a", "e", "i", "o", "u"];
        const startsWithVowel = vowels.includes(firstNoun.word.charAt(0));
        const word = `${startsWithVowel ? 'an' : 'a'} ${firstNoun.word}`;

        const firstNounDesc = firstNoun.defs.find(def => def.includes('n\t')) || firstNoun.defs[0];

        const joke: WTD = {
          line1: `What's the difference between ${word} and Donald Trump?`,
          line2: `One's ${firstNounDesc.replace('n\t','')}... <br />the other's ${word}.`,
        }
        return joke;
      } else {
        return null;
      }
    })
  );
}
