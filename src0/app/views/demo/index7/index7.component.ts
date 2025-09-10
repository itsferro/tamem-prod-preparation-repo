import { Component } from '@angular/core'
import { TopbarComponent } from './components/topbar/topbar.component'
import { BannerComponent } from './components/banner/banner.component'
import { AboutComponent } from './components/about/about.component'
import { CourseListComponent } from './components/course-list/course-list.component'
import { DownloadComponent } from './components/download/download.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { ClientFeedbackComponent } from './components/client-feedback/client-feedback.component'
import { Footer2Component } from '@/app/components/footers/footer2/footer2.component'

@Component({
  selector: 'app-index7',
  standalone: true,
  imports: [
    TopbarComponent,
    BannerComponent,
    AboutComponent,
    CourseListComponent,
    DownloadComponent,
    ActionBoxComponent,
    ClientFeedbackComponent,
    Footer2Component,
  ],
  templateUrl: './index7.component.html',
  styles: ``,
})
export class Index7Component {}
