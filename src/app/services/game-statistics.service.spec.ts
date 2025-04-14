// src/app/services/game-statistics.service.spec.ts
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameStatisticsService } from './game-statistics.service';

describe('GameStatisticsService', () => {
  let service: GameStatisticsService;

  beforeEach(() => {
    service = new GameStatisticsService();
  });

  it('records a win and updates statistics', () => {
    service.recordGame(true, 3);
    expect(service.wins).toBe(1);
    expect(service.gamesPlayed).toBe(1);
    expect(service.getAverageAttempts()).toEqual(3);
  });

  it('resets streak on loss', () => {
    service.recordGame(true, 4);
    service.recordGame(false, 6);
    expect(service.currentStreak).toBe(0);
  });
});
