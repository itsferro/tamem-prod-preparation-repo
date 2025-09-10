import { Component, Input } from '@angular/core'
import { NavigationEnd, RouterLink, Router } from '@angular/router'
import { CategoryMenuComponent } from '../category-menu/category-menu.component'
import { MegaMenuComponent } from '../mega-menu/mega-menu.component'
import { MenuItemWithChildrenComponent } from '../horizontal-menu-item-with-children.component'
import { MenuItemComponent } from '../horizontal-menu-item.component'
import { DEMO_MENU_ITEMS, type MenuItemType } from '@/app/common/menu-items'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import {
  findAllParent,
  findMenuItem,
  getMenuItemFromURL,
} from '@/app/common/active-menu'
import { basePath } from '@/app/common/constants'
import { filter } from 'rxjs'

@Component({
  selector: 'app-horizontal-menu',
  standalone: true,
  imports: [
    RouterLink,
    CategoryMenuComponent,
    MegaMenuComponent,
    MenuItemWithChildrenComponent,
    MenuItemComponent,
    NgbDropdownModule,
  ],
  templateUrl: './horizontal-menu.component.html',
  styles: `
    :host(app-horizontal-menu) {
      display: contents;
    }
  `,
})
export class HorizontalMenuComponent {
  @Input() showMegaMenu?: boolean
  @Input() showExtraPages?: boolean
  @Input() showContact?: boolean
  @Input() showIcon?: boolean
  @Input() menuClassName?: string

  menuItems = DEMO_MENU_ITEMS
  activeMenuItems?: string[]

  constructor(private router: Router) {}

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
}
