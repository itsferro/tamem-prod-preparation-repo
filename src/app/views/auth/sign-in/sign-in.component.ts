import { AuthService } from '@/app/core/service/auth-service.service'
import { UserService } from '@/app/core/service/user-service.service'
import { login } from '@/app/store/authentication/authentication.actions'
import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export class SignInComponent {
  signinForm!: UntypedFormGroup
  submitted: boolean = false
  passwordType: boolean = true

  private authService = inject(AuthService);
  public fb = inject(UntypedFormBuilder)
  store = inject(Store)
 
  private userService = inject(UserService);
  

  constructor() {

    // this.signinForm = this.fb.group({
    //   email: ['user@demo.com', [Validators.required, Validators.email]],
    //   password: ['123456', [Validators.required]],
    // })

    this.signinForm = this.fb.group({
      email: ['925555335', [Validators.required, Validators.email]],
      password: ['123123123', [Validators.required]],
    })
  }

  get form() {
    return this.signinForm.controls
  }



  // onLogin() {
  //   this.submitted = true;
  
  //  // if (this.signinForm.valid) {
  //    // const { email, password } = this.signinForm.value;
  //    const email = this.form['email'].value // Get the username from the form
  //    const password = this.form['password'].value // Get the password from the form
  
       
  //     // Call AuthService to send login request
  //     this.authService.login(email, password).subscribe(
  //       (response) => {
  //         console.log('Login successful:', response);
  //         // Next step: Handle the successful login (store token, navigate, etc.)
  //           // ✅ Dispatch action to store the user in NgRx
  //          this.store.dispatch(login({ email: email, password: password }))
  //       },
  //       (error) => {
  //         console.error('Login failed:', error);
  //         alert('Invalid email or password. Please try again.');
  //       }
  //     );
  //   //}
  // }


  
  isLoading = false;
  errorMessage = '';

  onLogin() {
    // Prevent multiple submissions
    if (this.isLoading) return;
    
    this.submitted = true;
    this.isLoading = true;
    this.errorMessage = '';
    
    const email = this.form['email'].value;
    const password = this.form['password'].value;
      
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.userService.setUser(response); // Save user data in UserService
        console.log('Login successful:', response);
        this.isLoading = false;
        this.store.dispatch(login({ email, password }));
       
        // Navigate to dashboard or home page
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.isLoading = false;
        this.errorMessage = error.message || 'Authentication failed. Please try again.';
        // Very important: don't do anything here that might trigger another login
      }
    });
  }
  

  



  changeType() {
    this.passwordType = !this.passwordType
  }
}
