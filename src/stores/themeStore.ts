import { makeAutoObservable } from 'mobx';

export type ThemeMode = 'light' | 'dark';

export const themeStore = makeAutoObservable({
  mode: 'light' as ThemeMode,

  toggle() {
    this.mode = this.mode === 'light' ? 'dark' : 'light';
  },
});
