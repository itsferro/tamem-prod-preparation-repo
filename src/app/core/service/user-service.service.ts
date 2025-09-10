// src/app/core/services/user.service.ts
import { Injectable } from '@angular/core';

// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: 'admin' | 'member';
//   avatar?: string;
// }

export type User = {
  id?: string | number
  avatar?: string
  email?: string
  username?: string
  password?: string
  firstName?: string
  lastName?: string
  role: string
  token: string
  name?: string
  accessToken?: string
}



@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private user: User | null = null;
  private token: string | null = null;
  private role:string | null = null;
  private name: string | null = null;
  private email: string | null = null;

  constructor() {
    // Load from localStorage on init
    this.loadFromStorage();
  }

  // ===========================================
  // SET USER DATA (called after login)
  // ===========================================
  
  setUser(res: any): void {
    const user = res.user ; 
    this.user = user;
    this.token = res.token;
    this.role = user.user_type;
    this.name = user.name;
    this.email = user.email;
  //  this.saveToStorage();
    console.log('User set:', JSON.stringify(user));
  }

  // ===========================================
  // GET USER DATA
  // ===========================================
  
  getUser(): User | null {
    return this.user;
  }

  getToken(): string | null {
    return this.token;
  }

  getUserName(): string {
    return this.user?.name || 'Unknown';
  }

  getUserEmail(): string {
    return this.user?.email || '';
  }

  getUserId(){
    return this.user?.id || null;
  }

  // ===========================================
  // ROLE CHECKING
  // ===========================================
  
  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isMember(): boolean {
    return this.role === 'member';
  }

  getUserRole()  {
    return this.role || null;
  }

  // ===========================================
  // AUTH STATUS
  // ===========================================
  
  isAuthenticated(): boolean {
    return this.user !== null && this.token !== null;
  }

  // ===========================================
  // LOGOUT
  // ===========================================
  
  logout(): void {
    this.user = null;
    this.token = null;
    this.clearStorage();
    console.log('User logged out');
  }

  // ===========================================
  // STORAGE (private methods)
  // ===========================================
  
  private saveToStorage(): void {
    if (this.user && this.token) {
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('token', this.token);
    }
  }

  private loadFromStorage(): void {
    try {
      const userStr = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (userStr && token) {
        this.user = JSON.parse(userStr);
        this.token = token;
        console.log('User loaded from storage:', this.user?.name);
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
      this.clearStorage();
    }
  }

  private clearStorage(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}