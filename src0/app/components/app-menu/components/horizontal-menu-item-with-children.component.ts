import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { MenuItemComponent } from './horizontal-menu-item.component'
import type { MenuItemType } from '../../../common/menu-items'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'horizontal-menu-item-with-children',
  standalone: true,
  imports: [CommonModule, MenuItemComponent, NgbDropdownModule],
  styles: `
    :host(horizontal-menu-item-with-children) {
      display: contents;
    }
  `,
  template: `
  <!-- #ref_menu condition  -->
 @if(item.role === 'admin') {
    <li ngbDropdown [autoClose]="'outside'" [class]="itemClassName">
      <a
        [class]="linkClassName"
        ngbDropdownToggle
        id="demoMenu"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        @if (showIcon) {
          <i class="{{ item.icon }} me-2"></i>
        }
        {{ item.title }}
      </a>
      <ul
        ngbDropdownMenu
        class="dropdown-menu {{ ulClassName }}"
        data-bs-popper="none"
      >
        @for (subitem of item.subItems; track $index) {
          @if (subitem.subItems) {
            <horizontal-menu-item-with-children
              [item]="subitem"
              [activeMenuItems]="activeMenuItems"
              [itemClassName]="'dropdown-submenu dropend'"
              [ulClassName]="'dropdown-menu-start'"
              [linkClassName]="
                'dropdown-item dropdown-toggle' + getActiveClass(subitem)
              "
            />
          } @else {
            <horizontal-menu-item
              [item]="subitem"
              [level]="level + 1"
              [linkClassName]="'dropdown-item' + getActiveClass(subitem)"
            />
          }
        }
      </ul>
    </li>
  }
  `,
})
export class MenuItemWithChildrenComponent {
  @Input() item!: MenuItemType
  @Input() activeMenuItems?: string[]
  @Input() itemClassName?: string
  @Input() linkClassName?: string
  @Input() ulClassName?: string
  @Input() level!: number
  @Input() showIcon!: boolean

  getActiveClass(item: MenuItemType) {
    return this.activeMenuItems && this.activeMenuItems.includes(item.key)
      ? ' active'
      : ''
  }
}
