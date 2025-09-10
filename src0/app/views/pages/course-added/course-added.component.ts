import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-course-added',
  standalone: true,
  imports: [AppMenuComponent, FooterComponent, RouterLink],
  templateUrl: './course-added.component.html',
  styles: ``,
})
export class CourseAddedComponent {}
