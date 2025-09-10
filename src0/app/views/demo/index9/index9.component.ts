import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { SubjectComponent } from './components/subject/subject.component'
import { AboutComponent } from './components/about/about.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { GalleryComponent } from './components/gallery/gallery.component'
import { BlogComponent } from './components/blog/blog.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-index9',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    SubjectComponent,
    AboutComponent,
    ActionBoxComponent,
    GalleryComponent,
    BlogComponent,
    FooterComponent,
    NgbAlertModule,
  ],
  templateUrl: './index9.component.html',
  styles: ``,
})
export class Index9Component {
  showAlert = true
}
