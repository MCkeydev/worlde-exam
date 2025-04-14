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
  targetWord = '';
  private gameOver = false;
  private currentMode: GameMode = GameMode.Standard;
  private wordLength = 5;
  private score = 0;

  constructor(
    private logic: GameLogicService,
    private dictionary: WordDictionaryService,
    private statistics: GameStatisticsService
  ) {}

  resetGame(mode: GameMode = GameMode.Standard, length: number = 5): void {
    this.attempts = 0;
    this.gameOver = false;
    this.currentMode = mode;
    this.wordLength = length;
    this.targetWord = this.dictionary.getRandomWord(length).toLowerCase();
    this.score = 0;
  }

  private calculateScore(): number {
    const baseScore = (this.maxAttempts - this.attempts) * 10;
    let multiplier = 1;
    switch (this.currentMode) {
      case GameMode.Timed:
        multiplier = 2;
        break;
      case GameMode.Practice:
        multiplier = 0.5;
        break;
      default:
        multiplier = 1;
        break;
    }
    return Math.floor(baseScore * multiplier);
  }

  makeGuess(guess: string): { feedback: Feedback[], gameOver: boolean, won: boolean, score: number } | null {
    if (this.gameOver || this.attempts >= this.maxAttempts) return null;
    if (!this.dictionary.isValid(guess, this.wordLength)) {
      return null;
    }
    const feedback = this.logic.checkGuess(guess.toLowerCase(), this.targetWord);
    this.attempts++;
    const won = feedback.every(f => f === 'green');
    if (won || this.attempts === this.maxAttempts) {
      this.gameOver = true;
      this.score = won ? this.calculateScore() : 0;
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
