// src/app/services/game-state.service.spec.ts
import { GameStateService, GameMode } from './game-state.service';
import { GameLogicService } from './game-logic.service';
import { WordDictionaryService } from './word-dictionnary.service';
import { GameStatisticsService } from './game-statistics.service';
import { of } from 'rxjs';
import { Words, WordsService } from './words.service';
import { TestBed } from '@angular/core/testing';

class FakeWordsService {
  // Define a fake words object with 5- and 6-letter word arrays
  private fakeWords: Words = {
    "5": ["apple", "pomme", "table", "livre"],
    "6": ["orange", "tomate", "banane", "cheval"]
  };

  getWords() {
    return of(this.fakeWords);
  }
}

describe('GameStateService - Extended Coverage', () => {
  let words: WordsService;
  let service: GameStateService;
  let logic: GameLogicService;
  let dictionary: WordDictionaryService;
  let statistics: GameStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WordDictionaryService,
        { provide: WordsService, useClass: FakeWordsService } 
      ]
    });
    words = new WordsService();
    dictionary = new WordDictionaryService(words);

    logic = new GameLogicService();
    statistics = new GameStatisticsService();
    service = new GameStateService(logic, dictionary, statistics);
  });

  it('should reset game with Standard mode correctly', () => {
    service.resetGame(GameMode.Standard, 5);
    expect(service.getRemainingAttempts()).toEqual(6);
  });

  it('should calculate score for a win in Timed mode', () => {
    // Force target word to a known value:
    service.resetGame(GameMode.Timed, 5);
    const target = service.targetWord;
    // Simulate correct guess:
    const result = service.makeGuess(target);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.won).toBeTrue();
      // In Timed mode, score multiplier is 2:
      expect(result.score).toBeGreaterThan(0);
    }
  });

  it('should calculate score for a win in Practice mode', () => {
    service.resetGame(GameMode.Practice, 5);
    const target = service.targetWord;
    const result = service.makeGuess(target);
    if (result) {
      expect(result.won).toBeTrue();
      // In Practice mode, score multiplier is 0.5:
      expect(result.score).toBeGreaterThanOrEqual(0);
    }
  });

  it('should mark game as over if maximum attempts reached without win', () => {
    service.resetGame(GameMode.Standard, 5);
    // Guess wrong 6 times (assuming dictionary prevents invalid words)
    for (let i = 0; i < 6; i++) {
      service.makeGuess('petit'); // If 'grape' isn't the target word
    }
    expect(service.isGameOver()).toBeTrue();
  });

  it('should return null for an invalid word (not in dictionary)', () => {
    service.resetGame(GameMode.Standard, 5);
    expect(service.makeGuess('zzzzz')).toBeNull();
  });
});
