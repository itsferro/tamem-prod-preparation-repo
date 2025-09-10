import { Route } from '@angular/router'
import { SignInComponent } from './sign-in/sign-in.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'

export const AUTH_ROUTES: Route[] = [
  {
    path: 'sign-in',
    component: SignInComponent,
    data: { title: 'Sign In' },
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: { title: 'Sign Up' },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'Forgot Password' },
  },
]
