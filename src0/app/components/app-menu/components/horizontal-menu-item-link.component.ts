import { Component, Input } from '@angular/core'
import { RouterModule } from '@angular/router'
import type { MenuItemType } from '../../../common/menu-items'

@Component({
  selector: 'horizontal-menu-item-link',
  standalone: true,
  imports: [RouterModule],
  styles: `
    :host(horizontal-menu-item-link) {
      display: contents;
    }
  `,
  template: `
    <a [class]="linkClassName" [routerLink]="item.link ?? ''">
      @if (item.icon) {
        <i class="{{ item.icon }} fa-fw me-1"></i>
      }
      {{ item.title }}
    </a>
  `,
})
export class MenuItemLinkComponent {
  @Input() item!: MenuItemType
  @Input() linkClassName!: string
}
