import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { ListItemComponent } from './components/list-item/list-item.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-instructor-list',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    ListItemComponent,
    ActionBoxComponent,
    FooterComponent,
  ],
  templateUrl: './instructor-list.component.html',
  styles: ``,
})
export class InstructorListComponent {}
