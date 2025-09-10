import {
  findAllParent,
  findMenuItem,
  getMenuItemFromURL,
} from '@/app/common/active-menu'
import { basePath } from '@/app/common/constants'
import { ADMIN_MENU_ITEMS, type MenuItemType } from '@/app/common/menu-items'
import { MenuItemWithChildrenComponent } from '@/app/components/app-menu/components/horizontal-menu-item-with-children.component'
import { MenuItemComponent } from '@/app/components/app-menu/components/horizontal-menu-item.component'
import { logout } from '@/app/store/authentication/authentication.actions'
import { Component, inject } from '@angular/core'
import { NavigationEnd, RouterModule, Router } from '@angular/router'
import {
  NgbActiveOffcanvas,
  NgbCollapseModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { filter } from 'rxjs'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MenuItemWithChildrenComponent,
    MenuItemComponent,
    NgbCollapseModule,
    RouterModule,
    NgbTooltipModule,
  ],
  templateUrl: './sidebar.component.html',
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class SidebarComponent {
  menuItems = ADMIN_MENU_ITEMS

  constructor(
    private router: Router,
    private store: Store
  ) {}

  activeMenuItems?: string[]
  trimmedURL = this.router.url?.replaceAll(
    basePath !== '' ? basePath + '/' : '',
    '/'
  )
  matchingMenuItem: MenuItemType | undefined

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.trimmedURL = this.router.url

        this.initActiveMenu()
      })
    this.initActiveMenu()
  }

  initActiveMenu() {
    if (this.menuItems)
      this.matchingMenuItem = getMenuItemFromURL(
        this.menuItems,
        this.trimmedURL
      )
    if (this.matchingMenuItem) {
      const activeMt = findMenuItem(this.menuItems, this.matchingMenuItem.key)
      if (activeMt) {
        this.activeMenuItems = [
          activeMt.key,
          ...findAllParent(this.menuItems, activeMt),
        ]
      }
    }
  }

  getActiveClass(item: MenuItemType) {
    return this.activeMenuItems && this.activeMenuItems.includes(item.key)
      ? ' active'
      : ''
  }

  openDropMenu(item: MenuItemType) {
    this.menuItems.forEach((item) => {
      item.isCollapsed = true
    })

    item.isCollapsed = !item.isCollapsed
  }

  logout() {
    this.store.dispatch(logout())
  }
}
