import { Route } from '@angular/router'
import { Index1Component } from './index1/index1.component'
import { Index2Component } from './index2/index2.component'
import { Index3Component } from './index3/index3.component'
import { Index4Component } from './index4/index4.component'
import { Index5Component } from './index5/index5.component'
import { Index6Component } from './index6/index6.component'
import { Index7Component } from './index7/index7.component'
import { Index8Component } from './index8/index8.component'
import { Index9Component } from './index9/index9.component'
import { Index10Component } from './index10/index10.component'
import { Index11Component } from './index11/index11.component'

export const DEMO_ROUTES: Route[] = [
  {
    path: 'index-1',
    component: Index1Component,
    data: { title: 'Home - Default' },
  },
  {
    path: 'index-2',
    component: Index2Component,
    data: { title: 'Home - Education' },
  },
  {
    path: 'index-3',
    component: Index3Component,
    data: { title: 'Home - Academy' },
  },
  {
    path: 'index-4',
    component: Index4Component,
    data: { title: 'Home - Course' },
  },
  {
    path: 'index-5',
    component: Index5Component,
    data: { title: 'Home - University' },
  },
  {
    path: 'index-6',
    component: Index6Component,
    data: { title: 'Home - Kindergarten' },
  },
  {
    path: 'index-7',
    component: Index7Component,
    data: { title: 'Home - Landing' },
  },
  {
    path: 'index-8',
    component: Index8Component,
    data: { title: 'Home - Tutor' },
  },
  {
    path: 'index-9',
    component: Index9Component,
    data: { title: 'Home - School' },
  },
  {
    path: 'index-10',
    component: Index10Component,
    data: { title: 'Home - Abroad' },
  },
  {
    path: 'index-11',
    component: Index11Component,
    data: { title: 'Home - Workshop' },
  },
]
