import { Component } from '@angular/core'
import { LightgalleryModule } from 'lightgallery/angular'
import lgVideo from 'lightgallery/plugins/video'

@Component({
  selector: 'edit-course-media',
  standalone: true,
  imports: [LightgalleryModule],
  templateUrl: './course-media.component.html',
  styleUrl: './course-media.component.scss',
})
export class CourseMediaComponent {
  settings = {
    counter: false,
    plugins: [lgVideo],
    selector: 'a',
    download: false,
  }
}
