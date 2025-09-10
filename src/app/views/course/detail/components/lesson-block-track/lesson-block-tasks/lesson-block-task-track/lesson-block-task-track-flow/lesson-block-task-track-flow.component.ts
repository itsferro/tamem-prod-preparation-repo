import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TamemService } from '@/app/core/service/tamem-service.service';

@Component({
  selector: 'detail-lesson-block-task-track-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-block-task-track-flow.component.html',
  styleUrl: './lesson-block-task-track-flow.component.scss'
})
export class LessonBlockTaskTrackFlowComponent implements OnInit {

  // Input properties
  @Input() currentTask: any = null;
  @Input() taskId: number | null = null;

  // Inject TamemService
  private tamemService = inject(TamemService);

  // Component properties for status flow
  statusFlow: any[] = [];
  isLoadingStatusFlow = false;
  statusFlowError: string | null = null;
  currentTaskStatus: string = '';
  selectedStatus: any = null;

  ngOnInit(): void {
   
     
    
    // Load status flow from API
    this.loadBlockStatusFlow();
  }

  /**
   * Load block status flow from API
   */
  loadBlockStatusFlow(): void {
    // Use blockId if provided, otherwise try to get from currentTask
    const taskId = this.taskId  ;
    
    if (!taskId) {
      console.error('No task ID or block ID available');
      this.statusFlowError = 'No task ID available';
      return;
    }

    this.isLoadingStatusFlow = true;
    this.statusFlowError = null;

    this.tamemService.getTaskStatusFlow(taskId).subscribe({
      next: (response) => {
        console.log('Block status flow response:', response);
        
        if (response.success && response.data) {
          this.statusFlow = response.data.status_flow || [];
          this.currentTaskStatus = response.data.current_task_status || '';
          
          console.log('Status flow loaded:', this.statusFlow);
          console.log('Current task status:', this.currentTaskStatus);
        } else {
          this.statusFlowError = 'Invalid response format from server';
          console.error('Invalid response format:', response);
        }
      },
      error: (error) => {
        console.error('Error loading block status flow:', error);
        this.statusFlowError = 'Failed to load status flow. Please try again.';
      },
      complete: () => {
        this.isLoadingStatusFlow = false;
      }
    });
  }

  /**
   * Get CSS class for status node based on current status
   */
  getStatusNodeClass(status: any): string {
    const baseClass = 'status-node';
    
    // Find current status index
    const currentIndex = this.statusFlow.findIndex(s => s.status_key === this.currentTaskStatus);
    const statusIndex = this.statusFlow.findIndex(s => s.id === status.id);
    
    if (statusIndex < currentIndex) {
      return `${baseClass} status-completed`;
    } else if (statusIndex === currentIndex) {
      return `${baseClass} status-current`;
    } else {
      return `${baseClass} status-future`;
    }
  }

  /**
   * Select a status (for future use)
   */
  selectStatus(status: any): void {
    this.selectedStatus = status;
    console.log('Selected status:', status);
  }

  /**
   * Check if status is current
   */
  isCurrentStatus(status: any): boolean {
    return status.status_key === this.currentTaskStatus;
  }

  /**
   * Check if should show arrow after status
   */
  shouldShowArrow(index: number): boolean {
    return index < this.statusFlow.length - 1;
  }
}