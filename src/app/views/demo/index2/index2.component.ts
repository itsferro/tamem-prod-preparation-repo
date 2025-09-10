import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { TopHeaderComponent } from './components/top-header/top-header.component'
import { BannerComponent } from './components/banner/banner.component'
import { AboutComponent } from './components/about/about.component'
import { TrendingCourseComponent } from './components/trending-course/trending-course.component'
import { VideoComponent } from './components/video/video.component'
import { EventComponent } from './components/event/event.component'
import { NewsletterComponent } from './components/newsletter/newsletter.component'
import { ClientSliderComponent } from '@/app/components/client-slider/client-slider.component'
import { FooterComponent } from './components/footer/footer.component'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-index2',
  standalone: true,
  imports: [
    AppMenuComponent,
    TopHeaderComponent,
    BannerComponent,
    AboutComponent,
    TrendingCourseComponent,
    VideoComponent,
    EventComponent,
    NewsletterComponent,
    ClientSliderComponent,
    FooterComponent,
    NgbAlertModule,
  ],
  templateUrl: './index2.component.html',
  styles: ``,
})
export class Index2Component {
  showAlert = true
}
