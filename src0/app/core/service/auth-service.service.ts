import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, map, Observable, throwError } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'
import type { User } from '../helpers/user'
import { UserService } from './user-service.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null

  public readonly authSessionKey = 'EDUPORT_AUTH_SESSION_KEY_'

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}
  



  private apiUrl = 'https://api.tamem.com.ly/api'; // 🔹 Change this to your API URL

  // login(email: string, password: string) {

  //   return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
  //     map((user) => {
  //        user.token = user.accessToken ; 
         
  //       if (user && user.token) {
  //       //  localStorage.setItem(this.authSessionKey, user.token);

  //         // #ref_set_token 
  //         this.cookieService.set(
  //           this.authSessionKey,
  //           JSON.stringify(user.token),
  //           1,
  //           '/'
  //         )
  //       }
  //       return user
  //     })
  //   )
  // }




  login(login: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/login`, { login, password })
      .pipe(
        map((user) => {
          user.token = user.token;
          if (user && user.token) {
          
        
            this.cookieService.set(
              this.authSessionKey,
              JSON.stringify(user.token),
              1,
              '/'
            );
          }
          return user;
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An unknown error occurred';
          
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Server-side error
            switch (error.status) {
              case 401:
                errorMessage = 'Invalid credentials. Please check your email and password.';
                break;
              case 404:
                errorMessage = 'Service not found. Please try again later.';
                break;
              case 500:
                errorMessage = 'Server error. Please try again later.';
                break;
              default:
                errorMessage = `Error Code: ${error.status}, Message: ${error.message}`;
            }
          }
          
          // Propagate the error to the component that called this method
          return throwError(() => new Error(errorMessage));
        })
      );
  }


  
  signup(name: string, email: string, password: string) {
    return this.http
      .post<User>(`/api/signup`, { name, email, password })
      .pipe(map((user) => user))
  }

  logout(): void {
    this.cookieService.delete(this.authSessionKey)
    this.user = null
  }

  get session(): string {
    // const token = localStorage.getItem(this.authSessionKey);
    // if (!token) {
    //   console.warn('🚨 No token found in localStorage.');
    //   return ''; // ✅ Return null instead of an empty string
    // }
    // return token.trim().replace(/^"(.*)"$/, '$1'); // ✅ Remove any surrounding quotes
    return this.cookieService.get(this.authSessionKey).trim().replace(/^"(.*)"$/, '$1'); // #ref_get_token 

  }

  saveSession(token: string): void {
    this.cookieService.set(this.authSessionKey, token)
  }

  removeSession(): void {
    this.cookieService.delete(this.authSessionKey)
  }
}
