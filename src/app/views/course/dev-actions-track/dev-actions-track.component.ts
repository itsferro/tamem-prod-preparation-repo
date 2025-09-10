import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components';
import { FooterComponent } from '@/app/components/footers/footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { NotificationService } from '@/app/core/service/notification.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
 
  

@Component({
  selector: 'app-dev-actions-track',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AppMenuComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './dev-actions-track.component.html',
  styleUrl: './dev-actions-track.component.scss'
})
export class DevActionsTrackComponent   implements OnInit, OnDestroy {
    blockId: string | number = '';
    lessonBlock: any = null;
    actions: any[] = [];
    loading: boolean = true;
    error: string | null = null;
    showAddActionModal: boolean = false; // Flag to control modal visibility
    private escKeyListener: any;
  
    // Options for process parts
    processPartOptions = [
      { value: 'content', label: 'Content' },
      { value: 'story-board', label: 'Storyboard' },
      { value: 'external-images', label: 'External Images' },
      { value: 'createstudio', label: 'CreateStudio' },
      { value: 'finishing', label: 'Final Finish' }
    ];
  
    // Options for status
    statusOptions = [
      { value: 'on-going', label: 'In Progress' },
      { value: 'having-issues', label: 'Having Issues' },
      { value: 'need-help', label: 'Need Help' },
      { value: 'stuck', label: 'Stuck' },
      { value: 'done', label: 'Done' }
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
        this.route.paramMap.subscribe(params => {
         const id = params.get('lessonBlockId');
         if (id) {
           this.blockId = id;
           this.loadBlockData();
         } else {
           this.error = 'No block ID provided';
           this.loading = false;
         }
        });
        
        // Add keyboard event listener for Escape key
        this.escKeyListener = (event: KeyboardEvent) => {
          if (event.key === 'Escape' && this.showAddActionModal) {
            this.closeAddActionModal();
          }
        };
        document.addEventListener('keydown', this.escKeyListener);
    }
    
    ngOnDestroy(): void {
      // Remove event listener when component is destroyed
      if (this.escKeyListener) {
        document.removeEventListener('keydown', this.escKeyListener);
      }
      
      // Ensure body overflow is restored if component is destroyed while modal is open
      document.body.style.overflow = '';
    }
  
    // Load block data from the service
    loadBlockData(): void {
      this.loading = true;
      
      // In a real app, use the service to get the block data
      this.tamemService.getLessonBlock(this.blockId).subscribe({
        next: (response) => {
          this.lessonBlock = response;
          
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
  
    // Open the add action modal
    openAddActionModal(): void {
      // Reset the form for a new action
      this.newAction = {
        action: '',
        timestamp: null,
        user: '',
        notes: '',
        processPart: '',
        status: ''
      };
      this.showAddActionModal = true;
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    // Close the add action modal
    closeAddActionModal(): void {
      this.showAddActionModal = false;
      // Restore scrolling
      document.body.style.overflow = '';
    }
    
    // Add a new action from the modal and close it
    addNewActionFromModal(): void {
      this.addNewAction();
      this.closeAddActionModal();
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
  
    // Navigate back to the block details
    goBack(): void {
      this.router.navigate(['../../'], { relativeTo: this.route });
    }

    // Navigate to previous block
    goToPreviousBlock(): void {
      if (this.blockId) {
        const prevBlockId = Number(this.blockId) - 1;
        if (prevBlockId > 0) {
            this.router.navigate(['/course/block-actions', prevBlockId]);
          // Save current actions before navigating
        //   this.saveActions(false).subscribe({
        //     next: () => {
        //       this.router.navigate(['/course/block-actions', prevBlockId]);
        //     },
        //     error: () => {
        //       this.router.navigate(['/course/block-actions', prevBlockId]);
        //     }
        //   });
        }
      }
    }
    
    // Navigate to next block
    goToNextBlock(): void {
      if (this.blockId) {
        const nextBlockId = Number(this.blockId) + 1;

        this.router.navigate(['/course/block-actions', nextBlockId]);
        // Save current actions before navigating
        // this.saveActions(false).subscribe({
        //   next: () => {
        //     this.router.navigate(['/course/block-actions', nextBlockId]);
        //   },
        //   error: () => {
        //     this.router.navigate(['/course/block-actions', nextBlockId]);
        //   }
        // });
      }
    }
    
    // Save actions with option to skip navigation
    saveActions(showNotification: boolean = true): Observable<any> {
      this.loading = showNotification;
      
      const updateData = {
        id: this.blockId,
        actions: JSON.stringify(this.actions)
      };
      
      return this.tamemService.updateLessonBlockActions(updateData).pipe(
        tap((response) => {
          this.loading = false;
          if (showNotification) {
            this.goBack();
          }
        }),
        catchError((error) => {
          console.error('Error saving actions:', error);
          this.error = 'Failed to save actions. Please try again.';
          this.loading = false;
          return throwError(() => error);
        })
      );
    }

    // Helper method to convert to number (for template)
    Number(value: any): number {
      return Number(value);
    }
  } 