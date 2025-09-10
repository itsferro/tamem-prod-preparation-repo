import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { CourseDescriptionComponent } from './components/course-description/course-description.component'
import { CourseCurriculumComponent } from './components/course-curriculum/course-curriculum.component'
import { CourseFAQComponent } from './components/course-faq/course-faq.component'
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { PlyrDirective } from '@/app/core/directive/videoPlayr.directive'

@Component({
  selector: 'app-detail-advance',
  standalone: true,
  imports: [
    AppMenuComponent,
    CourseDescriptionComponent,
    CourseCurriculumComponent,
    CourseFAQComponent,
    RightSidebarComponent,
    FooterComponent,
    PlyrDirective,
  ],
  templateUrl: './detail-advance.component.html',
  styles: ``,
})
export class DetailAdvanceComponent {}
