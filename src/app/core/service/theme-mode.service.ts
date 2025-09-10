import { Injectable } from '@angular/core'
import { toggleDocumentAttribute } from '../utils/layout'

export const themeAttributeKey = 'data-bs-theme'

export const storageThemeKey = 'booking-theme'

@Injectable({
  providedIn: 'root',
})
export class ThemeModeService {
  theme: string = 'light' || 'dark' || 'auto'

  constructor() {
    this.theme = this.getSavedTheme()
  }

  private getSavedTheme(): 'light' | 'dark' {
    const foundTheme = localStorage.getItem(storageThemeKey)
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    if (foundTheme) {
      if (foundTheme === 'auto') {
        toggleDocumentAttribute(themeAttributeKey, preferredTheme)
        return preferredTheme
      }
      toggleDocumentAttribute(themeAttributeKey, foundTheme)
      return foundTheme == 'dark' ? 'dark' : 'light'
    } else {
      localStorage.setItem(storageThemeKey, preferredTheme)
      return preferredTheme
    }
  }

  updateTheme(newTheme: 'light' | 'dark' | 'auto') {
    const foundTheme = localStorage.getItem(storageThemeKey)
    if (foundTheme !== newTheme) {
      toggleDocumentAttribute(themeAttributeKey, newTheme)
      localStorage.setItem(storageThemeKey, newTheme)
      this.theme = newTheme
    }
    this.getSavedTheme()
  }
}
