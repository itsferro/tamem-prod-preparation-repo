import { basePath } from '@/app/common/constants'
import {
  INSTRUCTOR_MENU_ITEMS,
  STUDENT_MENU_ITEMS,
  type MenuItemType,
} from '@/app/common/menu-items'
import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { CommonModule } from '@angular/common'
import { Component, inject, type OnInit } from '@angular/core'
import {
  NavigationEnd,
  Router,
  RouterModule,
  type Event,
} from '@angular/router'
import { InstructorProfileComponent } from './component/instructor-profile/instructor-profile.component'
import { StudentProfileComponent } from './component/student-profile/student-profile.component'
import {
  NgbActiveOffcanvas,
  NgbCollapseModule,
  NgbOffcanvas,
} from '@ng-bootstrap/ng-bootstrap'
import { SidebarComponent } from './component/sidebar/sidebar.component'
import { AboutComponent } from '../../views/about/about/about.component'
import { Footer3Component } from '@/app/components/footers/footer3/footer3.component'

@Component({
  selector: 'app-account-layout',
  standalone: true,
  imports: [
    AppMenuComponent,
    RouterModule,
    InstructorProfileComponent,
    StudentProfileComponent,
    CommonModule,
    NgbCollapseModule,
    SidebarComponent,
    AboutComponent,
    Footer3Component,
  ],
  templateUrl: './account-layout.component.html',
  styles: ``,
  providers: [NgbActiveOffcanvas],
})
export class AccountLayoutComponent implements OnInit {
  menuItems!: MenuItemType[]
  currentRoute: string = ''
  layout: string = ''

  studentLayout: boolean = false
  instructorLayout: boolean = false

  public router = inject(Router)
  public offcanvasService = inject(NgbOffcanvas)

  trimmedURL = this.router.url?.replaceAll(
    basePath !== '' ? basePath + '/' : '',
    '/'
  )

  ngOnInit(): void {
    this.currentRoute = this.trimmedURL

    if (this.currentRoute.startsWith('/student')) {
      this.studentLayout = true
      this.layout = 'student'
    }
    if (this.currentRoute.startsWith('/instructor')) {
      this.instructorLayout = true
      this.layout = 'instructor'
    }

    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationEnd) {
        this.currentRoute = routerEvent.url
      }
    })
  }

  openMenu() {
    const offcanvasRef = this.offcanvasService.open(SidebarComponent, {
      position: 'end',
    })
    offcanvasRef.componentInstance.layout = this.layout
    offcanvasRef.componentInstance.currentRoute = this.currentRoute
  }
}
