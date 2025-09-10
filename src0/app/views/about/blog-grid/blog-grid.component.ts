import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { GridComponent } from './components/grid/grid.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-blog-grid',
  standalone: true,
  imports: [AppMenuComponent, BannerComponent, GridComponent, FooterComponent],
  templateUrl: './blog-grid.component.html',
  styles: ``,
})
export class BlogGridComponent {}
