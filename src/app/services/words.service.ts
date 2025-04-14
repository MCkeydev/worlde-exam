// src/app/services/french-words.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Words {
  "5": string[];
  "6": string[];
}

@Injectable({ providedIn: 'root' })
export class WordsService {
  private wordsUrl = '/assets/words.json';
  constructor(private http: HttpClient) {}

  public getWords(): Observable<Words> {
    return this.http.get<Words>(this.wordsUrl);
  }
}
