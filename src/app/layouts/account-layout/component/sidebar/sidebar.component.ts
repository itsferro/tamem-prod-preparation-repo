import {
  INSTRUCTOR_MENU_ITEMS,
  STUDENT_MENU_ITEMS,
  type MenuItemType,
} from '@/app/common/menu-items'
import { CommonModule } from '@angular/common'
import { Component, inject, Input } from '@angular/core'
import { RouterModule } from '@angular/router'
import {
  NgbActiveOffcanvas,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgbCollapseModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  menuItems!: MenuItemType[]
  @Input() currentRoute!: string
  @Input() layout!: string

  isCollapsed = true

  activeOffcanvas = inject(NgbActiveOffcanvas)

  ngOnInit(): void {
    if (this.layout == 'student') {
      this.menuItems = STUDENT_MENU_ITEMS
    }
    if (this.layout == 'instructor') {
      this.menuItems = INSTRUCTOR_MENU_ITEMS
    }
  }
}
