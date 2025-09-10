import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'
import { CourseContentComponent } from './components/course-content/course-content.component'
import { PlyrDirective } from '@/app/core/directive/videoPlayr.directive'

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [NgbCollapseModule, CourseContentComponent, PlyrDirective],
  templateUrl: './video-player.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class VideoPlayerComponent {
  isCollapsed = true
}
