import { Component } from '@angular/core'
import { BlogList } from '../../data'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'detail-related-blog',
  standalone: true,
  imports: [TinySliderComponent],
  templateUrl: './related-blog.component.html',
  styles: ``,
})
export class RelatedBlogComponent {
  relatedBlog = BlogList

  sliderConfig: TinySliderSettings = {
    arrowKeys: true,
    controls: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    edgePadding: 2,
    gutter: 30,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  }
}
