import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './component/banner/banner.component'
import { CounterComponent } from './component/counter/counter.component'
import { PopularCourseComponent } from './component/popular-course/popular-course.component'
import { ActionBoxComponent } from './component/action-box/action-box.component'
import { TrendingComponent } from './component/trending/trending.component'
import { ReviewsComponent } from './component/reviews/reviews.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-index1',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    CounterComponent,
    PopularCourseComponent,
    ActionBoxComponent,
    TrendingComponent,
    ReviewsComponent,
    FooterComponent,
  ],
  templateUrl: './index1.component.html',
  styles: ``,
})
export class Index1Component {}
