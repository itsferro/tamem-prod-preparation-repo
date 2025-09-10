import { Route } from '@angular/router'
import { CategoriesComponent } from './categories/categories.component'
import { GridComponent } from './grid/grid.component'
import { Grid2Component } from './grid2/grid2.component'
import { ListComponent } from './list/list.component'
import { List2Component } from './list2/list2.component'
import { DetailComponent } from './detail/detail.component'
import { DetailMinimalComponent } from './detail-minimal/detail-minimal.component'
import { DetailAdvanceComponent } from './detail-advance/detail-advance.component'
import { DetailModuleComponent } from './detail-module/detail-module.component'
import { VideoPlayerComponent } from './video-player/video-player.component'
import { CatalogComponent } from './catalog/catalog.component'
import { StoryBoardComponent } from './story-board/story-board.component'
import { DevActionsTrackComponent } from './dev-actions-track/dev-actions-track.component'
import { QuranBoardComponent } from './quran-board/quran-board.component'
import { DevelopmentComponent } from './development/development.component'
import { BlockManagmentKeyInsightsComponent } from './development/block-managment/key-insights/key-insights.component'

export const COURSE_ROUTES: Route[] = [
  {
    path: 'categories',
    component: CategoriesComponent,
    data: { title: 'Course Categories' },
  },
 

  {
    path: 'block/:blockId/insights',
    component: BlockManagmentKeyInsightsComponent,
    data: { title: 'Block Insights' },
  },
  

  {
    path: 'catalog',
    component: CatalogComponent,
    data: { title: 'Catalog' },
  },

  {
    path: 'development',
    component: DevelopmentComponent,
    data: { title: 'Platform Development' },
  },
  // {
  //   path: 'story-board',
  //   component: StoryBoardComponent,
  //   data: { title: 'Story Board' },
  // },

  { path: 'story-board/:lessonBlockId', component: StoryBoardComponent },
  { path: 'story-board', component: StoryBoardComponent }, // Keep this for when no ID is provided


  { path: 'block-actions/:lessonBlockId', component: DevActionsTrackComponent },
  { path: 'block-actions', component: DevActionsTrackComponent }, // Keep this for when no ID is provided


  { path: 'quran-board', component: QuranBoardComponent }, // Keep this for when no ID is provided



  {
    path: 'grid',
    component: GridComponent,
    data: { title: 'Grid Classic' },
  },
  {
    path: 'grid-2',
    component: Grid2Component,
    data: { title: 'Grid Minimal' },
  },
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'List Classic' },
  },
  {
    path: 'list-2',
    component: List2Component,
    data: { title: 'List Minimal' },
  },
  {
    path: 'detail',
    component: DetailComponent,
    data: { title: 'Course Detail' },
  },
  { path: 'detail/:courseId', component: DetailComponent },

  {
    path: 'detail-min',
    component: DetailMinimalComponent,
    data: { title: 'Detail Minimal' },
  },
  {
    path: 'detail-adv',
    component: DetailAdvanceComponent,
    data: { title: 'Detail Advance' },
  },
  {
    path: 'detail-module',
    component: DetailModuleComponent,
    data: { title: 'Detail Module' },
  },
  {
    path: 'video-player',
    component: VideoPlayerComponent,
    data: { title: 'Video Player' },
  },
]
