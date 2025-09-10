import { Route } from '@angular/router'
import { HelpCenterComponent } from './help-center/help-center.component'
import { HelpCenterDetailComponent } from './help-center-detail/help-center-detail.component'

export const HELP_ROUTES: Route[] = [
  {
    path: 'center',
    component: HelpCenterComponent,
    data: { title: 'Help Center' },
  },
  {
    path: 'center-detail',
    component: HelpCenterDetailComponent,
    data: { title: 'Help Center Detail' },
  },
]
