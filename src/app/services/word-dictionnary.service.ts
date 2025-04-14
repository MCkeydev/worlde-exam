// src/app/services/word-dictionary.service.ts
import { Injectable } from '@angular/core';
import { Words, WordsService } from './words.service';

@Injectable({ providedIn: 'root' })
export class WordDictionaryService {
  private validWords!: Words;
  constructor(private wordsService: WordsService) {
    this.wordsService.getWords().subscribe((words) => this.validWords = words);
  }
  

  isValid(word: string, length: number): boolean {
    
    // @ts-ignore
    return this.validWords[length].includes(word.toLowerCase());
  }

  getRandomWord(length: number = 5): string {
    console.log(this.validWords)
    // @ts-ignore
    const filtered = this.validWords[length].filter(word => word.length === length);
    if (filtered.length > 0) {
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
    
    // Fall back if no words of that length exist
    return this.validWords[5][0];
  }
}
