import { Component } from '@angular/core'
import { TopbarComponent } from './components/topbar/topbar.component'
import { BannerComponent } from './components/banner/banner.component'
import { FeatureComponent } from './components/feature/feature.component'
import { InstructorGridComponent } from './components/instructor-grid/instructor-grid.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { TopListedComponent } from './components/top-listed/top-listed.component'
import { FaqComponent } from './components/faq/faq.component'
import { Footer2Component } from '@/app/components/footers/footer2/footer2.component'

@Component({
  selector: 'app-index11',
  standalone: true,
  imports: [
    TopbarComponent,
    BannerComponent,
    FeatureComponent,
    InstructorGridComponent,
    ActionBoxComponent,
    TopListedComponent,
    FaqComponent,
    Footer2Component,
  ],
  templateUrl: './index11.component.html',
  styles: ``,
})
export class Index11Component {}
