import { Route } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { StudentListComponent } from './student-list/student-list.component'
import { ReviewComponent } from './review/review.component'
import { EarningComponent } from './earning/earning.component'
import { SettingComponent } from './setting/setting.component'
import { EditCourseDetailComponent } from './courses/edit-course-detail/edit-course-detail.component'
import { Error404Component } from './error404/error404.component'

export const ADMIN_ROUTES: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Admin Dashboard' },
  },
  {
    path: 'student-list',
    component: StudentListComponent,
    data: { title: 'Admin Student List' },
  },
  {
    path: 'review',
    component: ReviewComponent,
    data: { title: 'Admin Review' },
  },
  {
    path: 'earning',
    component: EarningComponent,
    data: { title: 'Admin Earning' },
  },
  {
    path: 'setting',
    component: SettingComponent,
    data: { title: 'Admin Setting' },
  },
  {
    path: 'edit-course-detail',
    component: EditCourseDetailComponent,
    data: { title: 'Admin Edit Course Detail' },
  },
  {
    path: 'error-404',
    component: Error404Component,
    data: { title: 'Admin 404 Error' },
  },
  {
    path: 'course',
    loadChildren: () =>
      import('./courses/course.route').then((mod) => mod.COURSES_ROUTES),
  },
  {
    path: 'instructor',
    loadChildren: () =>
      import('./instructor/instructor.route').then(
        (mod) => mod.INSTRUCTOR_ROUTES
      ),
  },
]
