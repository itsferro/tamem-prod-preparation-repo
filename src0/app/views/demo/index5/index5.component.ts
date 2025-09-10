import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { AboutComponent } from './components/about/about.component'
import { ListedCollegeComponent } from './components/listed-college/listed-college.component'
import { CounterComponent } from './components/counter/counter.component'
import { LatestNewsComponent } from './components/latest-news/latest-news.component'
import { EventComponent } from './components/event/event.component'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-index5',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    AboutComponent,
    ListedCollegeComponent,
    CounterComponent,
    LatestNewsComponent,
    EventComponent,
    NgbAlertModule,
    FooterComponent,
  ],
  templateUrl: './index5.component.html',
  styles: ``,
})
export class Index5Component {
  showAlert = true
}
