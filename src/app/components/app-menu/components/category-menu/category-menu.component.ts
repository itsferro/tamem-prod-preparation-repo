import { Component, Input } from '@angular/core'
import { CATEGORY_MENU_ITEMS } from '../../../../common/menu-items'
import { MenuItemWithChildrenComponent } from '../horizontal-menu-item-with-children.component'
import { MenuItemComponent } from '../horizontal-menu-item.component'
import { MegaMenuItemComponent } from '../mega-menu/components/mega-menu.components'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [
    MenuItemWithChildrenComponent,
    MenuItemComponent,
    MegaMenuItemComponent,
    NgbDropdownModule,
  ],
  templateUrl: './category-menu.component.html',
  styles: `
    :host(app-category-menu) {
      display: contents;
    }
  `,
})
export class CategoryMenuComponent {
  @Input() ClassName!: string
  @Input() UlClassName!: string
  @Input() showResponsive!: boolean

  categoryMenu = CATEGORY_MENU_ITEMS
}
