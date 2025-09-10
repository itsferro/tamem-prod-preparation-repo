import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { WorkComponent } from './components/work/work.component'
import { CounterComponent } from './components/counter/counter.component'
import { TabsComponent } from './components/tabs/tabs.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-become-instructor',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    WorkComponent,
    CounterComponent,
    TabsComponent,
    ActionBoxComponent,
    FooterComponent,
  ],
  templateUrl: './become-instructor.component.html',
  styles: ``,
})
export class BecomeInstructorComponent {}
