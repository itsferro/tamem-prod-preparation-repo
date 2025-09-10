import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { CategoryMenuComponent } from './components/category-menu/category-menu.component'
import { MegaMenuComponent } from './components/mega-menu/mega-menu.component'
import { MenuItemWithChildrenComponent } from './components/horizontal-menu-item-with-children.component'
import { MenuItemComponent } from './components/horizontal-menu-item.component'
import { DEMO_MENU_ITEMS } from '@/app/common/menu-items'
import { LogoBoxComponent } from '../logo-box/logo-box.component'
import { HorizontalMenuComponent } from './components/horizontal-menu/horizontal-menu.component'
import { CommonModule } from '@angular/common'
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component'
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'
import { NotificationComponent } from '../notification/notification.component'
import { CartMenuComponent } from '../cart-menu/cart-menu.component'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    CategoryMenuComponent,
    MegaMenuComponent,
    MenuItemWithChildrenComponent,
    MenuItemComponent,
    LogoBoxComponent,
    HorizontalMenuComponent,
    CommonModule,
    ProfileMenuComponent,
    NgbDropdownModule,
    NgbCollapseModule,
    NotificationComponent,
    CartMenuComponent,
  ],
  templateUrl: './app-menu.component.html',
  styles: `
    :host(app-horizontal-menu) {
      display: contents;
    }
  `,
})
export class AppMenuComponent {
  @Input() showCategory?: boolean
  @Input() showMegaMenu?: boolean
  @Input() showExtraPages: boolean = true
  @Input() SearchWithText?: boolean
  @Input() SearchIcon?: boolean
  @Input() showContact?: boolean
  @Input() showIcon?: boolean
  @Input() showsignin?: boolean
  @Input() showCart?: boolean
  @Input() showNotification?: boolean
  @Input() fullWidth?: boolean = true
  @Input() menuClassName?: string
  @Input() navClassName?: string
  menuItems = DEMO_MENU_ITEMS
  scrollY = 0
  stickyHeight = 0

  isCollapsed = true
  constructor() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.handleScroll()
  }

  handleScroll = () => {
    this.scrollY = window.scrollY
    var stickyNav: any = document.querySelector('.navbar-sticky')
    this.stickyHeight = stickyNav?.offsetHeight
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
