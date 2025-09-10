import { LogoBoxComponent } from '@/app/components/logo-box/logo-box.component'
import { Component } from '@angular/core'
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'hero-vector-topbar',
  standalone: true,
  imports: [LogoBoxComponent, NgbDropdownModule, NgbCollapseModule],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent {
  isCollapsed = true

  scrollY = 0

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
