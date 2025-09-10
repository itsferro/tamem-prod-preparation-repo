import { Component } from '@angular/core'
import { portfolioList } from '../../data'
import { LightgalleryModule } from 'lightgallery/angular'
import { NgxMasonryModule } from 'ngx-masonry'

@Component({
  selector: 'index6-portfolio',
  standalone: true,
  imports: [LightgalleryModule, NgxMasonryModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  portfolioList = portfolioList

  settings = {
    counter: false,
    selector: 'a',
    download: false,
  }
}
