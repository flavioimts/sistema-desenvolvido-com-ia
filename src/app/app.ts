import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoursesListComponent } from './courses-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoursesListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sistema-desenvolvido-com-ia');
}
