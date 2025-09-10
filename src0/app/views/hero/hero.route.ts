import { Route } from '@angular/router'
import { HeroFormComponent } from './hero-form/hero-form.component'
import { HeroVectorComponent } from './hero-vector/hero-vector.component'

export const HERO_ROUTES: Route[] = [
  { path: 'form', component: HeroFormComponent, data: { title: 'Hero Form' } },
  {
    path: 'vector',
    component: HeroVectorComponent,
    data: { title: 'Hero Vector' },
  },
]
