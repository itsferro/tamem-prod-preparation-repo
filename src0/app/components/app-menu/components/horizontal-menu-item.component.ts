import { Component, Input } from '@angular/core'
import { MenuItemLinkComponent } from './horizontal-menu-item-link.component'
import type { MenuItemType } from '../../../common/menu-items'

@Component({
  selector: 'horizontal-menu-item',
  standalone: true,
  imports: [MenuItemLinkComponent],
  styles: `
    :host(horizontal-menu-item) {
      display: contents;
    }
  `,
  template: `
    <!-- #ref_menu condition sub  -->
  @if(item.role === 'admin') {
    <li>
      <horizontal-menu-item-link
        [item]="item"
        [linkClassName]="linkClassName ?? ''"
      ></horizontal-menu-item-link>
      @if (item.divider) {
        <hr class="dropdown-divider" />
      }
    </li>
  }
  `,
})
export class MenuItemComponent {
  @Input() item!: MenuItemType
  @Input() linkClassName?: string
  @Input() level!: number
}
