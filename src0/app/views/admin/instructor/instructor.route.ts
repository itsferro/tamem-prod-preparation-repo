import { Route } from '@angular/router'
import { ListComponent } from './list/list.component'
import { DetailComponent } from './detail/detail.component'
import { RequestComponent } from './request/request.component'

export const INSTRUCTOR_ROUTES: Route[] = [
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'Admin Instructor List' },
  },
  {
    path: 'request',
    component: RequestComponent,
    data: { title: 'Admin Instructor Request' },
  },
  {
    path: 'detail',
    component: DetailComponent,
    data: { title: 'Admin Instructor Detail' },
  },
]
