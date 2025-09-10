import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TamemService } from '@/app/core/service/tamem-service.service';

@Component({
  selector: 'app-block-action-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './block-action-tracking.component.html',
  styleUrl: './block-action-tracking.component.scss'
})
export class BlockActionTrackingComponent implements OnInit {
  blockId: string | number = '';
  blockTitle: string = '';
  actions: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Options for process parts
  processPartOptions = [
    { value: 'init', label: 'Initial Setup' },
    { value: 'content', label: 'Content Creation' },
    { value: 'story-board', label: 'Storyboard Design' },
    { value: 'external-images', label: 'External Images' },
    { value: 'createstudio', label: 'CreateStudio Design' },
    { value: 'finishing', label: 'Final Review' }
  ];

  // Options for status
  statusOptions = [
    { value: 'on-going', label: 'In Progress' },
    { value: 'having-issues', label: 'Having Issues' },
    { value: 'need-help', label: 'Need Assistance' },
    { value: 'stuck', label: 'Blocked' },
    { value: 'done', label: 'Completed' }
  ];

  // New action form model
  newAction: any = {
    action: '',
    timestamp: null,
    user: '',
    notes: '',
    processPart: '',
    status: ''
  };

  // Inject services
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tamemService = inject(TamemService);

  ngOnInit(): void {
    // Get the block ID from the route parameters
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.blockId = id;
        this.loadBlockData();
      } else {
        this.error = 'No block ID provided';
        this.loading = false;
      }
    });
  }

  // Load block data from the service
  loadBlockData(): void {
    this.loading = true;
    
    // In a real app, use the service to get the block data
    this.tamemService.getLessonBlock(this.blockId).subscribe({
      next: (response) => {
        this.blockTitle = response.title;
        
        // Initialize actions from the response or create a default one
        if (response.actions && (typeof response.actions === 'string' || Array.isArray(response.actions))) {
          try {
            this.actions = typeof response.actions === 'string' 
              ? JSON.parse(response.actions) 
              : response.actions;
          } catch (e) {
            console.error('Error parsing actions:', e);
            this.initializeDefaultAction();
          }
        } else {
          this.initializeDefaultAction();
        }
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading block:', error);
        this.error = 'Failed to load block data. Please try again.';
        this.loading = false;
      }
    });
  }

  // Initialize with a default action if needed
  private initializeDefaultAction(): void {
    if (!this.actions || this.actions.length === 0) {
      this.addSystemAction('init', 'init', 'on-going', 'Block creation initialized');
    }
  }

  // Add a system-generated action
  private addSystemAction(action: string, processPart: string, status: string, notes: string): void {
    const systemAction = {
      action: action,
      timestamp: new Date(),
      user: 'System',
      notes: notes,
      processPart: processPart,
      status: status
    };
    
    this.actions.unshift(systemAction); // Add to the beginning of the array
  }

  // Add a new user action
  addNewAction(): void {
    if (!this.newAction.processPart || !this.newAction.status) {
      return; // Validation - require process part and status
    }

    const userAction = {
      action: 'update', // Default action type for user updates
      timestamp: new Date(),
      user: 'Current User', // In a real app, get the current user's name
      notes: this.newAction.notes || '',
      processPart: this.newAction.processPart,
      status: this.newAction.status
    };
    
    this.actions.unshift(userAction); // Add to the beginning of the array
    
    // Reset the form for a new action
    this.newAction = {
      action: '',
      timestamp: null,
      user: '',
      notes: '',
      processPart: '',
      status: ''
    };
  }

  // Get label for action type
  getActionLabel(action: string): string {
    const actionMap: {[key: string]: string} = {
      'init': 'Create',
      'update': 'Update',
      'review': 'Review',
      'approve': 'Approve',
      'reject': 'Reject'
    };
    
    return actionMap[action] || action;
  }

  // Get label for process part
  getProcessPartLabel(processPart: string): string {
    const part = this.processPartOptions.find(p => p.value === processPart);
    return part ? part.label : processPart;
  }

  // Get label for status
  getStatusLabel(status: string): string {
    const statusObj = this.statusOptions.find(s => s.value === status);
    return statusObj ? statusObj.label : status;
  }

  // Get CSS class for status
  getStatusClass(status: string): string {
    const classMap: {[key: string]: string} = {
      'on-going': 'status-ongoing',
      'having-issues': 'status-issues',
      'need-help': 'status-help',
      'stuck': 'status-stuck',
      'done': 'status-done'
    };
    
    return classMap[status] || '';
  }

  // Save actions and go back
  saveActions(): void {
    this.loading = true;
    
    const updateData = {
      id: this.blockId,
      actions: JSON.stringify(this.actions)
    };
    
    // In a real app, update the block with new actions
    this.tamemService.updateLessonBlockActions(updateData).subscribe({
      next: (response) => {
        this.loading = false;
        this.goBack();
      },
      error: (error) => {
        console.error('Error saving actions:', error);
        this.error = 'Failed to save actions. Please try again.';
        this.loading = false;
      }
    });
  }

  // Navigate back to the block details
  goBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
} 