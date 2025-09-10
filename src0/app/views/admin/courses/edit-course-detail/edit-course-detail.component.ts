import { Component, ViewChild, type ElementRef } from '@angular/core'
import { CourseDetailComponent } from './components/course-detail/course-detail.component'
import { CourseMediaComponent } from './components/course-media/course-media.component'
import { CurriculumComponent } from './components/curriculum/curriculum.component'
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component'
import Stepper from 'bs-stepper'
import { StepperDirective } from '@/app/core/directive/stepper.directive'

@Component({
  selector: 'app-edit-course-detail',
  standalone: true,
  imports: [
    CourseDetailComponent,
    CourseMediaComponent,
    CurriculumComponent,
    AdditionalInfoComponent,
    StepperDirective,
  ],
  templateUrl: './edit-course-detail.component.html',
  styles: ``,
})
export class EditCourseDetailComponent {}
