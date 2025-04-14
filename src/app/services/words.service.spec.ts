import { TestBed } from '@angular/core/testing';

import { WordsService } from './words.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('WordsService', () => {
  let service: WordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpTestingController], 
    });
    service = TestBed.inject(WordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
