// src/app/services/word-dictionary.service.ts
import { Injectable } from '@angular/core';
import { Words, WordsService } from './words.service';

@Injectable({ providedIn: 'root' })
export class WordDictionaryService {
  private validWords!: Words;
  constructor(private wordsService: WordsService) {
    this.validWords = this.wordsService.getWords();
  }
  

  isValid(word: string, length: number): boolean {
    // @ts-ignore
    return this.validWords[length.toString()].includes(word.toLowerCase());
  }

  getRandomWord(length: number = 5): string {
    if (6 !== length && 5 !== length) {
      return this.validWords["5"][0];
    }

      return this.validWords[length][Math.floor(Math.random() * length)];
  }
}
