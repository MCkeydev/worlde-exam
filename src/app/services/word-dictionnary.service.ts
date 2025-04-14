// src/app/services/word-dictionary.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WordDictionaryService {
  private validWords = ['apple', 'grape', 'mango', 'peach', 'berry', 'lemon'];

  isValid(word: string): boolean {
    return this.validWords.includes(word.toLowerCase());
  }

  getRandomWord(length: number = 5): string {
    const filtered = this.validWords.filter(word => word.length === length);
    if (filtered.length > 0) {
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
    // Fall back if no words of that length exist
    return this.validWords[0];
  }
}
