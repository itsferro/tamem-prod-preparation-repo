import { Component, inject } from '@angular/core';
import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'


import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { ListComponent } from '../catalog/components/list/list.component'
import { BannerComponent } from '../catalog/components/banner/banner.component';
import { ActionBoxComponent } from '../catalog/components/action-box/action-box.component';
// import { TasksComponent } from './components/tasks/tasks.component';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { UserService } from '@/app/core/service/user-service.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlockManagmentComponent } from "./block-managment/block-managment.component";
import { TaskManagmentComponent } from "./task-managment/task-managment.component";
import { BlockManagmentDashboardComponent } from './block-managment/dashboard/dashboard.component';
 
 // Interface for available courses
interface Course {
  id: number;
  name: string;
  description: string;
  totalLessons: number;
  totalBlocks: number;
  isActive: boolean;
}

@Component({
  selector: 'app-development',
  standalone: true,
  imports: [
    AppMenuComponent,
    BannerComponent,
    ActionBoxComponent,
    FooterComponent,
    ListComponent,
    CommonModule, FormsModule,
    BlockManagmentComponent,
    TaskManagmentComponent,
    BlockManagmentDashboardComponent
],
  templateUrl: './development.component.html',
  styleUrl: './development.component.scss'
})
export class DevelopmentComponent {


// Services
  private tamemService = inject(TamemService);
  private userService = inject(UserService);
  private destroy$ = new Subject<void>();

  isAdmin: boolean = true;
  isMember: boolean = false;

  constructor() {
 
    // this.isAdmin = this.userService.isAdmin();
   //  this.isMember = this.userService.isMember();

     
  }




    // Component State
    activeTab: string = 'tasks'; // Default to blocks tab
    selectedCourseId: number | null = null;
    
    // Data Loading States
    isLoadingCourses = false;
    coursesError: string | null = null;
    
    // Available courses data (now loaded dynamically)
    availableCourses: Course[] = [];
  
    ngOnInit(): void {
      console.log('Admin Dashboard initialized');
      this.loadAvailableCourses();
    }
  
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  
    /**
     * Load available courses from API
     */
    loadAvailableCourses(): void {
      this.isLoadingCourses = true;
      this.coursesError = null;
  
      console.log('Loading available courses from API...');
  
      this.tamemService.getAvailableCourses()
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.isLoadingCourses = false;
          })
        )
        .subscribe({
          next: (response: any) => {
            console.log('Courses API Response:', response);
            this.handleCoursesSuccess(response);
          },
          error: (error) => {
            console.error('Failed to load available courses:', error);
            this.handleCoursesError(error);
          }
        });
    }
  
    /**
     * Handle successful courses API response
     */
    private handleCoursesSuccess(response: any): void {
      // Handle response structure - check if it's wrapped in success/data
      let courses = response;
      if (response.success && response.data) {
        courses = response.data;
      }
      
      this.availableCourses = courses || [];
      
      // Set default course to first available course if none selected
      if (this.availableCourses.length > 0 && !this.selectedCourseId) {
        this.selectedCourseId = this.availableCourses[0].id;
      }
      
      console.log('Available courses loaded:', this.availableCourses.length);
    }
  
    /**
     * Handle courses API error
     */
    private handleCoursesError(error: any): void {
      this.coursesError = error?.error?.message || error?.message || 'Failed to load courses. Please try again.';
      
      // Fallback to empty array to prevent UI issues
      this.availableCourses = [];
      console.error('Courses loading error:', this.coursesError);
    }
  
    /**
     * Retry loading courses after error
     */
    retryLoadCourses(): void {
      this.loadAvailableCourses();
    }
  
    /**
     * Set the active tab
     * @param tabName The name of the tab to activate
     */
    setActiveTab(tabName: string): void {
      this.activeTab = tabName;
      console.log('Active tab changed to:', tabName);
    }
  
    /**
     * Check if a tab is currently active
     * @param tabName The tab name to check
     * @returns boolean indicating if tab is active
     */
    isTabActive(tabName: string): boolean {
      return this.activeTab === tabName;
    }
  
    /**
     * Handle course selection change
     * @param courseId The selected course ID
     */
    onCourseChange(courseId: number): void {
      const previousCourseId = this.selectedCourseId;
      this.selectedCourseId = courseId;
      
      const selectedCourse = this.availableCourses.find(c => c.id === courseId);
      
      if (selectedCourse) {
        console.log('Course changed from:', previousCourseId, 'to:', courseId);
        console.log('Selected course:', selectedCourse.name);
        console.log('Course details:', selectedCourse);
      } else {
        console.warn('Selected course not found in available courses:', courseId);
      }
    }
  
    /**
     * Get the currently selected course object
     * @returns Course object or null
     */
    getSelectedCourse(): Course | null {
      if (!this.selectedCourseId) return null;
      return this.availableCourses.find(c => c.id === this.selectedCourseId) || null;
    }
  
    /**
     * Check if courses are loading
     */
    get isCoursesLoading(): boolean {
      return this.isLoadingCourses;
    }
  
    /**
     * Check if there was an error loading courses
     */
    get hasCoursesError(): boolean {
      return !!this.coursesError;
    }
  
    /**
     * Get the courses error message
     */
    get coursesErrorMessage(): string {
      return this.coursesError || '';
    }
  
    /**
     * Check if courses are available
     */
    get hasAvailableCourses(): boolean {
      return this.availableCourses.length > 0;
    }

}
