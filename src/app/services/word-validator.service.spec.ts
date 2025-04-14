// src/app/services/word-validator.service.spec.ts
import { WordValidatorService } from './word-validator.service';

describe('WordValidatorService', () => {
  let service: WordValidatorService;

  beforeEach(() => {
    service = new WordValidatorService();
  });

  it('rejects words shorter than the expected length', () => {
    expect(service.validateWord('abc', 5)).toBeFalse();
  });

  it('rejects words longer than the expected length', () => {
    expect(service.validateWord('abcdef', 5)).toBeFalse();
  });

  it('rejects words with non-alphabetic characters', () => {
    expect(service.validateWord('ab3d!', 5)).toBeFalse();
  });

  it('accepts valid word of expected length', () => {
    expect(service.validateWord('apple', 5)).toBeTrue();
  });
});
