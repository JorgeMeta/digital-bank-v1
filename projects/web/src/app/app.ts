import { Component, signal, effect, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { Theme } from './core/services/theme/theme';
import { UserService } from './core/services/user/user';
import { SidebarComponent } from './shared/components/sidebar/sidebar';
import { Layout } from './core/services/layout/layout';

@Component({
  selector: 'da-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('web');
  private theme = inject(Theme);
  isSidebarOpen = signal(true);
  layout = inject(Layout);
  userService = inject(UserService);
  constructor() {
    this.theme.loadSavedTheme();

    effect(() => {
      console.log('Thema atual:', this.theme.currentTheme());
    });
  }
  toggleTheme() {
    this.theme.toggleTheme();
  }
  ngOnInit(): void {}
}
