import { TestBed } from '@angular/core/testing';

import { WordDictionaryService } from './word-dictionnary.service';

describe('WordDictionnaryService', () => {
  let service: WordDictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordDictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
