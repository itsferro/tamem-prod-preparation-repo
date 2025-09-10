import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { InfoComponent } from './components/info/info.component'
import { VideoComponent } from './components/video/video.component'
import { QuoteComponent } from './components/quote/quote.component'
import { ImageComponent } from './components/image/image.component'
import { RelatedBlogComponent } from './components/related-blog/related-blog.component'
import { ContentComponent } from './components/content/content.component'
import { TagsComponent } from './components/tags/tags.component'
import { CommentComponent } from './components/comment/comment.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    AppMenuComponent,
    InfoComponent,
    VideoComponent,
    QuoteComponent,
    ImageComponent,
    ContentComponent,
    TagsComponent,
    CommentComponent,
    RelatedBlogComponent,
    FooterComponent,
  ],
  templateUrl: './blog-detail.component.html',
  styles: ``,
})
export class BlogDetailComponent {}
