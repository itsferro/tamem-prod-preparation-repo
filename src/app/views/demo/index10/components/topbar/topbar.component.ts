import { CartMenuComponent } from '@/app/components/cart-menu/cart-menu.component'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'index10-topbar',
  standalone: true,
  imports: [
    NgbDropdownModule,
    RouterLink,
    CartMenuComponent,
    NgbCollapseModule,
  ],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent {
  scrollY = 0

  isCollapsed = true
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
