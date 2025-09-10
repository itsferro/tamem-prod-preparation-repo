import { Route } from '@angular/router'
import { ListComponent } from './list/list.component'
import { CategoryComponent } from './category/category.component'
import { DetailComponent } from './detail/detail.component'

export const COURSES_ROUTES: Route[] = [
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'Admin Course List' },
  },
  {
    path: 'category',
    component: CategoryComponent,
    data: { title: 'Admin Course Category' },
  },
  {
    path: 'detail',
    component: DetailComponent,
    data: { title: 'Admin Course Detail' },
  },
]
