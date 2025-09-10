import { DEVELOPE_MENU_ITEMS } from '@/app/common/menu-items'
import { LogoBoxComponent } from '@/app/components/logo-box/logo-box.component'
import { NotificationComponent } from '@/app/components/notification/notification.component'
import { ProfileMenuComponent } from '@/app/components/profile-menu/profile-menu.component'
import { Component } from '@angular/core'
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'index3-topbar',
  standalone: true,
  imports: [
    LogoBoxComponent,
    NotificationComponent,
    ProfileMenuComponent,
    NgbDropdownModule,
    NgbCollapseModule,
  ],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent {
  menuItems = DEVELOPE_MENU_ITEMS
  isCollapsed = true
  subMenuCollapsed = true
  scrollY = 0

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
