import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { AboutComponent } from './components/about/about.component'
import { CurriculamComponent } from './components/curriculam/curriculam.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { TopbarComponent } from './components/topbar/topbar.component'
import { Footer2Component } from '@/app/components/footers/footer2/footer2.component'

@Component({
  selector: 'app-workshop-detail',
  standalone: true,
  imports: [
    TopbarComponent,
    BannerComponent,
    AboutComponent,
    CurriculamComponent,
    ActionBoxComponent,
    TestimonialsComponent,
    Footer2Component,
  ],
  templateUrl: './workshop-detail.component.html',
  styles: ``,
})
export class WorkshopDetailComponent {}
