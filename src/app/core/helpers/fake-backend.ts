import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators'
import { User } from './user'

type MyRequestBody = {
  // Define the structure of your request body
  username: string
  name: string
  password: string
  email: string
}

const token =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3ZWJlc3RpY2EiLCJpYXQiOjE1ODczNTY2NDksImV4cCI6MTkwMjg4OTQ0OSwiYXVkIjoiaHR0cHM6Ly93d3cud2ViZXN0aWNhLmNvbS8iLCJzdWIiOiJ3ZWJlc3RpY2FAZ21haWwuY29tIiwibGFzdE5hbWUiOiJXZWJlc3RpY2EiLCJFbWFpbCI6IndlYmVzdGljYUBnbWFpbC5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJCb29raW5nIn0.4XRiR3ANcl9AnbdrOrO_cIA15HbDlyHAqL9NqGSacDVeKM8w8dV7HaEbLs-KLiQ92e7tHotU_RBIZCgiRF95MA'

const fakeUsers: User[] = [
  {
    id: 1,
    username: 'user',
    email: 'user@demo.com',
    password: '123456',
    firstName: 'User',
    lastName: 'Demo',
    token: token,
  },
]

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<MyRequestBody>,
    next: HttpHandler
  ): Observable<HttpEvent<Event>> {
    return of(null)
      .pipe(
        mergeMap(() => {
          // authenticate - public+
          if (request.url.includes('api/login') && request.method === 'POST') {
            const user = fakeUsers.find(
              (x) =>
                x.email === request.body?.email &&
                x.password === request.body?.password
            )
            if (!user) {
              return error('Email or password is incorrect')
            }
            return ok({
              ...user,
              name: user.firstName + ' ' + user.lastName,
            })
          }

          // pass through any requests not handled above
          return next.handle(request)
        })
      )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize())

    // private helper functions
    function ok(body?: User) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function unauthorised() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } })
    }

    function error(message: string) {
      return throwError({ status: 400, error: { message } })
    }
  }
}

export const FakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
}
