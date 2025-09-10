import { Component } from '@angular/core'
import { SidebarComponent } from './component/sidebar/sidebar.component'
import { TopbarComponent } from './component/topbar/topbar.component'
import { RouterModule } from '@angular/router'
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, RouterModule],
  templateUrl: './admin-layout.component.html',
  providers: [NgbActiveOffcanvas],
})
export class AdminLayoutComponent {}
