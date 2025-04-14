// src/app/services/word-dictionary.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WordDictionaryService } from './word-dictionnary.service';
import { WordsService, Words } from './words.service';
import {HttpTestingController } from '@angular/common/http/testing';

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

describe('WordDictionaryService', () => {
  let service: WordDictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpTestingController], 
      providers: [
        WordDictionaryService,
        { provide: WordsService, useClass: FakeWordsService } // provide the fake WordsService
      ]
    });
    service = TestBed.inject(WordDictionaryService);
  });

  it('should return true for a valid word', () => {
    expect(service.isValid('apple', 5)).toBeTrue();
  });

  it('should return false for an invalid word', () => {
    expect(service.isValid('zzzzz', 5)).toBeFalse();
  });

  it('should return a random word of specified length if available', () => {
    const word = service.getRandomWord(5);
    expect(word.length).toEqual(5);
    // Check that word is from the validWords array (case-insensitive)
    expect(service.isValid(word, 5)).toBeTrue();
  });

  it('should default to first valid word if no word of specified length exists', () => {
    // Force dictionary into a state with no words for the given length
    // For this test we directly override the validWords property.
    (service as any).validWords = { "5": ["apple", "pomme"], "6": ["orange"] };
    expect(service.getRandomWord(7)).toEqual("apple");
  });
});
