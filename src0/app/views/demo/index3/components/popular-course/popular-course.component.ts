import { currency } from '@/app/common/constants'
import { Component, ViewChild, type ElementRef } from '@angular/core'
import { NgbNavModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { LightgalleryModule } from 'lightgallery/angular'
import lgVideo from 'lightgallery/plugins/video'
import { PopularCourse } from '../../data'
import { CommonModule, DecimalPipe } from '@angular/common'

@Component({
  selector: 'index3-popular-course',
  standalone: true,
  imports: [
    NgbNavModule,
    LightgalleryModule,
    NgbRatingModule,
    DecimalPipe,
    CommonModule,
  ],
  templateUrl: './popular-course.component.html',
  styleUrl: './popular-course.component.scss',
})
export class PopularCourseComponent {
  courseList = PopularCourse

  currency = currency
  settings = {
    counter: false,
    plugins: [lgVideo],
    selector: 'a',
    download: false,
    controls: false,
  }
}
