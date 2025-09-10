import { Component } from '@angular/core'
import { Courses } from '../../data'
import {
  NgbAccordionModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import lgVideo from 'lightgallery/plugins/video'
import { LightgalleryModule } from 'lightgallery/angular'

@Component({
  selector: 'module-course-material',
  standalone: true,
  imports: [
    NgbAccordionModule,
    CommonModule,
    LightgalleryModule,
    NgbTooltipModule,
  ],
  templateUrl: './course-material.component.html',
  styleUrl: './course-material.components.scss',
})
export class CourseMaterialComponent {
  courseList = Courses

  settings = {
    counter: false,
    plugins: [lgVideo],
    selector: 'a',
    download: false,
  }
}
