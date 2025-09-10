import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CourseDetailComponent } from './course-detail.component';
import { BlockActionTrackingComponent } from './components/block-action-tracking/block-action-tracking.component';
import { CourseDetailComponent } from '../../instructor/create-course/components/course-detail/course-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CourseDetailComponent
  },
  {
    path: 'block/:id/actions',
    component: BlockActionTrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseDetailRoutingModule { } 