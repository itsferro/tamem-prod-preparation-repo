import {
  storageThemeKey,
  ThemeModeService,
} from '@/app/core/service/theme-mode.service'
import { Component, inject } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './theme-switcher.component.html',
  styles: ``,
})
export class ThemeSwitcherComponent {
  preferredTheme: string = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light'

  getTheme = localStorage.getItem(storageThemeKey)
  mode: string = this.getTheme ? this.getTheme : this.preferredTheme

  public themeModeService = inject(ThemeModeService)

  changeTheme(mode: 'light' | 'dark' | 'auto') {
    this.mode = mode
    this.themeModeService.updateTheme(mode)
  }
}
