import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { StepsComponent } from './components/steps/steps.component'
import { CourseComponent } from './components/course/course.component'
import { PortfolioComponent } from './components/portfolio/portfolio.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'app-index6',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    StepsComponent,
    CourseComponent,
    PortfolioComponent,
    FooterComponent,
  ],
  templateUrl: './index6.component.html',
  styles: ``,
})
export class Index6Component {}
