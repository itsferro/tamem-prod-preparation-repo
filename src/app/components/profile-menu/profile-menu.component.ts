import { AuthService } from '@/app/core/service/auth-service.service'
import {
  storageThemeKey,
  ThemeModeService,
} from '@/app/core/service/theme-mode.service'
import { logout } from '@/app/store/authentication/authentication.actions'
import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [NgbDropdownModule, RouterLink],
  templateUrl: './profile-menu.component.html',
  styles: ``,
})
export class ProfileMenuComponent {
  preferredTheme: string = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light'

  getTheme = localStorage.getItem(storageThemeKey)
  mode: string = this.getTheme ? this.getTheme : this.preferredTheme

  public themeModeService = inject(ThemeModeService)
  public store = inject(Store)

  changeTheme(mode: 'light' | 'dark' | 'auto') {
    this.mode = mode
    this.themeModeService.updateTheme(mode)
  }

  logout() {
    this.store.dispatch(logout())
  }
}
