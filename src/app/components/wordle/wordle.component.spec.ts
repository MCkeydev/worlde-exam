// src/app/components/wordle/wordle.component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WordleComponent } from './wordle.component';
import { GameMode } from '../../services/game-state.service';

describe('WordleComponent - Extended', () => {
  let component: WordleComponent;
  let fixture: ComponentFixture<WordleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordleComponent, FormsModule]  // <-- Importing standalone component here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Wordle component', () => {
    expect(component).toBeTruthy();
  });

  it('should update keyboard state with higher priority colors', () => {
    component.updateKeyboard('abcde', ['gray', 'yellow', 'gray', 'green', 'gray']);
    expect(component.keyboard['A']).toEqual('gray');
    expect(component.keyboard['B']).toEqual('yellow');
    expect(component.keyboard['D']).toEqual('green');
    
    // Check that updating with better feedback overwrites the older feedback
    component.updateKeyboard('bzzzz', ['green', 'gray', 'gray', 'gray', 'gray']);
    expect(component.keyboard['B']).toEqual('green');
  });

  it('should start and stop timer in Timed mode', fakeAsync(() => {
    component.selectedMode = GameMode.Timed;
    component.startNewGame();
    expect(component.timerValue).toEqual(60);
    tick(5000);
    fixture.detectChanges();
    expect(component.timerValue).toEqual(55);
    component.stopTimer();
    tick(3000);
    expect(component.timerValue).toEqual(55);
  }));

  it('should disable guess input when time runs out', fakeAsync(() => {
    component.selectedMode = GameMode.Timed;
    component.startNewGame();
    tick(60000);
    fixture.detectChanges();
    expect(component.message).toContain("Time's up");
    expect(component.gameEnded).toBeTrue();
  }));

  it('should process a valid guess and update the history', () => {
    component.selectedMode = GameMode.Standard;
    component.selectedLength = 5;
    component.currentGuess = 'petit';
    component.onGuess();
    expect(component.history.length).toBeGreaterThan(0);
  });

  it('should show error message for invalid guess length', () => {
    component.selectedLength = 5;
    component.currentGuess = 'appl'; // too short
    component.onGuess();
    expect(component.message).toContain('Invalid word');
  });
});
