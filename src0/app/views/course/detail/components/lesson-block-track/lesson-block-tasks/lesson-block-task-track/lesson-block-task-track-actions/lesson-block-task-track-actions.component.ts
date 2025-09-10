import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TamemService } from '@/app/core/service/tamem-service.service';

@Component({
  selector: 'detail-lesson-block-task-track-actions',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './lesson-block-task-track-actions.component.html',
  styleUrl: './lesson-block-task-track-actions.component.scss'
})
export class LessonBlockTaskTrackActionsComponent implements OnInit {

  // Input properties
  @Input() currentTask: any = null;
  @Input() selectedStatus: any = null;
  @Input() showDebugPanel: boolean = false; // For development

  // Output events
  @Output() actionSelected = new EventEmitter<string>();
  // @Output() actionSubmitted = new EventEmitter<any>(); 
  @Output() actionSubmitted = new EventEmitter<{actionData: any, submittedPhases: any}>();

  @Output() actionCancelled = new EventEmitter<void>();
   
  submittedPhases : any ; 

  // Inject TamemService
  private tamemService = inject(TamemService);

  // Component properties
  selectedAction: string | null = null;
  isSubmitting = false;
  isLoadingActions = false;
  isLoadingTeamMembers = false;
  actionsError: string | null = null;

  // Enhanced action form data
  actionForm: any = {
    // Assignment & User Management
    assignedToUserId: '',
    dueDate: '',

    // Time Tracking & Quality
    actualWorkingMinutes: null,
    qualityScore: null,

    // Help & Support
    helpType: '',
    helpLevel: 'medium',

    // Performance & Review
    performanceRating: '',
    rejectionReason: '',

    // Comments & Notes
    comment: '',

        // 🆕 ADD THESE TWO LINES
      canvaLink: '',
      googleDriveLink: '',



    // Additional Options
    sendNotification: false,
    markAsUrgent: false,
    requiresApproval: false,

    // Internal tracking
    actionType: '',
    targetStatus: '',
    timestamp: ''
  };

  // Available actions and team members
  availableActions: any[] = [];
  teamMembers: any[] = [];

  // Dynamic Field Visibility Configuration
  fieldVisibility: { [key: string]: boolean } = {};
  fieldRequirements: { [key: string]: boolean } = {};

  // Action-specific field configurations
  actionFieldConfigs: { [key: string]: any } = {
    'assign-task': {
      visible: ['assignedToUserId', 'dueDate', 'comment', 'sendNotification'],
      required: ['assignedToUserId']
    },
    'accept': {
      visible: ['comment', 'sendNotification'],
      required: ['comment']
    },
    'complete': {
      visible: ['actualWorkingMinutes', 'qualityScore', 'canvaLink', 'googleDriveLink', 'comment', 'sendNotification'],
      required: ['actualWorkingMinutes']
    },
    'request-help': {
      visible: ['helpType', 'helpLevel', 'comment', 'markAsUrgent', 'sendNotification'],
      required: ['helpType', 'helpLevel', 'comment']
    },
    'reassign': {
      visible: ['assignedToUserId', 'dueDate', 'comment', 'sendNotification'],
      required: ['assignedToUserId']
    },
    'approve': {
      visible: ['qualityScore', 'performanceRating', 'comment', 'sendNotification'],
      required: ['qualityScore']
    },
    'reject': {
      visible: ['rejectionReason', 'comment', 'markAsUrgent', 'sendNotification'],
      required: ['rejectionReason', 'comment']
    },
    'refuse': {
      visible: ['rejectionReason', 'comment', 'markAsUrgent', 'sendNotification'],
      required: ['rejectionReason', 'comment']
    },
    'reopen': {
      visible: ['comment', 'sendNotification'],
      required: ['comment']
    }
  };

  // Default field configuration (fallback)
  defaultFieldConfig = {
    visible: ['comment', 'sendNotification'],
    required: ['comment']
  };

  ngOnInit(): void {
    console.log('Actions component initialized with dynamic visibility');
    
    // Load data from APIs
    this.loadAvailableActions();
    this.loadTeamMembers();
    
    // Initialize form with current task data
    this.initializeFormData();
    
    // Initialize field visibility (all hidden by default)
    this.initializeFieldVisibility();
  }

  /**
   * Initialize form with current task data
   */
  initializeFormData(): void {
    if (this.currentTask) {
      this.actionForm = {
        ...this.actionForm,
        assignedToUserId: this.currentTask.assignedToUserId || '',
        actualWorkingMinutes: this.currentTask.actualWorkingMinutes || null,
        helpLevel: this.currentTask.helpLevel || 'medium',
        comment: ''
      };
    }
  }

  /**
   * Initialize field visibility (all hidden by default)
   */
  initializeFieldVisibility(): void {
    const allFields = [
      'assignedToUserId', 'dueDate', 'actualWorkingMinutes', 'qualityScore',
      'helpType', 'helpLevel', 'performanceRating', 'rejectionReason',
      'comment', 'sendNotification', 'markAsUrgent', 'requiresApproval',
      // 🆕 ADD THESE TWO LINES
    'canvaLink', 'googleDriveLink'
    ];

    // Hide all fields initially
    allFields.forEach(field => {
      this.fieldVisibility[field] = false;
      this.fieldRequirements[field] = false;
    });
  }

  /**
   * Configure field visibility based on selected action
   */
  configureFieldsForAction(actionKey: string): void {
    console.log('Configuring fields for action:', actionKey);
    
    // Get configuration for this action
    const config = this.actionFieldConfigs[actionKey] || this.defaultFieldConfig;
    
    // Reset all fields to hidden and not required
    this.initializeFieldVisibility();
    
    // Show visible fields
    config.visible.forEach((field: string) => {
      this.fieldVisibility[field] = true;
    });
    
    // Mark required fields
    (config.required || []).forEach((field: string) => {
      this.fieldRequirements[field] = true;
    });

    // Set defaults based on action
    this.setActionDefaults(actionKey);
    
    console.log('Field visibility configured:', this.fieldVisibility);
    console.log('Field requirements configured:', this.fieldRequirements);
  }

  /**
   * Check if field is visible
   */
  isFieldVisible(fieldName: string): boolean {
    return this.fieldVisibility[fieldName] || false;
  }

  /**
   * Check if field is required
   */
  isFieldRequired(fieldName: string): boolean {
    return this.fieldRequirements[fieldName] || false;
  }

  /**
   * Check if any of the provided fields are visible
   */
  hasVisibleFields(fieldNames: string[]): boolean {
    return fieldNames.some(field => this.isFieldVisible(field));
  }

  /**
   * Get list of visible fields
   */
  getVisibleFieldsList(): string[] {
    return Object.keys(this.fieldVisibility).filter(field => this.fieldVisibility[field]);
  }

  /**
   * Get list of required fields
   */
  getRequiredFieldsList(): string[] {
    return Object.keys(this.fieldRequirements).filter(field => this.fieldRequirements[field]);
  }

  /**
   * Get count of visible fields
   */
  getVisibleFieldsCount(): number {
    return this.getVisibleFieldsList().length;
  }

  /**
   * Load available actions from API
   */
  loadAvailableActions(): void {
    const taskId = this.currentTask?.id ;
    
    if (!taskId) {
      console.error('No block ID available for loading actions');
      this.actionsError = 'No block ID available';
      return;
    }

    this.isLoadingActions = true;
    this.actionsError = null;

    const currentStatus = this.selectedStatus?.status_key || this.currentTask?.status || 'in-progress';

    this.tamemService.getTaskActions(taskId).subscribe({
      next: (response) => {
        console.log('Block actions response:', response);
        
        if (response.success && response.data) {
          this.availableActions = response.data.available_actions || [];
          
          // Update field configurations from backend if available
          this.updateFieldConfigsFromBackend(response.data);
          
          console.log('Available actions loaded:', this.availableActions);
        } else {
          this.actionsError = 'Invalid response format from server';
          console.error('Invalid response format:', response);
        }
      },
      error: (error) => {
        console.error('Error loading block actions:', error);
        this.actionsError = 'Failed to load available actions';
        this.loadFallbackActions();
      },
      complete: () => {
        this.isLoadingActions = false;
      }
    });
  }

  /**
   * Update field configurations from backend response
   */
  updateFieldConfigsFromBackend(data: any): void {
    if (data.field_configurations) {
      // Merge backend configurations with local ones
      this.actionFieldConfigs = {
        ...this.actionFieldConfigs,
        ...data.field_configurations
      };
      
      console.log('Updated field configurations from backend:', this.actionFieldConfigs);
    }
  }

  /**
   * Load team members from API
   */
  loadTeamMembers(): void {
    this.isLoadingTeamMembers = true;

    this.tamemService.getTeamMembers().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.teamMembers = response.data.team_members || [];
        } else {
          this.loadFallbackTeamMembers();
        }
      },
      error: (error) => {
        console.error('Error loading team members:', error);
        this.loadFallbackTeamMembers();
      },
      complete: () => {
        this.isLoadingTeamMembers = false;
      }
    });
  }

  /**
   * Fallback actions if API fails
   */
  loadFallbackActions(): void {
    this.availableActions = [
      {
        key: 'complete',
        title: 'Mark as Complete',
        description: 'Mark task as completed and ready for review',
        icon_class: 'fas fa-check',
        type: 'member',
        target_status: 'review'
      },
      {
        key: 'request-help',
        title: 'Request Help',
        description: 'Ask for assistance with this task',
        icon_class: 'fas fa-question-circle',
        type: 'member',
        target_status: 'in-progress'
      },
      {
        key: 'reassign',
        title: 'Reassign Task',
        description: 'Assign to a different team member',
        icon_class: 'fas fa-exchange-alt',
        type: 'admin',
        target_status: 'in-progress'
      }
    ];
  }

  /**
   * Fallback team members if API fails
   */
  loadFallbackTeamMembers(): void {
    this.teamMembers = [
      { id: 1, name: 'Ahmed Hassan', role: 'Content Developer' },
      { id: 2, name: 'Sara Mohamed', role: 'Graphic Designer' },
      { id: 3, name: 'Omar Ali', role: 'Video Editor' },
      { id: 4, name: 'Fatima Ahmed', role: 'Project Manager' },
      { id: 5, name: 'Khaled Ibrahim', role: 'Senior Developer' }
    ];
  }

  /**
   * Select an action and configure fields
   */
  selectAction(actionKey: string): void {
    this.selectedAction = actionKey;
    this.resetActionForm();
    
    // Configure field visibility for this action
    this.configureFieldsForAction(actionKey);
    
    this.actionSelected.emit(actionKey);
    console.log('Selected action:', actionKey);
  }

  /**
   * Set action-specific defaults
   */
  setActionDefaults(actionKey: string): void {
    const actionData = this.getSelectedActionData();
    
    if (actionData) {
      this.actionForm.actionType = actionData.type;
      this.actionForm.targetStatus = actionData.target_status;
    }

    // Set specific defaults based on action
    switch (actionKey) {
      case 'complete':
        this.actionForm.actualWorkingMinutes = this.getEstimatedTime();
        this.actionForm.qualityScore = 8; // Default quality score
        break;
        
      case 'request-help':
        this.actionForm.helpLevel = 'medium';
        this.actionForm.helpType = '';
        break;
        
      case 'approve':
        this.actionForm.qualityScore = 8;
        this.actionForm.performanceRating = 'meets';
        break;
        
      case 'reject':
        this.actionForm.rejectionReason = '';
        break;

      case 'assign-task':
      case 'reassign':
        this.actionForm.assignedToUserId = '';
        break;
    }
    
    this.actionForm.timestamp = new Date().toISOString();
  }

  /**
   * Cancel selected action
   */
  cancelAction(): void {
    this.selectedAction = null;
    this.resetActionForm();
    this.initializeFieldVisibility(); // Hide all fields
    this.actionCancelled.emit();
  }

  /**
   * Reset action form data
   */
  resetActionForm(): void {
    this.actionForm = {
      // Assignment & User Management
      assignedToUserId: '',
      dueDate: '',

      // Time Tracking & Quality
      actualWorkingMinutes: null,
      qualityScore: null,

      // Help & Support
      helpType: '',
      helpLevel: 'medium',

      // Performance & Review
      performanceRating: '',
      rejectionReason: '',

      // Comments & Notes
      comment: '',

       // 🆕 ADD THESE TWO LINES
    canvaLink: '',
    googleDriveLink: '',


      // Additional Options
      sendNotification: false,
      markAsUrgent: false,
      requiresApproval: false,

      // Internal tracking
      actionType: '',
      targetStatus: '',
      timestamp: ''
    };
  }

  /**
   * Enhanced form validation - checks only visible and required fields
   */
  isActionFormValid(): boolean {
    if (!this.selectedAction) return false;

    // Check all required fields that are visible
    const requiredFields = this.getRequiredFieldsList();
    
    for (const field of requiredFields) {
      if (!this.isFieldVisible(field)) continue; // Skip hidden fields
      
      const value = this.actionForm[field];
      
      // Check if field has a value
      if (!value || value === '' || value === null || value === undefined) {
        console.log(`Validation failed for required field: ${field}`);
        return false;
      }
      
      // Additional validation based on field type
      switch (field) {
        case 'actualWorkingMinutes':
          if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
            return false;
          }
          break;
          
        case 'qualityScore':
          if (!Number.isInteger(Number(value)) || Number(value) < 1 || Number(value) > 10) {
            return false;
          }
          break;
          
        case 'comment':
          if (typeof value === 'string' && value.trim().length < 10) {
            return false;
          }
          break;
      }
    }

    return true;
  }

  /**
   * Check if specific field has validation error
   */
  hasValidationError(fieldName: string): boolean {
    if (!this.isFieldVisible(fieldName) || !this.isFieldRequired(fieldName)) {
      return false;
    }
    
    const value = this.actionForm[fieldName];
    
    switch (fieldName) {
      case 'assignedToUserId':
        return !value || value === '';
        
      case 'actualWorkingMinutes':
        return !value || !Number.isInteger(Number(value)) || Number(value) <= 0;
        
      case 'qualityScore':
        return !value || !Number.isInteger(Number(value)) || Number(value) < 1 || Number(value) > 10;
        
      case 'helpType':
      case 'rejectionReason':
        return !value || value === '';
        
         // 🆕 ADD THESE CASES
    case 'canvaLink':
      case 'googleDriveLink':
        return !value || value === '' || !this.isValidUrl(value);


      case 'comment':
        return !value || value.trim().length < 10;
        
      default:
        return !value || value === '';
    }
  }


  // 🆕 ADD THIS NEW HELPER METHOD
private isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}


  /**
   * Get validation message for a field
   */
  getValidationMessage(fieldName: string): string {
    const messages: { [key: string]: string } = {
      assignedToUserId: 'Please select a team member',
      actualWorkingMinutes: 'Please enter actual working time (greater than 0)',
      qualityScore: 'Please enter quality score (1-10)',
      helpType: 'Please select help type',
      helpLevel: 'Please select help level',
      rejectionReason: 'Please select rejection reason',
      comment: 'Please provide detailed comments (minimum 10 characters)',
      dueDate: 'Please select a due date',
      performanceRating: 'Please select performance rating',
       // 🆕 ADD THESE TWO LINES
    canvaLink: 'Please enter a valid Canva link (https://canva.com/...)',
    googleDriveLink: 'Please enter a valid Google Drive link (https://drive.google.com/...)'
    };
    
    return messages[fieldName] || 'This field is required';
  }

  /**
   * Submit the action with all form data
   */
  submitAction(): void {
    if (!this.isActionFormValid() || this.isSubmitting) return;

    this.isSubmitting = true;

    // Only include visible fields in the submission
    const visibleFields = this.getVisibleFieldsList();
    const filteredFormData: any = {};
    
    visibleFields.forEach(field => {
      filteredFormData[field] = this.actionForm[field];
    });

    const actionData = {
      // Core action data
      taskId: this.currentTask?.id,
    //  blockId: this.currentTask?.blockId || this.currentTask?.id,
    //  phaseId: this.currentTask?.phaseId,
      action: this.selectedAction,
      currentStatus: this.currentTask?.status,
      targetStatus: this.getSelectedActionData()?.target_status,
      actionType: this.getSelectedActionData()?.type,
      
      // Only visible form data
      formData: filteredFormData,
      
      // Field configuration metadata
      visibleFields: visibleFields,
      requiredFields: this.getRequiredFieldsList(),
      
      // Metadata
      // userRole: this.userRole,
      timestamp: new Date().toISOString()
    };

    console.log('Submitting action with dynamic fields:', actionData);

    // Emit the action to parent component
    // this.actionSubmitted.emit(actionData,this.submittedPhases);



    // API call to submit action
    this.submitToBackend(actionData);

    // Reset form after submission
    setTimeout(() => {
      this.isSubmitting = false;
      this.selectedAction = null;
      this.resetActionForm();
      this.initializeFieldVisibility();
    }, 500);
  }

  /**
   * Submit action to backend API
   */
  submitToBackend(actionData: any): void {
    const taskId =   this.currentTask?.id;
    
    if (!taskId) {
      console.error('No block ID for API submission');
      return;
    }

    this.tamemService.submitTaskAction(taskId, actionData).subscribe({
      next: (response) => {
        console.log('Action submitted successfully:', response);
        //#ouptut
        this.submittedPhases = response.data.phases  ;  // send the api return of new phases after save to the parent 
     //   console.log('actions comp => submittedPhases:',   this.submittedPhases);
     this.actionSubmitted.emit({
      actionData: actionData,
      submittedPhases: this.submittedPhases
    });
    
      },
      error: (error) => {
        console.error('Error submitting action:', error);
      }
    });
  }

  /**
   * Get selected action data
   */
  getSelectedActionData(): any {
    return this.availableActions.find(action => action.key === this.selectedAction);
  }

  /**
   * Get action title by action key
   */
  getActionTitle(actionKey: string): string {
    const action = this.availableActions.find(a => a.key === actionKey);
    return action?.title || actionKey.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Check if action is selected
   */
  isActionSelected(actionKey: string): boolean {
    return this.selectedAction === actionKey;
  }

  /**
   * Get team member name by ID
   */
  getTeamMemberName(userId: string | number): string {
    const member = this.teamMembers.find(m => m.id == userId);
    return member ? member.name : 'Unknown User';
  }

  /**
   * Get estimated time for current task
   */
  getEstimatedTime(): number {
    return this.currentTask?.estimatedWorkingMinutes || 120;
  }

  /**
   * Get action icon class (support both formats)
   */
  getActionIconClass(action: any): string {
    return action.icon_class || action.iconClass || 'fas fa-cog';
  }

  /**
   * Get action target status (support both formats)
   */
  getActionTargetStatus(action: any): string {
    return action.target_status || action.targetStatus || 'Unknown';
  }

  /**
   * Toggle field visibility manually (for testing/debugging)
   */
  toggleFieldVisibility(fieldName: string): void {
    this.fieldVisibility[fieldName] = !this.fieldVisibility[fieldName];
    console.log(`Toggled ${fieldName} visibility:`, this.fieldVisibility[fieldName]);
  }

  /**
   * Add new field configuration for an action
   */
  addFieldConfiguration(actionKey: string, config: { visible: string[], required: string[] }): void {
    this.actionFieldConfigs[actionKey] = config;
    console.log(`Added field configuration for ${actionKey}:`, config);
  }

  /**
   * Get field configuration for current action
   */
  getCurrentFieldConfig(): any {
    if (!this.selectedAction) return null;
    return this.actionFieldConfigs[this.selectedAction] || this.defaultFieldConfig;
  }

  /**
   * Validate field configuration (for debugging)
   */
  validateFieldConfiguration(): boolean {
    const visibleFields = this.getVisibleFieldsList();
    const requiredFields = this.getRequiredFieldsList();
    
    // Check if all required fields are visible
    const allRequiredVisible = requiredFields.every(field => visibleFields.includes(field));
    
    if (!allRequiredVisible) {
      console.warn('Some required fields are not visible:', {
        visible: visibleFields,
        required: requiredFields
      });
    }
    
    return allRequiredVisible;
  }
}