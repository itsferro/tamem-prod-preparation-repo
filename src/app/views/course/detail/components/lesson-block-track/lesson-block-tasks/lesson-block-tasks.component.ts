import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonBlockTaskTrackComponent } from './lesson-block-task-track/lesson-block-task-track.component';
import { TamemService } from '@/app/core/service/tamem-service.service';

@Component({
  selector: 'detail-lesson-block-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './lesson-block-tasks.component.html',
  styleUrl: './lesson-block-tasks.component.scss'
})
export class LessonBlockTasksComponent implements OnInit {
  @Input() blockId: any = null;

  @Input() canvaLink: any = null;
  @Input() googleDriveLink: any = null;
  @Input() storyBoardLink: any = null;
  @Input() hasStoryBoard: any = null;

  @Input() courseName: any = null;
  @Input() lessonName: any = null;
  @Input() blockName: any = null;
 



  @Input() editBlock: any = null;
  @Input() blockPhases: any[] = [];
  @Input() phaseSummary: any = null;

  @Output() blockUpdated = new EventEmitter<any>();

  // Inject the modal reference
  public modal = inject(NgbActiveModal);
  private tamemService = inject(TamemService);
  private cdr = inject(ChangeDetectorRef);

  // Component properties
  blockTasks: any[] = [];
  isSubmitting = false;
  errorMessage: string | null = null;

  ngOnInit(): void {

     
    this.getBlockTasks();
  }

  /**
   * Initialize block tasks from phases data
   */
  private getBlockTasks(): void {

    this.tamemService.getBlockTasks(this.blockId).subscribe({
      next: (response) => {
        this.blockTasks = response.data;
        this.cdr.detectChanges();
        console.log('Block tasks data received:', response);
      },
      error: (error) => {
        console.error('Error fetching block tasks:', error);
      }
    });


  }

  /**
   * Handle modal cancellation
   */
  onCancel(): void {
    this.modal.dismiss('cancel');
  }

  /**
   * Handle save action
   */
  onSave(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    try {
      // Convert blockTasks back to phases format
      const updatedPhases = this.blockTasks.map(task => ({
        id: task.id,
        phase_id: task.phaseId,
        name: task.phaseName,
        short_name: task.phaseShortName,
        icon_class: task.phaseIconClass,
        status: task.status,
        estimated_points: task.estimatedPoints,
        estimated_working_minutes: task.estimatedWorkingMinutes,
        actual_working_minutes: task.actualWorkingMinutes,
        assigned_user_name: task.assignedToUserName,
        last_updated_by: task.lastUpdatedByUserName,
        last_updated_at: new Date().toISOString(),
        is_stuck: task.isStuck
      }));

      // Emit the updated data
      this.blockUpdated.emit({
        id: this.editBlock?.id,
        phases: updatedPhases
      });

      // Close the modal
      this.modal.close({
        success: true,
        data: updatedPhases
      });

    } catch (error) {
      console.error('Error saving block tracking data:', error);
      this.errorMessage = 'Failed to save changes. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * Update task status
   */
  updateTaskStatus(task: any, newStatus: string): void {
    const oldStatus = task.status;
    task.status = newStatus;
    task.lastUpdatedAt = new Date().toISOString();

    console.log(`Updated task ${task.phaseId} status from ${oldStatus} to ${newStatus}`);
  }

  /**
   * Toggle stuck flag for a task
   */
  toggleStuckFlag(task: any): void {
    task.lastUpdatedAt = new Date().toISOString();
    console.log(`Toggled stuck flag for task ${task.phaseId}: ${task.isStuck}`);
  }

  /**
   * Get count of completed tasks/phases
   */
  getCompletedTasksCount(): number {
    if (!this.blockTasks || this.blockTasks.length === 0) {
      return 0;
    }

    return this.blockTasks.filter(task => task.status === 'approved').length;
  }

  /**
   * Get count of in-progress tasks/phases
   */
  getInProgressTasksCount(): number {
    if (!this.blockTasks || this.blockTasks.length === 0) {
      return 0;
    }

    return this.blockTasks.filter(task => task.status === 'in-progress').length;
  }

  /**
   * Get count of stuck tasks/phases
   */
  getStuckTasksCount(): number {
    if (!this.blockTasks || this.blockTasks.length === 0) {
      return 0;
    }

    return this.blockTasks.filter(task => task.isStuck === true).length;
  }

  /**
   * Get status options for dropdown
   */
  getStatusOptions(): { value: string, label: string }[] {
    return [
      { value: 'backlog', label: 'Backlog' },
      { value: 'to-do', label: 'To Do' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'done', label: 'Done' },
      { value: 'review', label: 'Review' },
      { value: 'approved', label: 'Approved' },
      { value: 'rejected', label: 'Rejected' }
    ];
  }

  /**
   * Get user initials for avatar
   */
  getUserInitials(userName: string | null): string {
    return 'S';
    if (!userName || userName === 'Unassigned') return '?';

    //   return userName
    //     .split(' ')
    //     .map(name => name.charAt(0).toUpperCase())
    //     .join('')
    //     .substring(0, 2);
    // 
  }

  /**
   * Format date for display
   */
  formatDate(dateString: string | null): string {
    if (!dateString) return 'Not set';

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        return 'Yesterday';
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else {
        return date.toLocaleDateString();
      }
    } catch {
      return 'Invalid date';
    }
  }


  private modalService = inject(NgbModal);

  openTaskTrack(task: any): void {
    const modalRef = this.modalService.open(LessonBlockTaskTrackComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      windowClass: 'task-log-modal'
    });

    // Pass all task data
    modalRef.componentInstance.currentTask = { ...task };

    // here we send canvaLink + GoogleDriveLink + StoryBoardLink    
    modalRef.componentInstance.canvaLink = this.canvaLink;
    modalRef.componentInstance.googleDriveLink = this.googleDriveLink;
    modalRef.componentInstance.storyBoardLink = this.storyBoardLink;

    modalRef.componentInstance.courseName = this.courseName;
    modalRef.componentInstance.lessonName = this.lessonName;
    modalRef.componentInstance.blockName = this.blockName;

    modalRef.componentInstance.currentTask = task;
 
 
  

    // ✅ Update to handle the new event structure
    modalRef.componentInstance.actionPerformed.subscribe((data: any) => {
      console.log('Action performed via EventEmitter:', data);
      this.blockPhases = data.submittedPhases;
      this.getBlockTasks();
      this.cdr.detectChanges();

    });

    // modalRef.result.then(
    //   (result) => {
    //     alert('submitted');

    //   },
    //   (dismissed) => { alert('dismissed'); }
    // );


  }



  generateBlockTasks() {

    this.tamemService.postBlockTasks(this.blockId).subscribe({
      next: (response) => {
        // Handle successful creation
        this.blockPhases = response.data.phases;
        this.getBlockTasks();
        this.cdr.detectChanges();
        //  console.log('blockPhases2:', this.blockPhases);

      },
      error: (error) => {
        // Handle error
        // this.handleErrorResponse(error);
      }
    });


  }

  deleteBlockTasks() {

    this.tamemService.deleteBlockTasks(this.blockId).subscribe({
      next: (response) => {
        // Handle successful creation
        this.blockPhases = response.data.phases;
        this.getBlockTasks();
        this.cdr.detectChanges();

      },
      error: (error) => {
        // Handle error
        // this.handleErrorResponse(error);
      }
    });


  }


  // Add these methods to your existing lesson-block-track-form.component.ts

  /**
   * Get CSS class for table row based on status
   */
  getRowStatusClass(status: string): string {
    return `row-${status}`;
  }

  /**
   * Get CSS class for status badge
   */
  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  /**
   * Get icon for status badge
   */
  getStatusIcon(status: string): string {
    const statusIcons: { [key: string]: string } = {
      'backlog': 'fas fa-inbox',
      'to-do': 'fas fa-list-ul',
      'in-progress': 'fas fa-spinner',
      'done': 'fas fa-check',
      'review': 'fas fa-eye',
      'approved': 'fas fa-check-circle',
      'rejected': 'fas fa-times-circle'
    };
    return statusIcons[status] || 'fas fa-question-circle';
  }

  /**
   * Get label for status display
   */
  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'backlog': 'Backlog',
      'to-do': 'To Do',
      'in-progress': 'In Progress',
      'done': 'Done',
      'review': 'Review',
      'approved': 'Approved',
      'rejected': 'Rejected'
    };
    return statusLabels[status] || status;
  }




  // Add this to your component class (after your existing properties)

  // Flag configuration - add this to your component class
  private flagConfigs: { [key: string]: { icon: string, color: string, title: string } } = {
    'urgent': {
      icon: 'fas fa-exclamation-triangle',
      color: '#dc3545',
      title: 'Urgent Task'
    },
    'no-approval-needed': {
      icon: 'fas fa-check-double',
      color: '#28a745',
      title: 'No Approval Needed'
    },
    'help-request-low': {
      icon: 'fas fa-question-circle',
      color: '#17a2b8',
      title: 'Help Request - Low Priority'
    },
    'help-request-medium': {
      icon: 'fas fa-question-circle',
      color: '#ffc107',
      title: 'Help Request - Medium Priority'
    },
    'help-request-high': {
      icon: 'fas fa-question-circle',
      color: '#fd7e14',
      title: 'Help Request - High Priority'
    },
    'help-request-critical': {
      icon: 'fas fa-question-circle',
      color: '#dc3545',
      title: 'Help Request - Critical'
    },
    'is-stuck': {
      icon: 'fas fa-hand-paper',
      color: '#6f42c1',
      title: 'Task is Stuck/Blocked'
    },
    'waiting-for-approval': {
      icon: 'fas fa-clock',
      color: '#fd7e14',
      title: 'Waiting for Approval'
    },
    'high-priority': {
      icon: 'fas fa-arrow-up',
      color: '#dc3545',
      title: 'High Priority'
    },
    'needs-review': {
      icon: 'fas fa-eye',
      color: '#17a2b8',
      title: 'Needs Review'
    }
  };

  // Method to get flag configuration
  getFlagConfig(flag: string): { icon: string, color: string, title: string } {
    return this.flagConfigs[flag] || {
      icon: 'fas fa-question',
      color: '#6c757d',
      title: 'Unknown Flag'
    };
  }



}
