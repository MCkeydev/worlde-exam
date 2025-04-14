// src/app/services/word-validator.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WordValidatorService {
  // Validate word based on length and alphabetic only
  validateWord(word: string, expectedLength: number = 5): boolean {
    const regex = new RegExp(`^[a-zA-Z]{${expectedLength}}$`);
    return regex.test(word);
  }
}
