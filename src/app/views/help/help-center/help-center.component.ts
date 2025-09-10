import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { RecommendedTopicsComponent } from './components/recommended-topics/recommended-topics.component'
import { ArticlesComponent } from './components/articles/articles.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-help-center',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    RecommendedTopicsComponent,
    ArticlesComponent,
    ActionBoxComponent,
    FooterComponent,
  ],
  templateUrl: './help-center.component.html',
  styles: ``,
})
export class HelpCenterComponent {}
