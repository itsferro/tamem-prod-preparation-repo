import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Footer3Component } from '@/app/components/footers/footer3/footer3.component'
import { StepperDirective } from '@/app/core/directive/stepper.directive'
import { Component } from '@angular/core'
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component'
import { CourseDetailComponent } from './components/course-detail/course-detail.component'
import { CourseMediaComponent } from './components/course-media/course-media.component'
import { CurriculumComponent } from './components/curriculum/curriculum.component'

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    AppMenuComponent,
    AdditionalInfoComponent,
    CourseDetailComponent,
    CourseMediaComponent,
    CurriculumComponent,
    Footer3Component,
    StepperDirective,
  ],
  templateUrl: './create-course.component.html',
  styles: ``,
})
export class CreateCourseComponent {}
