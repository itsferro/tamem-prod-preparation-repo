// block-managment.component.ts - Final Clean Version with User Filter Only

import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

import { TamemService } from '@/app/core/service/tamem-service.service';
import { LessonBlockTasksComponent } from '@/app/views/course/detail/components/lesson-block-track/lesson-block-tasks/lesson-block-tasks.component';

// Interfaces
interface Phase {
  id: number;
  name: string;
  shortName: string;
  iconClass: string;
  phaseOrder: number;
}

interface CourseBlock {
  id: number;
  title: string;
  lessonName: string;
  lessonId: number;
  currentPhase: Phase;
  status: string;
  progressPercentage: number;
  assignedTo: string;
  assignedToUserId: number;
  durationSeconds: number;
  estimatedPoints: number;
  flags: string[];
  lastUpdated: string;
  lastUpdatedBy: string;
  isStuck: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface CourseStats {
  totalLessons: number;
  totalBlocks: number;
}

interface BlockStats {
  total: number;
  completed: number;
  inProgress: number;
  stuck: number;
  review: number;
}

interface SelectedCourse {
  id: number;
  name: string;
}
@Component({
  selector: 'block-managment-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class BlockManagmentDashboardComponent implements OnInit, OnChanges, OnDestroy {

  // Services
  private modalService = inject(NgbModal);
  private tamemService = inject(TamemService);
  private destroy$ = new Subject<void>();

  // Input from parent component
  @Input() selectedCourseId: number | null = null;

  // Component State
  isLoading: boolean = false;
  errorMessage: string | null = null;
  currentFilter: string = 'all';
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  // User filter property
  selectedUser: string = 'all';

  // Data Properties
  selectedCourse: SelectedCourse = {
    id: 1,
    name: 'Advanced Web Development'
  };

  courseStats: CourseStats = {
    totalLessons: 0,
    totalBlocks: 0
  };

  blockStats: BlockStats = {
    total: 0,
    completed: 0,
    inProgress: 0,
    stuck: 0,
    review: 0
  };

  allBlocks: CourseBlock[] = [];
  filteredBlocks: CourseBlock[] = [];
  paginatedBlocks: CourseBlock[] = [];

  // Unique assignees for user filter
  uniqueAssignees: string[] = [];

  ngOnInit(): void {
    if (this.selectedCourseId) {
      this.loadCourseData(this.selectedCourseId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCourseId'] && this.selectedCourseId) {
      this.loadCourseData(this.selectedCourseId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // API Data Loading Methods
  loadCourseData(courseId: number): void {
    if (!courseId) {
      console.warn('No course ID provided');
      this.resetComponentData();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    console.log('Loading course blocks data for course ID:', courseId);

    this.tamemService.getCourseBlocksMonitor(courseId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('API Response:', response);
          this.handleCourseDataSuccess(response);
        },
        error: (error) => {
          console.error('API Error:', error);
          this.handleCourseDataError(error);
        }
      });
  }

  /**
   * Handle successful API response
   */
  private handleCourseDataSuccess(response: any): void {
    console.log('Course blocks data loaded successfully:', response);

    // Handle response structure - check if it's wrapped in success/data
    let data = response;
    if (response.success && response.data) {
      data = response.data;
    }

    // Update component data
    this.selectedCourse = data.course || { id: this.selectedCourseId!, name: 'Unknown Course' };
    this.courseStats = data.stats || { totalLessons: 0, totalBlocks: 0 };
    this.blockStats = data.blockStats || { total: 0, completed: 0, inProgress: 0, stuck: 0, review: 0 };
    this.allBlocks = data.blocks || [];

    // Update unique assignees after loading data
    this.updateUniqueAssignees();

    // Reset pagination and apply filters
    this.currentPage = 1;
    this.applyFilter();

    console.log(`Loaded ${this.allBlocks.length} blocks for course: ${this.selectedCourse.name}`);
  }

  /**
   * Handle API error
   */
  private handleCourseDataError(error: any): void {
    console.error('Failed to load course blocks:', error);
    this.errorMessage = error?.error?.message || error?.message || 'Failed to load course blocks. Please try again.';

    // Reset data on error
    this.resetComponentData();
  }

  /**
   * Reset component data to initial state
   */
  private resetComponentData(): void {
    this.selectedCourse = { id: 0, name: 'Unknown Course' };
    this.courseStats = { totalLessons: 0, totalBlocks: 0 };
    this.blockStats = { total: 0, completed: 0, inProgress: 0, stuck: 0, review: 0 };
    this.allBlocks = [];
    this.uniqueAssignees = [];
    this.applyFilter();
  }

  /**
   * Get unique assignees from all blocks
   */
  private updateUniqueAssignees(): void {
    const assignees = this.allBlocks
      .map(block => block.assignedTo)
      .filter(assignee => assignee && assignee.trim() !== '') // Filter out null/empty
      .filter((assignee, index, arr) => arr.indexOf(assignee) === index) // Remove duplicates
      .sort(); // Sort alphabetically

    this.uniqueAssignees = assignees;
    console.log('Unique assignees extracted:', this.uniqueAssignees);
  }

  /**
   * Refresh data from API
   */
  refreshData(): void {
    if (this.selectedCourseId) {
      this.loadCourseData(this.selectedCourseId);
    }
  }

  /**
   * Retry loading after error
   */
  retryLoad(): void {
    this.refreshData();
  }

  // Filter and Search Methods
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
    this.applyFilter();
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilter();
  }

  /**
   * Apply filter with user filtering
   */
  applyFilter(): void {
    // Start with all blocks
    let blocks = this.allBlocks;

    // Apply user filter
    if (this.selectedUser !== 'all') {
      blocks = blocks.filter(block => block.assignedTo === this.selectedUser);
    }

    // Apply status filter
    this.filteredBlocks = this.getFilteredBlocks(this.currentFilter, blocks);

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredBlocks = this.filteredBlocks.filter(block =>
        block.title.toLowerCase().includes(searchLower) ||
        block.lessonName.toLowerCase().includes(searchLower) ||
        block.assignedTo.toLowerCase().includes(searchLower) ||
        block.currentPhase.shortName.toLowerCase().includes(searchLower)
      );
    }

    this.updatePagination();
  }

  /**
   * Get filtered blocks based on current filter
   */
  getFilteredBlocks(filter: string, blocksToFilter: CourseBlock[] = this.allBlocks): CourseBlock[] {
    switch (filter) {
      case 'inProgress':
        return blocksToFilter.filter(block => block.status === 'in-progress');
      case 'stuck':
        return blocksToFilter.filter(block => block.isStuck || block.flags.includes('stuck'));
      case 'completed':
        return blocksToFilter.filter(block =>
          block.status === 'approved' || block.status === 'done'
        );
      case 'review':
        return blocksToFilter.filter(block =>
          block.status === 'review' || block.flags.includes('review')
        );
      case 'assigned-to':
        // Return all blocks but sorted alphabetically by assignedTo
        return [...blocksToFilter].sort((a, b) => {
          // Handle cases where assignedTo might be null or undefined
          const assignedToA = a.assignedTo || '';
          const assignedToB = b.assignedTo || '';
          return assignedToA.localeCompare(assignedToB);
        });
      default:
        // Check if filter matches a user name (for dynamic user filters)
        if (this.uniqueAssignees.includes(filter)) {
          return blocksToFilter.filter(block => block.assignedTo === filter);
        }
        return blocksToFilter;
    }
  }

  /**
   * Get count for filter buttons based on current user selection
   */
  getFilterCount(filter: string): number {
    let blocks = this.allBlocks;

    // Apply current user filter
    if (this.selectedUser !== 'all') {
      blocks = blocks.filter(block => block.assignedTo === this.selectedUser);
    }

    return this.getFilteredBlocks(filter, blocks).length;
  }

  /**
   * Clear user filter
   */
  clearUserFilter(): void {
    this.selectedUser = 'all';
    this.currentPage = 1;
    this.applyFilter();
  }

  /**
   * Get count for "All Users" dropdown option
   */
  getAllUsersCount(): number {
    return this.allBlocks.length;
  }

  /**
   * Get count for specific user
   */
  getUserBlockCount(assignee: string): number {
    return this.allBlocks.filter(block => block.assignedTo === assignee).length;
  }

  // Pagination Methods
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // Show all filtered blocks (no pagination limit)
    this.paginatedBlocks = this.filteredBlocks;
  }

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
    return Math.ceil(this.filteredBlocks.length / this.pageSize);
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
    return Math.min(this.currentPage * this.pageSize, this.filteredBlocks.length);
  }

  // Date and Time Methods
  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getRelativeTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours <= 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  }

  // Styling Methods
  getPhaseClass(phase: Phase): string {
    return `phase-${phase.name}`;
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

  getRowClass(block: CourseBlock): string {
    if (block.status === 'approved' || block.status === 'done') {
      return 'row-completed';
    } else if (block.isStuck || block.flags.includes('stuck')) {
      return 'row-stuck';
    } else if (block.status === 'review' || block.flags.includes('review')) {
      return 'row-review';
    } else if (block.status === 'in-progress') {
      return 'row-in-progress';
    }
    return '';
  }

  getUserInitials(userName: string): string {
    if (!userName) return '?';
    return userName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

  getUserInitialsForFilter(userName: string): string {
    return this.getUserInitials(userName);
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getProgressOffset(percentage: number): number {
    const circumference = 113; // 2 * π * radius (18)
    const offset = circumference - (percentage / 100) * circumference;
    return Math.round(offset * 10) / 10;
  }

  getCompletionRate(): number {
    if (this.blockStats.total === 0) return 0;
    return Math.round((this.blockStats.completed / this.blockStats.total) * 100);
  }

  // Flag Methods
  getFlagClass(flag: string): string {
    const flagClasses: { [key: string]: string } = {
      'urgent': 'flag-urgent',
      'stuck': 'flag-stuck',
      'priority': 'flag-priority',
      'review': 'flag-review',
      'help-request': 'flag-help-request'
    };
    return flagClasses[flag] || 'flag-urgent';
  }

  getFlagIcon(flag: string): string {
    const flagIcons: { [key: string]: string } = {
      'urgent': 'fas fa-exclamation-triangle',
      'stuck': 'fas fa-hand-paper',
      'priority': 'fas fa-exclamation',
      'review': 'fas fa-eye',
      'help-request': 'fas fa-question-circle'
    };
    return flagIcons[flag] || 'fas fa-flag';
  }

  getFlagTitle(flag: string): string {
    const flagTitles: { [key: string]: string } = {
      'urgent': 'Urgent Task',
      'stuck': 'Blocked/Stuck',
      'priority': 'High Priority',
      'review': 'Needs Review',
      'help-request': 'Help Request'
    };
    return flagTitles[flag] || 'Flag';
  }

  // Action Methods
  private isModalOpen = false;
  viewBlockDetails(block: any): void {
    // Prevent opening if modal is already open
    if (this.isModalOpen) {
      return;
    }

    this.isModalOpen = true;
    // Open the modal with the phases data
    const modalRef = this.modalService.open(LessonBlockTasksComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.blockId = block.id;

    // Reset flag when modal closes
    modalRef.result.finally(() => {
      this.isModalOpen = false;
    });
  }

  navigateToBlockContent(block: CourseBlock): void {
    if (block && block.id) {
      // Open storyboard in a new tab
      // const url = `/course/block/${block.id}/insights`;
      const url = `/course/block/${block.id}/content`;

      window.open(url, '_blank');
    }
  }

 

  exportData(): void {
    console.log('Exporting data...');
    const dataStr = JSON.stringify(this.filteredBlocks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `course-blocks-${this.selectedCourse.name}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Public getters for template
  get isDataLoading(): boolean {
    return this.isLoading;
  }

  get hasError(): boolean {
    return !!this.errorMessage;
  }

  get errorText(): string {
    return this.errorMessage || '';
  }

  get hasBlocks(): boolean {
    return this.allBlocks.length > 0;
  }

  /**
   * Check if current filter is a user filter
   */
  isUserFilter(filter: string): boolean {
    return this.uniqueAssignees.includes(filter);
  }
}
