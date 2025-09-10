import { DEMO_MENU_ITEMS } from '@/app/common/menu-items'
import { LogoBoxComponent } from '@/app/components/logo-box/logo-box.component'
import { ThemeSwitcherComponent } from '@/app/components/theme-switcher/theme-switcher.component'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'index7-topbar',
  standalone: true,
  imports: [
    LogoBoxComponent,
    ThemeSwitcherComponent,
    RouterModule,
    NgbDropdownModule,
    NgbCollapseModule,
  ],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent {
  menuItems = DEMO_MENU_ITEMS[0]
  scrollY = 0

  isCollapsed = true
  constructor() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.handleScroll()
  }

  handleScroll = () => {
    this.scrollY = window.scrollY
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
