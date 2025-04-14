// src/app/services/game-state.service.spec.ts
import { GameStateService, GameMode } from './game-state.service';
import { GameLogicService } from './game-logic.service';
import { WordDictionaryService } from './word-dictionnary.service';
import { GameStatisticsService } from './game-statistics.service';

describe('GameStateService', () => {
  let service: GameStateService;
  let logic: GameLogicService;
  let dictionary: WordDictionaryService;
  let statistics: GameStatisticsService;

  beforeEach(() => {
    logic = new GameLogicService();
    dictionary = new WordDictionaryService();
    statistics = new GameStatisticsService();
    service = new GameStateService(logic, dictionary, statistics);
    service.resetGame(GameMode.Standard, 5);
  });

  it('resets game correctly and selects target word', () => {
    service.resetGame(GameMode.Standard, 5);
    expect(service.getRemainingAttempts()).toEqual(6);
  });

  it('processes a correct guess and returns win state', () => {
    // Force the target word from dictionary to be valid (for test purposes)
    service.resetGame(GameMode.Standard, 5);
    service.resetGame();
    const target = service.targetWord;
    // Simulate correct guess; note that our game logic is case-insensitive.
    const result = service.makeGuess(target);
    expect(result?.won).toBeTrue();
    expect(result?.gameOver).toBeTrue();
    expect(result?.score).toBeGreaterThan(0);
  });

  it('returns null when word is not in the dictionary', () => {
    const result = service.makeGuess('zzzzz');
    expect(result).toBeNull();
  });
});
