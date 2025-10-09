import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  currentTheme = signal<'banco-a' | 'banco-b'>('banco-a');
  constructor() {
    this.applyTheme(this.currentTheme());
  }
  applyTheme(theme: 'banco-a' | 'banco-b') {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme.set(theme);
    localStorage.setItem('theme', theme);
  }

  loadSavedTheme() {
    const saved = localStorage.getItem('theme') as 'banco-a' | 'banco-b' | null;
    if (saved) this.applyTheme(saved);
  }
  toggleTheme() {
    const newTheme = this.currentTheme() === 'banco-a' ? 'banco-b' : 'banco-a';
    this.applyTheme(newTheme);
  }
}
