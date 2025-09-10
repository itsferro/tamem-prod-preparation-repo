// task-managment.component.ts - Final Clean Version with Course Filter

import { ChangeDetectorRef, Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { LessonBlockTaskTrackComponent } from '@/app/views/course/detail/components/lesson-block-track/lesson-block-tasks/lesson-block-task-track/lesson-block-task-track.component';

interface AdminTask {
  id: number;
  taskId: number;
  taskName: string;
  taskShortName: string;
  taskIconClass: string;
  status: string;
  estimatedPoints: number;
  estimatedWorkingMinutes: number;
  actualWorkingMinutes: number;
  assignedToUserName: string;
  assignedByUserName: string;
  lastUpdatedByUserName: string | null;
  lastUpdatedAt: string | null;
  flags: string[];
  counterHelp: number;
  counterRefuse: number;
  counterReopen: number;
  courseName: string;
  lessonName: string;
  blockName: string;
  canvaLink?: string;
  googleDriveLink?: string;
  storyBoardLink?: string;
  hasStoryBoard?: boolean;
}

interface TaskStats {
  total: number;
  backlog: number;
  toDo: number;
  inProgress: number;
  done: number;
  review: number;
  approved: number;
  rejected: number;
  totalPoints: number;
  totalEstimatedMinutes: number;
  totalActualMinutes: number;
  unassignedTasks: number;
}

@Component({
  selector: 'development-task-managment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-managment.component.html',
  styleUrl: './task-managment.component.scss'
})
export class TaskManagmentComponent implements OnInit {
  
  private modalService = inject(NgbModal);
  private tamemService = inject(TamemService);
  private cdr = inject(ChangeDetectorRef);

  // Input properties
  @Input() courseId: number | null = null;
  @Input() showAllTasks: boolean = false;
  
  // Component state - Explicitly declare all template properties
  currentUserName: string = 'Admin User';
  currentFilter: string = 'all';
  selectedUser: string = 'all';
  selectedCourse: string = 'all';
  currentPage: number = 1;
  pageSize: number = 10;
  sortOrder: 'asc' | 'desc' = 'desc';
  
  // Loading states
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Task data - Explicitly typed arrays
  allTasks: AdminTask[] = [];
  filteredTasks: AdminTask[] = [];
  paginatedTasks: AdminTask[] = [];
  uniqueUsers: string[] = [];
  uniqueCourses: string[] = [];
  
  // Statistics
  taskStats: TaskStats = {
    total: 0,
    backlog: 0,
    toDo: 0,
    inProgress: 0,
    done: 0,
    review: 0,
    approved: 0,
    rejected: 0,
    totalPoints: 0,
    totalEstimatedMinutes: 0,
    totalActualMinutes: 0,
    unassignedTasks: 0
  };

  ngOnInit(): void {
    this.courseId = 5;
    this.loadAdminTasks();
  }

  /**
   * Load admin-specific tasks from API
   */
  loadAdminTasks(): void {
    if (!this.courseId) {
      console.warn('No blockId provided');
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.tamemService.getCurrentUserTasks().subscribe({
      next: (response) => {
        console.log('Admin Tasks API Response:', response);
        
        if (response && response.success && Array.isArray(response.data)) {
          this.allTasks = response.data;
          this.extractUniqueUsers();
          this.extractUniqueCourses();
          this.calculateTaskStats();
          this.applyFilter();
          console.log('Admin tasks loaded successfully:', this.allTasks.length, 'tasks');
        } 
        else if (Array.isArray(response)) {
          this.allTasks = response;
          this.extractUniqueUsers();
          this.extractUniqueCourses();
          this.calculateTaskStats();
          this.applyFilter();
          console.log('Admin tasks loaded successfully (direct array):', this.allTasks.length);
        }
        else if (response && response.success === false) {
          console.error('API returned unsuccessful response:', response);
          this.errorMessage = response.message || 'Failed to load admin tasks';
          this.allTasks = [];
        }
        else {
          console.error('Unexpected response format:', response);
          this.errorMessage = 'Unexpected response format from server';
          this.allTasks = [];
        }
      },
      error: (error) => {
        console.error('Failed to load admin tasks:', error);
        this.errorMessage = 'Failed to load admin tasks. Please try again.';
        this.allTasks = [];
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Extract unique users from loaded tasks
   */
  private extractUniqueUsers(): void {
    const users = this.allTasks
      .map(task => task.assignedToUserName)
      .filter(user => user && user.trim() !== '')
      .filter((user, index, arr) => arr.indexOf(user) === index)
      .sort();

    this.uniqueUsers = users;
    console.log('Unique users extracted:', this.uniqueUsers);
  }

  /**
   * Extract unique courses from loaded tasks
   */
  private extractUniqueCourses(): void {
    const courses = this.allTasks
      .map(task => task.courseName)
      .filter(course => course && course.trim() !== '')
      .filter((course, index, arr) => arr.indexOf(course) === index)
      .sort();

    this.uniqueCourses = courses;
    console.log('Unique courses extracted:', this.uniqueCourses);
  }

  /**
   * Calculate task statistics from loaded tasks
   */
  calculateTaskStats(): void {
    let tasksToCalculate = this.allTasks;
    
    if (this.selectedUser !== 'all') {
      tasksToCalculate = tasksToCalculate.filter(task => task.assignedToUserName === this.selectedUser);
    }
    
    if (this.selectedCourse !== 'all') {
      tasksToCalculate = tasksToCalculate.filter(task => task.courseName === this.selectedCourse);
    }

    this.taskStats = {
      total: tasksToCalculate.length,
      backlog: tasksToCalculate.filter(t => t.status === 'backlog').length,
      toDo: tasksToCalculate.filter(t => t.status === 'to-do').length,
      inProgress: tasksToCalculate.filter(t => t.status === 'in-progress').length,
      done: tasksToCalculate.filter(t => t.status === 'done').length,
      review: tasksToCalculate.filter(t => t.status === 'review').length,
      approved: tasksToCalculate.filter(t => t.status === 'approved').length,
      rejected: tasksToCalculate.filter(t => t.status === 'rejected').length,
      totalPoints: tasksToCalculate.reduce((sum, t) => sum + t.estimatedPoints, 0),
      totalEstimatedMinutes: tasksToCalculate.reduce((sum, t) => sum + t.estimatedWorkingMinutes, 0),
      totalActualMinutes: tasksToCalculate.reduce((sum, t) => sum + t.actualWorkingMinutes, 0),
      unassignedTasks: tasksToCalculate.filter(t => t.assignedToUserName === 'Unassigned').length
    };
  }

  /**
   * Get current date
   */
  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Set filter and update view
   */
  setFilter(filter: string): void {
    this.currentFilter = filter;
    this.currentPage = 1;
    this.applyFilter();
  }

  /**
   * Handle user selection change
   */
  onUserSelectionChange(): void {
    this.currentPage = 1;
    this.calculateTaskStats();
    this.applyFilter();
  }

  /**
   * Handle course selection change
   */
  onCourseSelectionChange(): void {
    this.currentPage = 1;
    this.calculateTaskStats();
    this.applyFilter();
  }

  /**
   * Apply current filter with user and course selection
   */
  applyFilter(): void {
    let filteredTasks = this.allTasks;
    
    if (this.selectedUser !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.assignedToUserName === this.selectedUser);
    }
    
    if (this.selectedCourse !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.courseName === this.selectedCourse);
    }

    this.filteredTasks = this.getFilteredTasks(this.currentFilter, filteredTasks);
    this.updatePagination();
  }

  /**
   * Get filtered tasks based on current filter, user selection, and course selection
   */
  getFilteredTasks(filter: string, tasksToFilter: AdminTask[] = this.allTasks): AdminTask[] {
    switch (filter) {
      case 'backlog':
        return tasksToFilter.filter(task => task.status === 'backlog');
      case 'to-do':
        return tasksToFilter.filter(task => task.status === 'to-do');
      case 'in-progress':
        return tasksToFilter.filter(task => task.status === 'in-progress');
      case 'done':
        return tasksToFilter.filter(task => task.status === 'done');
      case 'review':
        return tasksToFilter.filter(task => task.status === 'review');
      case 'approved':
        return tasksToFilter.filter(task => task.status === 'approved');
      case 'rejected':
        return tasksToFilter.filter(task => task.status === 'rejected');
      case 'unassigned':
        return tasksToFilter.filter(task => task.assignedToUserName === 'Unassigned');
      case 'needs-help':
        return tasksToFilter.filter(task => task.counterHelp > 0);
      default:
        return tasksToFilter;
    }
  }

  /**
   * Get count for filter buttons based on current user and course selection
   */
  getFilterCount(filter: string): number {
    let filteredTasks = this.allTasks;
    
    if (this.selectedUser !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.assignedToUserName === this.selectedUser);
    }
    
    if (this.selectedCourse !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.courseName === this.selectedCourse);
    }
    
    return this.getFilteredTasks(filter, filteredTasks).length;
  }

  /**
   * Update pagination
   */
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTasks = this.filteredTasks;
  }

  /**
   * Get task count for a specific course
   */
  getCourseTaskCount(courseName: string): number {
    return this.allTasks.filter(task => task.courseName === courseName).length;
  }

  /**
   * Get task count for a specific user (used in template)
   */
  getUserTaskCount(userName: string): number {
    let tasks = this.allTasks.filter(task => task.assignedToUserName === userName);
    if (this.selectedCourse !== 'all') {
      tasks = tasks.filter(task => task.courseName === this.selectedCourse);
    }
    return tasks.length;
  }

  /**
   * Get count for "All Users" option in dropdown
   */
  getAllUsersCount(): number {
    if (this.selectedCourse === 'all') {
      return this.allTasks.length;
    }
    return this.allTasks.filter(task => task.courseName === this.selectedCourse).length;
  }

  /**
   * Get count for "All Courses" option in dropdown
   */
  getAllCoursesCount(): number {
    if (this.selectedUser === 'all') {
      return this.allTasks.length;
    }
    return this.allTasks.filter(task => task.assignedToUserName === this.selectedUser).length;
  }

  /**
   * Clear all filters
   */
  clearAllFilters(): void {
    this.selectedUser = 'all';
    this.selectedCourse = 'all';
    this.currentFilter = 'all';
    this.currentPage = 1;
    this.calculateTaskStats();
    this.applyFilter();
  }

  /**
   * Open task tracking modal
   */
  openTaskTrack(task: AdminTask): void {
    const modalRef = this.modalService.open(LessonBlockTaskTrackComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      windowClass: 'task-log-modal'
    });

    const transformedTask = {
      id: task.id,
      title: task.taskName,
      description: `${task.taskShortName} task`,
      phase: {
        id: task.taskId,
        name: task.taskName,
        shortName: task.taskShortName,
        iconClass: task.taskIconClass
      },
      status: task.status,
      estimatedPoints: task.estimatedPoints,
      actualWorkingMinutes: task.actualWorkingMinutes,
      estimatedWorkingMinutes: task.estimatedWorkingMinutes,
      assignedToUserName: task.assignedToUserName,
      flags: task.flags
    };

    modalRef.componentInstance.currentTask = transformedTask;
    modalRef.componentInstance.courseName = task.courseName;
    modalRef.componentInstance.lessonName = task.lessonName;
    modalRef.componentInstance.blockName = task.blockName;

      modalRef.componentInstance.canvaLink = task.canvaLink;
      modalRef.componentInstance.googleDriveLink = task.googleDriveLink;
    // modalRef.componentInstance.storyBoardLink = task.storyBoardLink;
      modalRef.componentInstance.hasStoryBoard = task.hasStoryBoard;

 


    modalRef.componentInstance.actionPerformed.subscribe((data: any) => {
      console.log('Action performed via EventEmitter:', data);
      this.loadAdminTasks();
      this.cdr.detectChanges();
    });
  }

  /**
   * Refresh tasks data
   */
  refreshTasks(): void {
    this.loadAdminTasks();
  }

  // Utility methods
  getUserInitials(userName: string): string {
    if (!userName || userName === 'Unassigned') return '?';
    return userName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'backlog': 'Backlog',
      'to-do': 'To Do',
      'in-progress': 'In Progress',
      'done': 'Done',
      'review': 'Review',
      'approved': 'Approved',
      'rejected': 'Rejected'
    };
    return labels[status] || status;
  }

  getStatusRowClass(status: string): string {
    return `row-status-${status}`;
  }

  getTaskPhaseColor(taskName: string): string {
    const phaseColors: { [key: string]: string } = {
      'content-development': '#7b1fa2',
      'storyboard-generation': '#f57c00',
      'sketch-prep': '#2e7d32',
      'sketch-pencil': '#1976d2',
      'sketch-polishing': '#2e7d32',
      'voice-over': '#ad1457',
      'motion-planning': '#558b2f',
      'sketch-assets': '#c62828',
      'video-production': '#3f51b5'
    };
    return phaseColors[taskName] || '#6c757d';
  }

  formatMinutes(minutes: number): string {
    if (minutes === 0) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  }

  formatLastUpdated(dateString: string | null): string {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  getTaskPriority(task: AdminTask): 'low' | 'medium' | 'high' | 'critical' {
    if (task.counterHelp > 2 || task.counterRefuse > 1) return 'critical';
    if (task.counterHelp > 0 || task.assignedToUserName === 'Unassigned') return 'high';
    if (task.status === 'in-progress') return 'medium';
    return 'low';
  }

  getPriorityClass(task: AdminTask): string {
    return `priority-${this.getTaskPriority(task)}`;
  }

  // Pagination methods
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredTasks.length / this.pageSize);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredTasks.length);
  }
}