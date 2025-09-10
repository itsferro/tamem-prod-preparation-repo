import { Component } from '@angular/core'
import { MEGA_MENU_ITEMS } from '../../../../common/menu-items'
import { MegaMenuItemComponent } from './components/mega-menu.components'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-mega-menu',
  standalone: true,
  imports: [MegaMenuItemComponent, NgbDropdownModule],
  templateUrl: './mega-menu.component.html',
  styles: ``,
})
export class MegaMenuComponent {
  megaMenu = MEGA_MENU_ITEMS
}
