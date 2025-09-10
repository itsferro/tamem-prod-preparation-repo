import { ChangeDetectorRef, Component, inject, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { ActivatedRoute } from '@angular/router';
import { DevelopmentHtmlViewerComponent } from '../../../../react-manager/html-viewer.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'block-managment-content-insight-frames',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule,DevelopmentHtmlViewerComponent],
  templateUrl: './frames.component.html',
  styleUrl: './frames.component.scss'
})
export class BlockManagmentContentInsightFramesComponent implements OnInit, OnDestroy {

  @Input() insightData: any;
  @Output() framesGenerated = new EventEmitter<any>();
  private modalService = inject(NgbModal);
  
  insightFrames: any[] = [];
  keySceneTypes: any[] = [];
  scenes: any[] = [];
  storyboardFrames: any[] = [];

  selectedFrame: any | null = null;
  isDragging = false;

  // Loading and generation states
  isLoadingFrames: boolean = false;
  isGeneratingFrames: boolean = false;
  generationError: string | null = null;
  generationStep: number = 0;
  generationProgress: number = 0;

  // Save states
  isSaving: boolean = false;
  saveError: string | null = null;
  lastSaveTime: Date | null = null;

  // Component Preview Properties
  showComponentPreview: boolean = false;
  previewComponentCode: string = '';
  previewFrameTitle: string = '';
  isComponentLoading: boolean = false;
  componentError: string | null = null;

  private tamemService = inject(TamemService);

  constructor() {}

  ngOnInit(): void {
    if (this.insightData) {
      this.insightFrames = this.insightData.frames || [];
      this.keySceneTypes = this.insightData.keySceneTypes || [];
      
      // Set storyboardFrames to the frames from the API
      this.storyboardFrames = [...this.insightFrames];
      
      // Set scenes to keySceneTypes for compatibility
      this.scenes = [...this.keySceneTypes];

      console.log('Frames component initialized with data:', {
        frames: this.insightFrames.length,
        keySceneTypes: this.keySceneTypes.length
      });
    }
  }

  /**
   * Method called by parent component to set loading state
   */
  setFramesLoading(isLoading: boolean): void {
    this.isLoadingFrames = isLoading;
  }

  // ============================================
  // FRAME GENERATION METHODS
  // ============================================

  /**
   * Generate frames for the current insight using AI
   */
  generateFramesForCurrentInsight(): void {
    if (!this.insightData?.insight_id || !this.insightData?.block_id) {
      this.showNotification('معرف الفكرة أو الكتلة غير موجود', 'error');
      return;
    }

    if (this.isGeneratingFrames) {
      this.showNotification('عملية الإنشاء جارية بالفعل', 'warning');
      return;
    }

    this.startFrameGeneration();
  }

  /**
   * Regenerate frames (clear existing and generate new ones)
   */
  regenerateFrames(): void {
    if (this.storyboardFrames.length > 0) {
      const confirmRegenerate = confirm('سيتم حذف جميع الإطارات الحالية وإنشاء إطارات جديدة. هل أنت متأكد؟');
      if (!confirmRegenerate) return;
    }

    this.startFrameGeneration();
  }

  /**
   * Start the frame generation process
   */
  private startFrameGeneration(): void {
    this.isGeneratingFrames = true;
    this.generationError = null;
    this.generationStep = 0;
    this.generationProgress = 0;

    // Simulate generation steps
    this.simulateGenerationProgress();

    console.log('Starting frame generation for insight:', this.insightData.insight_id);

    this.tamemService.postInsightFrames(this.insightData.insight_id, this.insightData.block_id).subscribe({
      next: (response) => {
        this.handleGenerationSuccess(response);
      },
      error: (error) => {
        this.handleGenerationError(error);
      }
    });
  }

  /**
   * Simulate generation progress for better UX
   */
  private simulateGenerationProgress(): void {
    // Step 1: Content Analysis
    setTimeout(() => {
      this.generationStep = 1;
      this.generationProgress = 25;
    }, 1000);

    // Step 2: Idea Generation
    setTimeout(() => {
      this.generationStep = 2;
      this.generationProgress = 60;
    }, 3000);

    // Step 3: Frame Creation
    setTimeout(() => {
      this.generationStep = 3;
      this.generationProgress = 85;
    }, 5000);
  }

  /**
   * Handle successful frame generation
   */
  private handleGenerationSuccess(response: any): void {
    this.isGeneratingFrames = false;
    this.generationStep = 3;
    this.generationProgress = 100;
    this.generationError = null;

    console.log('Frame generation successful:', response);

    if (response.success && response.data && response.data.frames) {
      // Update the frames data
      this.storyboardFrames = [...response.data.frames];
      this.insightFrames = [...response.data.frames];
      
      // Update key scene types if provided
      if (response.data.keySceneTypes) {
        this.keySceneTypes = [...response.data.keySceneTypes];
        this.scenes = [...response.data.keySceneTypes];
      }

      // Update the insight data
      this.insightData = { ...this.insightData, ...response.data };

      const message = response.message || `تم إنشاء ${this.storyboardFrames.length} إطار بنجاح!`;
      this.showNotification(message, 'success');

      // Emit event to parent component
      this.framesGenerated.emit(response.data);

      // Add generation success animation
      this.addGenerationSuccessAnimation();

    } else {
      this.generationError = response.message || 'فشل في إنشاء الإطارات';
    }
  }

  /**
   * Handle frame generation error
   */
  private handleGenerationError(error: any): void {
    this.isGeneratingFrames = false;
    this.generationStep = 0;
    this.generationProgress = 0;
    this.generationError = error.message || 'حدث خطأ أثناء إنشاء الإطارات';
    
    console.error('Error generating frames:', error);
    this.showNotification(this.generationError || 'حدث خطأ أثناء إنشاء الإطارات', 'error');
  }

  /**
   * Retry frame generation after error
   */
  retryGeneration(): void {
    this.generationError = null;
    this.generateFramesForCurrentInsight();
  }

  /**
   * Add success animation after generation
   */
  private addGenerationSuccessAnimation(): void {
    setTimeout(() => {
      this.storyboardFrames.forEach((frame, index) => {
        setTimeout(() => {
          const frameElement = document.querySelector(`[data-frame-id="${frame.id}"]`);
          if (frameElement) {
            frameElement.classList.add('generation-success');
            setTimeout(() => {
              frameElement.classList.remove('generation-success');
            }, 800);
          }
        }, index * 150);
      });
    }, 500);
  }

  /**
   * Create a manual frame (fallback option)
   */
  createManualFrame(): void {
    if (this.keySceneTypes.length === 0) {
      this.showNotification('لا توجد أنواع مشاهد متاحة', 'error');
      return;
    }

    // Use the first scene type as default
    const defaultSceneType = this.keySceneTypes[0];
    this.addNewFrameForScene(defaultSceneType);
  }

  // ============================================
  // LOADING STATE MANAGEMENT
  // ============================================

  /**
   * Set loading state for frames
   */
  setLoadingState(isLoading: boolean): void {
    this.isLoadingFrames = isLoading;
  }

  // ============================================
  // ADD NEW FRAME FUNCTIONALITY
  // ============================================

  /**
   * Add a new frame for a specific scene type
   * @param sceneType The key scene type to add a frame for
   */
  addNewFrameForScene(sceneType: any): void {
    console.log('Adding new frame for scene type:', sceneType.scene_type);
    
    // Generate new frame ID (max existing ID + 1)
    const maxId = this.storyboardFrames.length > 0 ? 
      Math.max(...this.storyboardFrames.map(f => f.id)) : 0;
    const newFrameId = maxId + 1;

    // Create new frame with default values
    const newFrame = this.createDefaultFrame(newFrameId, sceneType);
    
    // Find the best position to insert the new frame
    const insertIndex = this.findBestInsertPosition(sceneType.id);
    
    // Insert the new frame at the calculated position
    this.storyboardFrames.splice(insertIndex, 0, newFrame);
    
    // Reorder frame IDs to maintain sequence
    this.reorderFrameIds();
    
    // Add visual feedback
    this.addNewFrameAnimation(newFrame.id);
    
    // Auto-open the new frame for editing
    setTimeout(() => {
      this.showNotification(`تم إنشاء إطار جديد في مشهد: ${sceneType.scene_type}`, 'success');
    }, 300);
    
    console.log('New frame added:', newFrame);
  }

  /**
   * Create a default frame object for a specific scene type
   * @param frameId The ID for the new frame
   * @param sceneType The scene type this frame belongs to
   * @returns New frame object
   */
  private createDefaultFrame(frameId: number, sceneType: any): any {
    return {
      id: frameId,
      sceneId: sceneType.id,
      title: `إطار جديد - ${sceneType.scene_type}`,
      description: `وصف الإطار في مشهد ${sceneType.scene_type}. يرجى تعديل هذا النص ليناسب محتوى الإطار.`,
      voiceOver: `النص الصوتي للإطار الجديد في مشهد ${sceneType.scene_type}. يرجى كتابة النص المناسب للطلاب.`,
      imageUrl: `assets/images/frame${frameId}.jpg`,
      notes: 'ملاحظات الإنتاج - يرجى إضافة التوجيهات اللازمة',
      extraReq: 'متطلبات إضافية - يرجى تحديد أي متطلبات خاصة',
      duration: '00:00:15',
      actions: {
        camera: true,
        download: true,
        share: true,
        delete: true
      }
    };
  }

  /**
   * Find the best position to insert a new frame for a specific scene
   * @param sceneId The scene ID to find position for
   * @returns Index where the new frame should be inserted
   */
  private findBestInsertPosition(sceneId: number): number {
    // Find all frames with the same scene ID
    const sameSceneFrames = this.storyboardFrames
      .map((frame, index) => ({ frame, index }))
      .filter(item => item.frame.sceneId === sceneId);

    if (sameSceneFrames.length === 0) {
      // No frames with this scene ID exist, add at the end
      return this.storyboardFrames.length;
    }

    // Insert after the last frame of the same scene type
    const lastSameSceneIndex = sameSceneFrames[sameSceneFrames.length - 1].index;
    return lastSameSceneIndex + 1;
  }

  /**
   * Reorder all frame IDs to maintain sequence
   */
  private reorderFrameIds(): void {
    this.storyboardFrames.forEach((frame, index) => {
      frame.id = index + 1;
    });
  }

  /**
   * Add animation class to newly created frame
   * @param frameId The ID of the new frame
   */
  private addNewFrameAnimation(frameId: number): void {
    setTimeout(() => {
      const frameElement = document.querySelector(`[data-frame-id="${frameId}"]`);
      if (frameElement) {
        frameElement.classList.add('new-frame');
        
        // Remove the animation class after animation completes
        setTimeout(() => {
          frameElement.classList.remove('new-frame');
        }, 600);
      }
    }, 50);
  }

  // ============================================
  // EDITABLE MODAL METHODS
  // ============================================

  onFrameClick(frame: any): void {
    if (!this.isDragging) {
      this.openFrameEditor(frame);
    }
  }

  openFrameEditor(frame: any): void {
    // Find the frame in the main array and use the reference directly
    const frameIndex = this.storyboardFrames.findIndex(f => f.id === frame.id);
    if (frameIndex > -1) {
      this.selectedFrame = this.storyboardFrames[frameIndex];
      console.log('Opened frame editor for:', this.selectedFrame.title);
      
      // Add visual feedback to the frame being edited
      this.addEditingClass(frame.id);
    }
  }

  /**
   * Called whenever any field in the modal is changed
   * This automatically updates the frame widget since selectedFrame 
   * is a reference to the frame in storyboardFrames array
   */
  onFrameFieldChange(): void {
    console.log('Frame field changed, widget will update automatically');
    // The UI will automatically update because we're using the same reference
    // No need to manually sync since selectedFrame points to the object in storyboardFrames
    
    // Trigger change detection if needed
    // You can add additional logic here like validation, auto-save, etc.
  }

  closeModal(): void {
    if (this.selectedFrame) {
      this.removeEditingClass(this.selectedFrame.id);
    }
    this.selectedFrame = null;
    console.log('Modal closed');
  }

  // ============================================
  // VISUAL FEEDBACK METHODS
  // ============================================

  addEditingClass(frameId: number): void {
    // Add a CSS class to highlight the frame being edited
    setTimeout(() => {
      const frameElement = document.querySelector(`[data-frame-id="${frameId}"]`);
      if (frameElement) {
        frameElement.classList.add('being-edited');
      }
    }, 0);
  }

  removeEditingClass(frameId: number): void {
    const frameElement = document.querySelector(`[data-frame-id="${frameId}"]`);
    if (frameElement) {
      frameElement.classList.remove('being-edited');
    }
  }

  isFrameBeingEdited(frame: any): boolean {
    return this.selectedFrame && this.selectedFrame.id === frame.id;
  }

  // ============================================
  // NAVIGATION METHODS
  // ============================================

  onPreviousFrame(): void {
    if (this.selectedFrame) {
      const currentIndex = this.getFrameIndex(this.selectedFrame);
      if (currentIndex > 0) {
        this.removeEditingClass(this.selectedFrame.id);
        this.selectedFrame = this.storyboardFrames[currentIndex - 1];
        this.addEditingClass(this.selectedFrame.id);
        console.log('Navigated to previous frame:', this.selectedFrame.title);
      }
    }
  }

  onNextFrame(): void {
    if (this.selectedFrame) {
      const currentIndex = this.getFrameIndex(this.selectedFrame);
      if (currentIndex < this.storyboardFrames.length - 1) {
        this.removeEditingClass(this.selectedFrame.id);
        this.selectedFrame = this.storyboardFrames[currentIndex + 1];
        this.addEditingClass(this.selectedFrame.id);
        console.log('Navigated to next frame:', this.selectedFrame.title);
      }
    }
  }

  getFrameIndex(frame: any): number {
    return this.storyboardFrames.findIndex(f => f.id === frame.id);
  }

  // ============================================
  // ACTION METHODS
  // ============================================

  onActionClick(action: string, frame: any, event: Event): void {
    event.stopPropagation();
    console.log(`${action} clicked for frame ${frame.id}`);
    
    switch (action) {
      case 'camera':
        this.handleCameraAction(frame);
        break;
      case 'skecth': // Fixed typo to be consistent
        this.handleSketchAction(frame);
        break;
      case 'copy':
        this.handleCopyAction(frame);
        break;
      case 'delete':
        this.handleDeleteAction(frame);
        break;
      case 'previous':
        this.navigateFrame('previous', frame);
        break;
      case 'next':
        this.navigateFrame('next', frame);
        break;
    }
  }

  private handleCameraAction(frame: any): void {
    console.log('Camera action for frame:', frame.title);
    this.showNotification('ميزة الكاميرا قيد التطوير', 'info');
  }

  // ============================================
  // REACT COMPONENT PREVIEW FUNCTIONALITY
  // ============================================

 

  

 
 
 

  // ============================================
  // COPY FUNCTIONALITY
  // ============================================

  private handleCopyAction(frame: any): void {
    const frameInfo = this.formatFrameInfoForClipboard(frame);
    
    if (navigator.clipboard && window.isSecureContext) {
      // Use the modern Clipboard API
      navigator.clipboard.writeText(frameInfo).then(() => {
        this.showCopySuccess(frame.id);
        this.showNotification('تم نسخ معلومات الإطار بنجاح', 'success');
        console.log('Frame info copied to clipboard:', frameInfo);
      }).catch(err => {
        console.error('Failed to copy frame info:', err);
        this.fallbackCopyToClipboard(frameInfo, frame.id);
      });
    } else {
      // Fallback for older browsers or non-secure contexts
      this.fallbackCopyToClipboard(frameInfo, frame.id);
    }
  }

  /**
   * Enhanced fallback copy method with visual feedback
   */
  private fallbackCopyToClipboard(text: string, frameId?: number): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const result = document.execCommand('copy');
      if (result) {
        if (frameId) this.showCopySuccess(frameId);
        this.showNotification('تم نسخ معلومات الإطار بنجاح', 'success');
        console.log('Frame info copied using fallback method');
      } else {
        this.showNotification('فشل في نسخ معلومات الإطار', 'error');
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
      this.showNotification('فشل في نسخ معلومات الإطار', 'error');
    } finally {
      document.body.removeChild(textArea);
    }
  }

  /**
   * Show visual feedback for successful copy
   */
  private showCopySuccess(frameId: number): void {
    const frameElement = document.querySelector(`[data-frame-id="${frameId}"]`);
    if (frameElement) {
      const copyButton = frameElement.querySelector('.action-btn:has(i.fa-copy)') as HTMLElement;
      if (copyButton) {
        copyButton.classList.add('copy-success');
        setTimeout(() => {
          copyButton.classList.remove('copy-success');
        }, 600);
      }
    }
  }

  /**
   * Format frame information for clipboard
   */
  private formatFrameInfoForClipboard(frame: any): string {
    const frameIndex = this.getFrameIndex(frame) + 1;
    const sceneName = this.getSceneName(frame);
    
    const frameInfo = [
      `نوع المشهد: ${sceneName}`,
      '-----',
      `رقم الإطار: ${frameIndex}`,
      '-----',
      `العنوان: ${frame.title || 'غير محدد'}`,
      '-----',
      `الوصف: ${frame.description || 'غير محدد'}`,
      '-----',
      `النص الصوتي: ${frame.voiceOver || 'غير محدد'}`,
      '-----',
      `المدة: ${frame.duration || 'غير محدد'}`,
      '-----',
      `ملاحظات الإنتاج: ${frame.notes || 'غير محدد'}`,
      '-----',
      `متطلبات إضافية: ${frame.extraReq || 'غير محدد'}`,
      '-----'
    ].join('\n');

    return frameInfo;
  }

  private handleDeleteAction(frame: any): void {
    const confirmDelete = confirm(`هل أنت متأكد من حذف الإطار: ${frame.title}؟`);
    if (!confirmDelete) return;

    const frameIndex = this.storyboardFrames.findIndex(f => f.id === frame.id);
    if (frameIndex > -1) {
      // Close modal if we're deleting the currently selected frame
      if (this.selectedFrame && this.selectedFrame.id === frame.id) {
        this.closeModal();
      }
      
      this.storyboardFrames.splice(frameIndex, 1);
      
      // Reorder remaining frame IDs
      this.reorderFrameIds();
      
      this.showNotification(`تم حذف الإطار: ${frame.title}`, 'success');
      console.log('Frame deleted:', frame.title);
    }
  }

  private navigateFrame(direction: 'previous' | 'next', frame: any): void {
    const currentIndex = this.storyboardFrames.findIndex(f => f.id === frame.id);
    
    if (direction === 'previous' && currentIndex > 0) {
      this.openFrameEditor(this.storyboardFrames[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < this.storyboardFrames.length - 1) {
      this.openFrameEditor(this.storyboardFrames[currentIndex + 1]);
    }
  }

  // ============================================
  // DRAG AND DROP FUNCTIONALITY
  // ============================================

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.storyboardFrames, event.previousIndex, event.currentIndex);
      this.reorderFrameIds();
      console.log('Frame order updated after drag and drop');
      
      // Add success animation
      this.addDropSuccessAnimation(event.currentIndex);
    }
    this.isDragging = false;
  }

  onDragStarted(): void {
    this.isDragging = true;
    console.log('Drag started');
  }

  onDragEnded(): void {
    setTimeout(() => {
      this.isDragging = false;
      console.log('Drag ended');
    }, 100);
  }

  onDragMoved(event: any): void {
    // This will be called during drag to update placeholder position
    // Can be used for additional drag feedback
  }

  private addDropSuccessAnimation(frameIndex: number): void {
    setTimeout(() => {
      const frameElement = document.querySelector(`[data-frame-id="${this.storyboardFrames[frameIndex].id}"]`);
      if (frameElement) {
        frameElement.classList.add('drop-success');
        setTimeout(() => {
          frameElement.classList.remove('drop-success');
        }, 400);
      }
    }, 0);
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  getFrameScene(frame: any): any | undefined {
    return this.scenes.find(scene => scene.id === frame.sceneId);
  }

  getFrameColorClass(frame: any): string {
    const scene = this.getFrameScene(frame);
    return scene ? `frame-scene-${scene.id}` : 'frame-default';
  }

  getFrameBorderColor(frame: any): string {
    const scene = this.getFrameScene(frame);
    return scene ? scene.color : '#95a5a6';
  }

  getSceneName(frame: any): string {
    const scene = this.getFrameScene(frame);
    return scene ? scene.scene_type || scene.name : 'غير محدد';
  }

  // Show notification helper
  private showNotification(message: string, type: 'success' | 'info' | 'warning' | 'error'): void {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // You can implement your notification system here
    // For example, using a toast library or custom notification component
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(message);
    }
  }

  // ============================================
  // SAVE FUNCTIONALITY
  // ============================================

  /**
   * Save all frames to the backend
   */
  saveAllFrames(): void {
    if (this.isSaving) {
      this.showNotification('Save operation already in progress', 'warning');
      return;
    }

    // Get insight and block IDs from the parent component input
    const insightId = this.insightData?.insight_id;
    const blockId = this.insightData?.block_id;

    if (!insightId || !blockId) {
      this.showNotification('Missing insight or block ID', 'error');
      return;
    }

    if (this.storyboardFrames.length === 0) {
      this.showNotification('No frames to save', 'warning');
      return;
    }

    this.isSaving = true;
    this.saveError = null;

    console.log('Saving frames...', {
      insightId,
      blockId,
      frameCount: this.storyboardFrames.length,
      frames: this.storyboardFrames
    });

    this.tamemService.saveInsightFrames(insightId, blockId, this.storyboardFrames).subscribe({
      next: (response) => {
        this.handleSaveSuccess(response);
      },
      error: (error) => {
        this.handleSaveError(error);
      }
    });
  }

  /**
   * Handle successful save response
   */
  private handleSaveSuccess(response: any): void {
    this.isSaving = false;
    this.lastSaveTime = new Date();
    this.saveError = null;

    console.log('Save successful:', response);

    // Update frame IDs if new frames were created
    if (response.data && response.data.frames) {
      this.updateFrameIdsFromResponse(response.data.frames);
    }

    const message = response.message || 'All frames saved successfully';
    this.showNotification(message, 'success');

    // Show additional info if there were partial errors
    if (response.errors && response.errors.length > 0) {
      console.warn('Some frames had errors during save:', response.errors);
      setTimeout(() => {
        this.showNotification(`Warning: ${response.errors.length} frames had issues during save`, 'warning');
      }, 2000);
    }
  }

  /**
   * Handle save error
   */
  private handleSaveError(error: any): void {
    this.isSaving = false;
    this.saveError = error.message || 'Failed to save frames';
    
    console.error('Error saving frames:', error);
    this.showNotification(this.saveError || 'Failed to save frames', 'error');

    // If it's a validation error, show specific field errors
    if (error.statusCode === 422 && error.originalError?.errors) {
      console.error('Validation errors:', error.originalError.errors);
    }
  }

  /**
   * Update frame IDs from backend response after save
   */
  private updateFrameIdsFromResponse(savedFrames: any[]): void {
    // Update the local frames with the IDs returned from backend
    savedFrames.forEach((savedFrame, index) => {
      if (this.storyboardFrames[index]) {
        this.storyboardFrames[index].id = savedFrame.id;
        console.log(`Updated frame ${index + 1} with ID: ${savedFrame.id}`);
      }
    });
  }

  /**
   * Get save status text for UI display
   */
  getSaveStatusText(): string {
    if (this.isSaving) {
      return 'حفظ جاري...';
    } else if (this.saveError) {
      return 'خطأ في الحفظ';
    } else if (this.lastSaveTime) {
      const timeDiff = Math.floor((Date.now() - this.lastSaveTime.getTime()) / 1000);
      if (timeDiff < 60) {
        return `تم الحفظ منذ ${timeDiff} ثانية`;
      } else if (timeDiff < 3600) {
        return `تم الحفظ منذ ${Math.floor(timeDiff / 60)} دقيقة`;
      } else {
        return 'تم الحفظ';
      }
    } else {
      return 'جاهز للحفظ';
    }
  }

  /**
   * Check if save button should be disabled
   */
  isSaveDisabled(): boolean {
    return this.isSaving || this.storyboardFrames.length === 0;
  }

  /**
   * Retry save operation
   */
  retrySave(): void {
    this.saveError = null;
    this.saveAllFrames();
  }

  // ============================================
  // CLEANUP METHODS
  // ============================================

  ngOnDestroy(): void {
    // Cleanup any subscriptions or timers
    if (this.selectedFrame) {
      this.removeEditingClass(this.selectedFrame.id);
    }
    console.log('Frames component destroyed');
  }




 

  /**
   * Handle sketch action - simplified version
   */
  private handleSketchAction(frame: any): void {
    this.openHtmlViewer(frame.id);
  }

  
  private isHtmlViewerOpen = false;

  openHtmlViewer(frameId: number): void {
    if (this.isHtmlViewerOpen) return;
    this.isHtmlViewerOpen = true;
  
    const modalRef = this.modalService.open(DevelopmentHtmlViewerComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
  
    // Pass only the id
    modalRef.componentInstance.frameId = frameId;
  
    // Optional: close when child emits onClose (if you keep that output)
    if (modalRef.componentInstance.onClose) {
      modalRef.componentInstance.onClose.subscribe(() => modalRef.close());
    }
  
    modalRef.result.finally(() => {
      this.isHtmlViewerOpen = false;
    });
  }

  

  






}