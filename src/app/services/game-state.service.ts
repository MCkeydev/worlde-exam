// src/app/services/game-state.service.ts
import { Injectable } from '@angular/core';
import { GameLogicService, Feedback } from './game-logic.service';
import { WordDictionaryService } from './word-dictionnary.service';
import { GameStatisticsService } from './game-statistics.service';

export enum GameMode {
  Standard = 'Standard',
  Timed = 'Timed',
  Practice = 'Practice',
}

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private maxAttempts = 6;
  private attempts = 0;
  public targetWord = '';
  private gameOver = false;
  private currentMode: GameMode = GameMode.Standard;
  private wordLength = 5;
  private score = 0;

  constructor(
    private logic: GameLogicService,
    private dictionary: WordDictionaryService,
    private statistics: GameStatisticsService
  ) {}

  // Reset the game with options for mode and word length.
  resetGame(mode: GameMode = GameMode.Standard, length: number = 5): void {
    this.attempts = 0;
    this.gameOver = false;
    this.currentMode = mode;
    this.wordLength = length;
    this.targetWord = this.dictionary.getRandomWord(length).toLowerCase();
    this.score = 0;
  }

  // Calculate score after game ends
  private calculateScore(): number {
    // Base: more remaining attempts yields a higher score.
    let baseScore = (this.maxAttempts - this.attempts) * 10;
    // Mode multiplier
    let multiplier = 1;
    switch (this.currentMode) {
      case GameMode.Timed:
        multiplier = 2;
        break;
      case GameMode.Practice:
        multiplier = 0.5;
        break;
      case GameMode.Standard:
      default:
        multiplier = 1;
        break;
    }
    return Math.floor(baseScore * multiplier);
  }

  // Process a guess and update game state.
  makeGuess(guess: string): { feedback: Feedback[], gameOver: boolean, won: boolean, score: number } | null {
    if (this.gameOver || this.attempts >= this.maxAttempts) return null;
    // If the guessed word is not in our dictionary, we could reject it
    if (!this.dictionary.isValid(guess)) {
      return null;
    }

    const feedback = this.logic.checkGuess(guess.toLowerCase(), this.targetWord);
    this.attempts++;
    const won = feedback.every(f => f === 'green');
    if (won || this.attempts === this.maxAttempts) {
      this.gameOver = true;
      // Calculate score only if the player has won, else score is zero.
      this.score = won ? this.calculateScore() : 0;
      // Record the game statistics
      this.statistics.recordGame(won, this.attempts);
    }
    return { feedback, gameOver: this.gameOver, won, score: this.score };
  }

  getRemainingAttempts(): number {
    return this.maxAttempts - this.attempts;
  }

  isGameOver(): boolean {
    return this.gameOver;
  }
}
