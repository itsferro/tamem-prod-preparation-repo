import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LessonBlockTaskTrackComponent } from '../lesson-block-track/lesson-block-tasks/lesson-block-task-track/lesson-block-task-track.component';
import { TamemService } from '@/app/core/service/tamem-service.service';

@Component({
  selector: 'detail-lesson-block-track-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './lesson-block-track-form.component.html',
  styleUrl: './lesson-block-track-form.component.scss'
})
export class LessonBlockTrackFormComponent implements OnInit {

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
    // console.log('Modal initialized with:');
    // console.log('Block:', this.editBlock);
    // console.log('Phases:', this.blockPhases);
    // console.log('Summary:', this.phaseSummary);

    console.log('blockPhases:', this.blockPhases);

    // Convert blockPhases to blockTasks format expected by template
    this.initializeBlockTasks();
  }

  /**
   * Initialize block tasks from phases data
   */
  private initializeBlockTasks(): void {
    if (this.blockPhases && this.blockPhases.length > 0) {
      this.blockTasks = this.blockPhases.map(phase => ({
        id: phase.id,
        phaseId: phase.phase_id,
        phaseName: phase.name,
        phaseShortName: phase.short_name,
        phaseIconClass: phase.icon_class,
        status: phase.status,
        estimatedPoints: phase.estimated_points,
        estimatedWorkingMinutes: phase.estimated_working_minutes,
        actualWorkingMinutes: phase.actual_working_minutes,
        assignedToUserName: phase.assigned_user_name || 'Unassigned',
        lastUpdatedByUserName: phase.last_updated_by || 'System',
        lastUpdatedAt: phase.last_updated_at,
        isStuck: phase.is_stuck || false
      }));
    } else {
      this.blockTasks = [];
    }

    console.log('Initialized block tasks:', this.blockTasks);
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


  openTaskStatusLog(task: any): void {
    const modalRef = this.modalService.open(LessonBlockTaskTrackComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      windowClass: 'task-log-modal'
    });

    // Pass all task data
  //  modalRef.componentInstance.blockId = 133 ; 
     modalRef.componentInstance.currentTask = { ...task };
    //  modalRef.componentInstance.taskLogs = [...sampleLogs];
    modalRef.componentInstance.userRole = 'member';


     // ✅ Update to handle the new event structure
  modalRef.componentInstance.actionPerformed.subscribe((data: any) => {
    console.log('Action performed via EventEmitter:', data);
    this.blockPhases = data.submittedPhases; 
    this.initializeBlockTasks();
    this.cdr.detectChanges() ; 
     
  });



    // modalRef.result.then(
    //   (result) => {
    //     alert('submitted');
        
    //   },
    //   (dismissed) => { alert('dismissed'); }
    // );


  }






  generateBlockTasks(blockId: any) {

    this.tamemService.postBlockTasks(blockId).subscribe({
      next: (response) => {
        // Handle successful creation
        this.blockPhases = response.data.phases;
        this.initializeBlockTasks();
        this.cdr.detectChanges();
        //  console.log('blockPhases2:', this.blockPhases);

      },
      error: (error) => {
        // Handle error
        // this.handleErrorResponse(error);
      }
    });


  }

  deleteBlockTasks(blockId: any) {

    this.tamemService.deleteBlockTasks(blockId).subscribe({
      next: (response) => {
        // Handle successful creation
        this.blockPhases = response.data.phases;
        this.initializeBlockTasks();
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
  


}