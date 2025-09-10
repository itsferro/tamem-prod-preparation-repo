import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TamemService } from '@/app/core/service/tamem-service.service';

@Component({
  selector: 'detail-lesson-block-task-track-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-block-task-track-history.component.html',
  styleUrl: './lesson-block-task-track-history.component.scss'
})
export class LessonBlockTaskTrackHistoryComponent implements OnInit {

  // Input properties
  @Input() taskLogs: any[] = [];
  @Input() taskId: number | null = null;

  // Inject TamemService
  private tamemService = inject(TamemService);

  // Component properties
  logEntries: any[] = [];
  isLoadingLogs = false;
  logsError: string | null = null;

  ngOnInit(): void {
 
    
    // Load log entries from API
    this.loadLogHistory();
  }

  /**
   * Load log history from API
   */
  loadLogHistory(): void {
    // Use blockId if provided, otherwise try to get from currentTask
    const taskId = this.taskId  ; 
    
    if (!taskId) {
      console.error('No task ID or block ID available for loading logs');
      this.logsError = 'No task ID available';
      return;
    }

    this.isLoadingLogs = true;
    this.logsError = null;

    this.tamemService.getTaskLogHistory(taskId).subscribe({
      next: (response) => {
        console.log('Block log history response:', response);
        
        if (response.success && response.data) {
          this.logEntries = response.data.log_entries || [];
          
          console.log('Log entries loaded:', this.logEntries);
        } else {
          this.logsError = 'Invalid response format from server';
          console.error('Invalid response format:', response);
        }
      },
      error: (error) => {
        console.error('Error loading block log history:', error);
        this.logsError = 'Failed to load log history. Please try again.';
      },
      complete: () => {
        this.isLoadingLogs = false;
      }
    });
  }

  /**
   * Get icon class for log entry
   */
  getLogIconClass(logEntry: any): string {
    return logEntry.icon_class || logEntry.iconClass || 'fas fa-info-circle';
  }

  /**
   * Check if log entry has status change
   */
  hasStatusChange(logEntry: any): boolean {
    const oldStatus = logEntry.old_status || logEntry.oldStatus;
    const newStatus = logEntry.new_status || logEntry.newStatus;
    return oldStatus && newStatus && oldStatus !== '-';
  }

  /**
   * Format log time for display
   */
  formatLogTime(timeString: string): string {
    if (!timeString) return 'Unknown time';
    
    try {
      const date = new Date(timeString);
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
    } catch {
      return timeString; // Return original if parsing fails
    }
  }
}