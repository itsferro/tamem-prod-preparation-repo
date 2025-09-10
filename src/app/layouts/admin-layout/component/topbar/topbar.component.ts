import { NotificationComponent } from '@/app/components/notification/notification.component'
import { ProfileMenuComponent } from '@/app/components/profile-menu/profile-menu.component'
import { Component, inject } from '@angular/core'
import { NgbCollapseModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { SidebarComponent } from '../sidebar/sidebar.component'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    NotificationComponent,
    ProfileMenuComponent,
    RouterLink,
    NgbCollapseModule,
  ],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  public offcanvasService = inject(NgbOffcanvas)
  isCollapsed = true
  openSidebar() {
    const divContainer = document.getElementById('sidenavbar')!
    this.offcanvasService.open(SidebarComponent, {
      panelClass: 'offcanvas-start flex-row custom-scrollbar h-100',
      container: divContainer,
    })
  }
}
