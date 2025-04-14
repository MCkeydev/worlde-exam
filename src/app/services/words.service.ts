// src/app/services/french-words.service.ts
import { Injectable } from '@angular/core';

export interface Words {
  "5": string[];
  "6": string[];
}

@Injectable({ providedIn: 'root' })
export class WordsService {
  private words: Words = {
    "5": [
      "pomme",
      "terre",
      "fleur",
      "livre",
      "belle",
      "chien",
      "table",
      "porte",
      "arbre",
      "salut",
      "petit",
      "grand",
      "rouge",
      "blanc",
      "noire",
      "verre",
      "sable",
      "chaud",
      "crime",
      "rural"
    ],
    "6": [
      "orange",
      "rapide",
      "joueur",
      "chante",
      "souris",
      "gauche",
      "droite",
      "chance",
      "beaute",
      "calmer",
      "citron",
      "simple",
      "module",
      "voyage",
      "espace",
      "muscle",
      "nature",
      "minute",
      "valeur",
      "formel"
    ]
  }
  
  public getWords(): Words {
    return this.words;
  }
}
