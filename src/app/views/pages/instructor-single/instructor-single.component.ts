import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { InfoComponent } from './components/info/info.component'
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component'
import { CounterComponent } from './components/counter/counter.component'
import { CoursesListComponent } from './components/courses-list/courses-list.component'
import { RelatedInstructorComponent } from './components/related-instructor/related-instructor.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-instructor-single',
  standalone: true,
  imports: [
    AppMenuComponent,
    LeftSidebarComponent,
    InfoComponent,
    CounterComponent,
    CoursesListComponent,
    RelatedInstructorComponent,
    FooterComponent,
  ],
  templateUrl: './instructor-single.component.html',
  styles: ``,
})
export class InstructorSingleComponent {}
