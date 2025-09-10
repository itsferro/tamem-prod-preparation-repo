import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component } from '@angular/core'
import { BannerComponent } from './components/banner/banner.component'
import { OrganizationComponent } from './components/organization/organization.component'
import { SpeakersComponent } from './components/speakers/speakers.component'
import { EventScheduleComponent } from './components/event-schedule/event-schedule.component'
import { CounterComponent } from './components/counter/counter.component'
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    OrganizationComponent,
    SpeakersComponent,
    EventScheduleComponent,
    CounterComponent,
    LeftSidebarComponent,
    FooterComponent,
  ],
  templateUrl: './event-detail.component.html',
  styles: ``,
})
export class EventDetailComponent {}
