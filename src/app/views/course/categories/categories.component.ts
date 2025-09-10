import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { CourseCategoriesComponent } from './components/categories/categories.component'
import { LanguageComponent } from './components/language/language.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { ListComponent } from '../categories/components/list/list.component'

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    CourseCategoriesComponent,
    LanguageComponent,
    ActionBoxComponent,
    FooterComponent,
    ListComponent
  ],
  templateUrl: './categories.component.html',
  styles: ``,
})
export class CategoriesComponent {}
