import { Component, signal, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { Theme } from './core/services/theme/theme';

@Component({
  selector: 'da-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('web');
  private theme = inject(Theme);
  constructor() {
    this.theme.loadSavedTheme();

    effect(() => {
      console.log('Thema atual:', this.theme.currentTheme());
    });
  }
  toggleTheme() {
    this.theme.toggleTheme();
  }
}
