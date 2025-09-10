import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { BlogCardComponent } from './components/blog-card/blog-card.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-blog-masonry',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    BlogCardComponent,
    FooterComponent,
  ],
  templateUrl: './blog-masonry.component.html',
  styles: ``,
})
export class BlogMasonryComponent {}
