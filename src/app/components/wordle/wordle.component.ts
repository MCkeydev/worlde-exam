// src/app/components/wordle/wordle.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameMode, GameStateService } from '../../services/game-state.service';
import { WordValidatorService } from '../../services/word-validator.service';
import { GameStatisticsService } from '../../services/game-statistics.service';
import { Feedback } from '../../services/game-logic.service';
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
    CommonModule
  ]
})
export class WordleComponent implements OnInit, OnDestroy {
  currentGuess = '';
  history: { word: string, feedback: Feedback[] }[] = [];
  message = '';
  gameEnded = false;
  selectedMode: GameMode = GameMode.Standard;
  selectedLength = 5;
  score = 0;
  wins = 0;
  gamesPlayed = 0;
  averageAttempts = 0;

  // Timer properties for Timed mode
  timerValue: number = 60;
  timerInterval: any;

  // Visual keyboard state – mapping each letter (A-Z) to a color or undefined
  keyboard: { [key: string]: 'green' | 'yellow' | 'gray' | undefined } = {};
  // Define keyboard rows as arrays for display
keyboardRows: string[][] = [
  ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
  ['W', 'X', 'C', 'V', 'B', 'N']
];


  gameModes = Object.values(GameMode);

  constructor(
    private gameState: GameStateService,
    private validator: WordValidatorService,
    private statistics: GameStatisticsService
  ) {}

  ngOnInit(): void {
    this.startNewGame();
  }
  
  ngOnDestroy(): void {
    this.stopTimer();
  }

  startNewGame() {
    this.gameState.resetGame(this.selectedMode, this.selectedLength);
    this.history = [];
    this.currentGuess = '';
    this.message = '';
    this.gameEnded = false;
    this.score = 0;
    this.keyboard = {}; // Reset keyboard
    if (this.selectedMode === GameMode.Timed) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  startTimer() {
    this.timerValue = 60;
    this.timerInterval = setInterval(() => {
      this.timerValue--;
      if (this.timerValue <= 0) {
        this.stopTimer();
        this.message = "⏰ Time's up!";
        this.gameEnded = true;
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  updateKeyboard(guess: string, feedback: Feedback[]): void {
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i].toUpperCase();
      const fb = feedback[i];
      const current = this.keyboard[letter];
      if (fb === 'green') {
        this.keyboard[letter] = 'green';
      } else if (fb === 'yellow') {
        if (current !== 'green') {
          this.keyboard[letter] = 'yellow';
        }
      } else if (fb === 'gray') {
        if (!current) {
          this.keyboard[letter] = 'gray';
        }
      }
    }
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
    // Update guess history and visual keyboard colors.
    this.history.push({ word: this.currentGuess.toLowerCase(), feedback: result.feedback });
    this.updateKeyboard(this.currentGuess, result.feedback);
    this.currentGuess = '';

    if (result.won) {
      this.message = '🎉 You guessed the word!';
      this.gameEnded = true;
      this.score = result.score;
      this.stopTimer();
    } else if (result.gameOver) {
      this.message = '💀 Game over!';
      this.gameEnded = true;
      this.stopTimer();
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
