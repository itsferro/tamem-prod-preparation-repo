import { Component } from '@angular/core'
import { TopbarComponent } from './components/topbar/topbar.component'
import { BannerComponent } from './components/banner/banner.component'
import { CourseComponent } from './components/course/course.component'
import { UserLoginComponent } from './components/user-login/user-login.component'
import { TrendingCourseComponent } from './components/trending-course/trending-course.component'
import { PopularCourseComponent } from './components/popular-course/popular-course.component'
import { InstructorComponent } from './components/instructor/instructor.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { ClientSliderComponent } from '@/app/components/client-slider/client-slider.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-index3',
  standalone: true,
  imports: [
    TopbarComponent,
    BannerComponent,
    CourseComponent,
    UserLoginComponent,
    TrendingCourseComponent,
    PopularCourseComponent,
    InstructorComponent,
    ActionBoxComponent,
    ClientSliderComponent,
    FooterComponent,
  ],
  templateUrl: './index3.component.html',
  styles: ``,
})
export class Index3Component {}
