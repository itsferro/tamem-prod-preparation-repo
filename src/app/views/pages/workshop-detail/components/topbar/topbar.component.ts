import { DEMO_MENU_ITEMS } from '@/app/common/menu-items'
import { LogoBoxComponent } from '@/app/components/logo-box/logo-box.component'
import { NotificationComponent } from '@/app/components/notification/notification.component'
import { ProfileMenuComponent } from '@/app/components/profile-menu/profile-menu.component'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'workshop-topbar',
  standalone: true,
  imports: [
    LogoBoxComponent,
    RouterModule,
    ProfileMenuComponent,
    NotificationComponent,
    NgbDropdownModule,
    NgbCollapseModule,
  ],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent {
  menuItems = DEMO_MENU_ITEMS[0]

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
