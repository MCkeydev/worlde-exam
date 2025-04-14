// src/app/services/game-logic.service.ts
import { Injectable } from '@angular/core';

export type Feedback = 'green' | 'yellow' | 'gray';

@Injectable({ providedIn: 'root' })
export class GameLogicService {
  checkGuess(guess: string, target: string): Feedback[] {
    const len = target.length;
    const feedback: Feedback[] = Array(len).fill('gray');
    const used = Array(len).fill(false);

    // First pass: green – correct letter in correct position
    for (let i = 0; i < len; i++) {
      if (guess[i] === target[i]) {
        feedback[i] = 'green';
        used[i] = true;
      }
    }
    // Second pass: yellow – letter exists in the target word in a wrong position
    for (let i = 0; i < len; i++) {
      if (feedback[i] !== 'green') {
        for (let j = 0; j < len; j++) {
          if (!used[j] && guess[i] === target[j]) {
            feedback[i] = 'yellow';
            used[j] = true;
            break;
          }
        }
      }
    }
    return feedback;
  }
}
