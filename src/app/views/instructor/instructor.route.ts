import { Route } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DeleteAccountComponent } from './delete-account/delete-account.component'
import { EarningComponent } from './earning/earning.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { ManageCourseComponent } from './manage-course/manage-course.component'
import { OrderComponent } from './order/order.component'
import { PayoutComponent } from './payout/payout.component'
import { QuizComponent } from './quiz/quiz.component'
import { ReviewComponent } from './review/review.component'
import { SettingComponent } from './setting/setting.component'
import { StudentlistComponent } from './studentlist/studentlist.component'

export const INSTRUCTOR_ROUTES: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Instructor Dashboard' },
  },
  {
    path: 'manage-course',
    component: ManageCourseComponent,
    data: { title: 'Manage Course' },
  },
  {
    path: 'quiz',
    component: QuizComponent,
    data: { title: 'Instructor Quiz' },
  },
  {
    path: 'earning',
    component: EarningComponent,
    data: { title: 'Earning' },
  },
  {
    path: 'studentlist',
    component: StudentlistComponent,
    data: { title: 'Student List' },
  },
  {
    path: 'order',
    component: OrderComponent,
    data: { title: 'Order' },
  },
  {
    path: 'review',
    component: ReviewComponent,
    data: { title: 'Review' },
  },
  {
    path: 'payout',
    component: PayoutComponent,
    data: { title: 'Payout' },
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    data: { title: 'Edit Profile' },
  },
  {
    path: 'setting',
    component: SettingComponent,
    data: { title: 'Setting' },
  },
  {
    path: 'delete-account',
    component: DeleteAccountComponent,
    data: { title: 'Delete Account' },
  },
]
