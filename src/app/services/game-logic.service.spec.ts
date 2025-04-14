// src/app/services/game-logic.service.spec.ts
import { GameLogicService, Feedback } from './game-logic.service';

describe('GameLogicService', () => {
  let service: GameLogicService;

  beforeEach(() => {
    service = new GameLogicService();
  });

  it('identifies exact matches as green', () => {
    const result: Feedback[] = service.checkGuess('apple', 'apple');
    expect(result.every(color => color === 'green')).toBeTrue();
  });

  it('identifies letters in wrong positions as yellow', () => {
    // "pepla" rearranges letters of "apple"
    const result: Feedback[] = service.checkGuess('pepla', 'apple');
    expect(result).toContain('yellow');
  });

  it('assigns gray to letters not in the target word', () => {
    const result: Feedback[] = service.checkGuess('zzzzz', 'apple');
    expect(result.every(color => color === 'gray')).toBeTrue();
  });
});
