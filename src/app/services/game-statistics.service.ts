// src/app/services/game-statistics.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameStatisticsService {
  wins = 0;
  gamesPlayed = 0;
  totalAttempts = 0;
  currentStreak = 0;

  recordGame(won: boolean, attempts: number): void {
    this.gamesPlayed++;
    this.totalAttempts += attempts;
    if (won) {
      this.wins++;
      this.currentStreak++;
    } else {
      this.currentStreak = 0;
    }
  }

  getAverageAttempts(): number {
    return this.gamesPlayed ? this.totalAttempts / this.gamesPlayed : 0;
  }
}
