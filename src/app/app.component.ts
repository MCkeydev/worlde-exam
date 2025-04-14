import { Component } from '@angular/core';
import { WordleComponent } from './components/wordle/wordle.component';

@Component({
  selector: 'app-root',
  imports: [
    WordleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wordle-game';
}
