import { Route } from '@angular/router'
import { AboutComponent } from './about/about/about.component'
import { ContactUsComponent } from './about/contact-us/contact-us.component'
import { BlogGridComponent } from './about/blog-grid/blog-grid.component'
import { BlogMasonryComponent } from './about/blog-masonry/blog-masonry.component'
import { BlogDetailComponent } from './about/blog-detail/blog-detail.component'
import { PricingComponent } from './about/pricing/pricing.component'
import { InstructorListComponent } from './pages/instructor-list/instructor-list.component'
import { InstructorSingleComponent } from './pages/instructor-single/instructor-single.component'
import { BecomeInstructorComponent } from './pages/become-instructor/become-instructor.component'
import { AbroadSingleComponent } from './pages/abroad-single/abroad-single.component'
import { WorkshopDetailComponent } from './pages/workshop-detail/workshop-detail.component'
import { EventDetailComponent } from './pages/event-detail/event-detail.component'
import { FaqComponent } from './help/faq/faq.component'
import { RequestDEmoComponent } from './form/request-demo/request-demo.component'
import { BookClassComponent } from './form/book-class/book-class.component'
import { RequestAccessComponent } from './form/request-access/request-access.component'
import { AdmissionFormComponent } from './form/admission-form/admission-form.component'
import { Error404Component } from './speciality/error404/error404.component'
import { ComingsoonComponent } from './speciality/comingsoon/comingsoon.component'
import { CreateCourseComponent } from './instructor/create-course/create-course.component'
import { CourseAddedComponent } from './pages/course-added/course-added.component'

export const VIEWS_ROUTES: Route[] = [
  { path: 'about', component: AboutComponent, data: { title: 'About Us' } },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    data: { title: 'Contact Us' },
  },
  {
    path: 'blog-grid',
    component: BlogGridComponent,
    data: { title: 'Blog Grid' },
  },
  {
    path: 'blog-masonry',
    component: BlogMasonryComponent,
    data: { title: 'Blog Masonry' },
  },
  {
    path: 'blog-detail',
    component: BlogDetailComponent,
    data: { title: 'Blog Detail' },
  },
  {
    path: 'pricing',
    component: PricingComponent,
    data: { title: 'Pricing' },
  },
  {
    path: 'instructor-list',
    component: InstructorListComponent,
    data: { title: 'Instructor List' },
  },
  {
    path: 'instructor-single',
    component: InstructorSingleComponent,
    data: { title: 'Instructor Single' },
  },
  {
    path: 'become-instructor',
    component: BecomeInstructorComponent,
    data: { title: 'Become Instructor' },
  },
  {
    path: 'abroad-single',
    component: AbroadSingleComponent,
    data: { title: 'Abroad Single' },
  },
  {
    path: 'workshop-detail',
    component: WorkshopDetailComponent,
    data: { title: 'Workshop Detail' },
  },
  {
    path: 'event-detail',
    component: EventDetailComponent,
    data: { title: 'Event Detail' },
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: { title: 'Faq' },
  },
  {
    path: 'request-demo',
    component: RequestDEmoComponent,
    data: { title: 'Request Demo' },
  },
  {
    path: 'book-class',
    component: BookClassComponent,
    data: { title: 'Book Class' },
  },
  {
    path: 'request-access',
    component: RequestAccessComponent,
    data: { title: 'Request Access' },
  },
  {
    path: 'admission-form',
    component: AdmissionFormComponent,
    data: { title: 'Admission Form' },
  },
  {
    path: 'error-404',
    component: Error404Component,
    data: { title: 'Error 404.' },
  },
  {
    path: 'coming-soon',
    component: ComingsoonComponent,
    data: { title: 'ComingSoon' },
  },
  {
    path: 'instructor/create-course',
    component: CreateCourseComponent,
    data: { title: 'Create Course' },
  },
  {
    path: 'course-added',
    component: CourseAddedComponent,
    data: { title: 'Course Added' },
  },
]
