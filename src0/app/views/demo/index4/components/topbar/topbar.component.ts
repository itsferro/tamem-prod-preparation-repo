import { CategoryMenuComponent } from '@/app/components/app-menu/components/category-menu/category-menu.component'
import { LogoBoxComponent } from '@/app/components/logo-box/logo-box.component'
import { Component } from '@angular/core'
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'index4-topbar',
  standalone: true,
  imports: [
    LogoBoxComponent,
    CategoryMenuComponent,
    NgbDropdownModule,
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
