import { Component, Input } from '@angular/core'
import { RouterModule } from '@angular/router'
import type { MenuItemType } from '../../../../../common/menu-items'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'mega-menu-item',
  standalone: true,
  imports: [RouterModule, CommonModule],
  styles: `
    :host(horizontal-menu-item-link) {
      display: contents;
    }
  `,
  template: `
    <h6 class="mb-0">{{ item.title }}</h6>
    <hr />

    <ul class="list-unstyled">
      @for (data of item.subItems; track $index) {
        @if (data.description) {
          <div class="d-flex mb-4 position-relative">
            @if (data.icon) {
              <h2 class="mb-0"><i [class]="data.icon"></i></h2>
            }
            @if (data.logo) {
              <img [src]="data.logo" class="icon-md" alt="" />
            }
            <div class="ms-2">
              <a class="stretched-link h6 mb-0" [routerLink]="data.link">{{
                data.title
              }}</a>
              <p class="mb-0 small">{{ data.description }}</p>
            </div>
          </div>
        } @else {
          <li>
            <a class="dropdown-item" [routerLink]="data.link">{{
              data.title
            }}</a>
          </li>
        }
      }
    </ul>
  `,
})
export class MegaMenuItemComponent {
  @Input() item!: MenuItemType
  @Input() linkClassName!: string
}
