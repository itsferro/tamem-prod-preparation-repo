import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AuthenticationEffects } from '@/app/store/authentication/authentication.effects'
import { AuthService } from '../service/auth-service.service'
import { Router } from '@angular/router'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public autheffect: AuthenticationEffects ,   private router: Router) {}

  intercept(
    request: HttpRequest<Request>,
    next: HttpHandler
  ): Observable<HttpEvent<Event>> {
    const authenticationService = inject(AuthService)

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          
          // authenticationService.removeSession()
          // window.location.reload()

          // #ref_interceptor  on 401 error redirect  to tsign in page 
           // Don't reload the page for login requests (prevents the loop)
           if (!request.url.includes('/sign-in')) {
            // Only handle 401s for non-login requests
            authenticationService.removeSession()
            
            // Navigate to login page instead of reloading
            this.router.navigate(['/sign-in']);
           }
        }

        const error = err.error.message || err.statusText
        return throwError(error)
      })
    )
  }
}
