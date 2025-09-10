import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { TopbarComponent } from './components/topbar/topbar.component'
import { CounterComponent } from './components/counter/counter.component'
import { AboutComponent } from './components/about/about.component'
import { CoursesComponent } from './components/courses/courses.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { ContactComponent } from './components/contact/contact.component'
import { ClientSliderComponent } from '@/app/components/client-slider/client-slider.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-index10',
  standalone: true,
  imports: [
    BannerComponent,
    CounterComponent,
    TopbarComponent,
    AboutComponent,
    CoursesComponent,
    ActionBoxComponent,
    ContactComponent,
    ClientSliderComponent,
    FooterComponent,
  ],
  templateUrl: './index10.component.html',
  styles: ``,
})
export class Index10Component {}
