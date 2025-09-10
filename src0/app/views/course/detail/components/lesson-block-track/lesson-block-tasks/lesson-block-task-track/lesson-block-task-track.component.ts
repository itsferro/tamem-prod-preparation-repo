import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { LessonBlockTaskTrackFlowComponent } from './lesson-block-task-track-flow/lesson-block-task-track-flow.component';
import { LessonBlockTaskTrackHistoryComponent } from './lesson-block-task-track-history/lesson-block-task-track-history.component';
import { LessonBlockTaskTrackActionsComponent } from './lesson-block-task-track-actions/lesson-block-task-track-actions.component';

@Component({
  selector: 'detail-lesson-block-task-track',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,  LessonBlockTaskTrackFlowComponent, LessonBlockTaskTrackHistoryComponent, LessonBlockTaskTrackActionsComponent],
  templateUrl: './lesson-block-task-track.component.html',
  styleUrl: './lesson-block-task-track.component.scss'
})
export class LessonBlockTaskTrackComponent implements OnInit {


   @Input() currentTask: any = null;
   @Output() actionPerformed = new EventEmitter<any>();

   @Input() canvaLink: any = null;
   @Input() googleDriveLink: any = null;
   @Input() storyBoardLink: any = null;
   @Input() hasStoryBoard: any = null;

   @Input() courseName: any = null;
   @Input() lessonName: any = null;
   @Input() blockName: any = null;

 

  // Inject services
  private tamemService = inject(TamemService);
  public modal = inject(NgbActiveModal);

  // Component properties for actions
  selectedAction: string | null = null;
  selectedStatus: any = null;
  isSubmitting = false;

 
  
  ngOnInit(): void {

   console.log( 'cuurrent task => : ' +JSON.stringify(this.currentTask)) ; 

  }

  /**
   * Handle modal cancellation
   */
  onCancel(): void {
    // Optional: Add confirmation if there are unsaved changes
    if (this.selectedAction && !this.isSubmitting) {
      const confirmClose = confirm('You have an action in progress. Are you sure you want to close?');
      if (!confirmClose) {
        return;
      }
    }
    
    this.modal.dismiss('cancel');
  }

  /**
   * Handle action selected from child component
   */
  onActionSelected(actionKey: string): void {
    this.selectedAction = actionKey;
    //console.log('Action selected in parent:', actionKey);
  }

  /**
   * Handle action submitted from child component
   */
  onActionSubmitted(event: {actionData: any, submittedPhases: any}): void {
    // Destructure the event object
    const { actionData, submittedPhases } = event;
    
   // console.log('Action Data:', actionData);
   // console.log('Submitted Phases:', submittedPhases);

   // console.log('Action submitted in parent:', actionData);
    
    this.isSubmitting = true;
   //   console.log('log comp => submittedPhases:',   submittedPhases);
    // Emit the action to parent component
    // this.actionPerformed.emit(actionData);
    this.actionPerformed.emit({
      actionData: actionData,
      submittedPhases: submittedPhases,
      success: true
    });
    
    // Close modal after action
    setTimeout(() => {
      this.modal.close({
        success: true,
        action: actionData.action,
        data: actionData
      });
    }, 500);
  }

  /**
   * Handle action cancelled from child component
   */
  onActionCancelled(): void {
    this.selectedAction = null;
   // console.log('Action cancelled in parent');
  }


 

 




 
}