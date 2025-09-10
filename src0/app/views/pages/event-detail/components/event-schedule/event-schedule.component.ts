import { Component } from '@angular/core'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { ScheduleList } from '../../data'

@Component({
  selector: 'event-schedule',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './event-schedule.component.html',
  styles: ``,
})
export class EventScheduleComponent {
  eventList = ScheduleList
}
