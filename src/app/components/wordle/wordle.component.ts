// src/app/components/wordle/wordle.component.ts
import { Component, OnInit } from '@angular/core';
import { GameMode, GameStateService } from '../../services/game-state.service';
import { Feedback } from '../../services/game-logic.service';
import { WordValidatorService } from '../../services/word-validator.service';
import { GameStatisticsService } from '../../services/game-statistics.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css'],
  imports: [
    FormsModule,
    NgClass, 
    NgIf,
    NgFor,
    CommonModule,
  ]
})
export class WordleComponent implements OnInit {
  currentGuess = '';
  history: { word: string, feedback: Feedback[] }[] = [];
  message = '';
  gameEnded = false;
  selectedMode: GameMode = GameMode.Standard;
  selectedLength = 5;
  score = 0;
  // Show basic statistics from previous games
  wins = 0;
  gamesPlayed = 0;
  averageAttempts = 0;
  
  gameModes = Object.values(GameMode);

  constructor(
    private gameState: GameStateService,
    private validator: WordValidatorService,
    private statistics: GameStatisticsService
  ) {}

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame() {
    this.gameState.resetGame(this.selectedMode, this.selectedLength);
    this.history = [];
    this.currentGuess = '';
    this.message = '';
    this.gameEnded = false;
    this.score = 0;
  }

  onGuess() {
    if (!this.validator.validateWord(this.currentGuess, this.selectedLength)) {
      this.message = `Invalid word. Must be ${this.selectedLength} alphabetic letters.`;
      return;
    }
    const result = this.gameState.makeGuess(this.currentGuess);
    if (!result) {
      this.message = 'Word not found in dictionary or game over.';
      return;
    }
    this.history.push({ word: this.currentGuess.toLowerCase(), feedback: result.feedback });
    this.currentGuess = '';

    if (result.won) {
      this.message = '🎉 You guessed the word!';
      this.gameEnded = true;
      this.score = result.score;
    } else if (result.gameOver) {
      this.message = '💀 Game over!';
      this.gameEnded = true;
    } else {
      this.message = '';
    }
    // Update statistics display
    this.wins = this.statistics.wins;
    this.gamesPlayed = this.statistics.gamesPlayed;
    this.averageAttempts = this.statistics.getAverageAttempts();
  }

  resetGame() {
    this.startNewGame();
  }
}
