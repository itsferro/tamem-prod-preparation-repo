import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { NgbActiveOffcanvas, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { CommentComponent } from '../detail/components/comment/comment.component'
import { FaqsComponent } from './components/faqs/faqs.component'
import { ReviewComponent } from './components/review/review.component'
import { OverviewComponent } from './components/overview/overview.component'
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component'
import { BannerComponent } from './components/banner/banner.component'
import { InstructorDetailComponent } from './components/instructor-detail/instructor-detail.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-detail-minimal',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    InstructorDetailComponent,
    NgbNavModule,
    OverviewComponent,
    ReviewComponent,
    CommentComponent,
    FaqsComponent,
    RightSidebarComponent,
    FooterComponent,
  ],
  templateUrl: './detail-minimal.component.html',
  styles: ``,
  providers: [NgbActiveOffcanvas],
})
export class DetailMinimalComponent {}
