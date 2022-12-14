import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ContentService } from '../content.service';

interface WTD {
  line1: string;
  line2: string;
}

@Component({
  selector: 'wtd',
  templateUrl: './wtd.component.html'
})
export class WtdComponent {
  constructor(
    private readonly contentService: ContentService,
  ) {
    this.content$ = this.getContent();
  }

  content$?: Observable<WTD | null>;

  redo() {
    this.content$ = this.getContent();
  }

  getContent() {
    return this.contentService.getWordsText().pipe(
      map((allWords) => {
        if (allWords) {
          const firstNoun = allWords.find(word => word.tags.includes('n')) || allWords[0];
          const vowels = ["a", "e", "i", "o", "u"];
          const startsWithVowel = vowels.includes(firstNoun.word.charAt(0));
          const word = `${startsWithVowel ? 'an' : 'a'} ${firstNoun.word}`;

          const firstNounDesc = firstNoun.defs?.find(def => def.includes('n\t')) || firstNoun.defs[0];

          const joke: WTD = {
            line1: `What's the difference between ${word} and Donald Trump?`,
            line2: `One's ${firstNounDesc.replace('n\t','').replace('adj ','')}... <br />the other's ${word}.`,
          }
          return joke;
        } else {
          return null;
        }
      })
    );
  }
}
