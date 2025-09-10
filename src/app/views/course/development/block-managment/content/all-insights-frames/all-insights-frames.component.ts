import { Component, Input, OnInit, OnDestroy, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

interface InsightFrame {
  id: number;
  sceneId: number;
  title: string;
  description: string;
  voiceOver: string;
  imageUrl?: string;
  notes?: string;
  extraReq?: string;
  duration: string;
  sequence_order: number;
  insight_id: number;
  actions: {
    camera: boolean;
    download: boolean;
    share: boolean;
    delete: boolean;
  };
}

interface Insight {
  id: number;
  learning_objective: string;
  insight_type: string;
  insight_text: string;
  order_no: number;
  frames_count: number;
  frames: InsightFrame[];
}

interface SceneType {
  id: number;
  scene_type: string;
  color: string;
  icon: string;
  description: string;
}

interface BlockFramesData {
  frames: InsightFrame[];
  frames_by_insight: { [key: string]: InsightFrame[] };
  insights: Insight[];
  keySceneTypes: SceneType[];
  block_id: number;
  block_title: string;
  lesson_name: string;
  course_id: number;
  total_frames: number;
  total_insights: number;
}

@Component({
  selector: 'all-insights-frames',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-insights-frames.component.html',
  styleUrls: ['./all-insights-frames.component.scss']
})
export class InsightFramesComponent implements OnInit, OnDestroy {
  @Input() blockId!: number;
  
  // Template references for modals
  @ViewChild('editModalTemplate') editModalTemplate!: TemplateRef<any>;
  @ViewChild('deleteModalTemplate') deleteModalTemplate!: TemplateRef<any>;
  @ViewChild('addFrameModalTemplate') addFrameModalTemplate!: TemplateRef<any>;
  
  // Services
  private modalService = inject(NgbModal);
  
  // Data properties
  blockData: BlockFramesData | null = null;
  insights: Insight[] = [];
  
  // State properties
  loading = false;
  error: string | null = null;
  
  // Edit state
  editingFrame: InsightFrame | null = null;
  isSaving = false;
  
  // Delete state
  frameToDelete: { id: number; title: string } | null = null;
  isDeletingFrame: number | null = null;
  
  // Add frame state
  addFrameReferenceId: number | null = null;
  addFrameDirection: 'before' | 'after' = 'after';
  newFrameTitle = '';
  isCreatingFrame = false;
  
  // Frame action states
  private isHtmlViewerOpen = false;
  
  // Modal management
  private currentModalRef: NgbModalRef | null = null;
  
  // Subscriptions
  private subscriptions: Subscription[] = [];
  
  // Scene type colors (fallback colors if not provided by backend)
  private sceneTypeColors: { [key: number]: string } = {
    1: '#007bff',
    2: '#28a745', 
    3: '#ffc107',
    4: '#dc3545',
    5: '#17a2b8',
    6: '#6f42c1',
    7: '#fd7e14',
    8: '#20c997'
  };

  // Additional state properties for enhanced UI
  selectedSceneType: any = null;
  private currentInsightForNewFrame: Insight | null = null;
  editingFrameId: number | null = null;

  constructor(private tamemService: TamemService) {}

  ngOnInit() {
    if (!this.blockId) {
      this.error = 'معرف البلوك مطلوب';
      return;
    }
    
    this.loadFrames();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    // Close any open modals
    if (this.currentModalRef) {
      this.currentModalRef.close();
    }
  }

  trackByInsightId(index: number, insight: Insight): number {
    return insight.id;
  }

  trackByFrameId(index: number, frame: InsightFrame): number {
    return frame.id;
  }

  loadFrames() {
    this.loading = true;
    this.error = null;

    const subscription = this.tamemService.getAllBlockInsightFrames(this.blockId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.blockData = response.data;
          this.insights = response.data.insights;
          console.log('Loaded frames:', response.data);
        } else {
          this.error = response.message || 'فشل في تحميل الإطارات';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading frames:', error);
        this.error = error.message || 'حدث خطأ في تحميل الإطارات';
        this.loading = false;
      }
    });

    this.subscriptions.push(subscription);
  }

  getInsightColor(insight: Insight): string {
    // Generate a color based on insight ID or use a predefined color scheme
    const colors = ['#007bff', '#28a745', '#17a2b8', '#ffc107', '#dc3545', '#6f42c1', '#fd7e14', '#20c997'];
    return colors[insight.id % colors.length];
  }

  getSceneTypeColor(sceneId: number): string {
    // First try to get color from backend data
    const sceneType = this.blockData?.keySceneTypes?.find(st => st.id === sceneId);
    if (sceneType?.color) {
      return sceneType.color;
    }
    
    // Fallback to predefined colors
    return this.sceneTypeColors[sceneId] || '#6c757d';
  }

  /**
   * Calculate the global frame index across all insights
   * @param currentInsight The insight containing the frame
   * @param frameIndex The index of the frame within its insight
   * @returns Global frame index
   */
  getGlobalFrameIndex(currentInsight: Insight, frameIndex: number): number {
    let globalIndex = 0;
    
    // Add frames from previous insights
    for (const insight of this.insights) {
      if (insight.id === currentInsight.id) {
        // Found current insight, add the frame index and break
        globalIndex += frameIndex;
        break;
      }
      // Add all frames from previous insights
      globalIndex += insight.frames.length;
    }
    
    return globalIndex;
  }

  /**
   * Get all frames flattened with insight context
   * This could be useful for other operations
   */
  getAllFramesWithInsight(): Array<{frame: InsightFrame, insight: Insight, globalIndex: number}> {
    const allFrames: Array<{frame: InsightFrame, insight: Insight, globalIndex: number}> = [];
    let globalIndex = 0;
    
    for (const insight of this.insights) {
      for (const frame of insight.frames) {
        allFrames.push({
          frame,
          insight,
          globalIndex: globalIndex++
        });
      }
    }
    
    return allFrames;
  }

  // ============================================
  // FRAME ACTION METHODS - NEW
  // ============================================

  /**
   * Handle frame action clicks
   * @param action The action to perform
   * @param frame The frame to perform action on
   * @param event The click event
   */
  onFrameActionClick(action: string, frame: InsightFrame, event: Event): void {
    event.stopPropagation();
    console.log(`${action} clicked for frame ${frame.id}`);
    
    switch (action) {
      case 'camera':
        this.handleCameraAction(frame);
        break;
      case 'sketch':
        this.handleSketchAction(frame);
        break;
      case 'copy':
        this.handleCopyAction(frame);
        break;
      case 'delete':
        this.handleDeleteAction(frame);
        break;
    }
  }

  /**
   * Handle camera action for frame
   * @param frame The frame to capture
   */
  private handleCameraAction(frame: InsightFrame): void {
    console.log('Camera action for frame:', frame.title);
    this.showNotification('ميزة الكاميرا قيد التطوير', 'info');
    // TODO: Implement camera functionality
    // This could open a camera modal, capture screenshot, etc.
  }

  /**
   * Handle sketch action - opens HTML viewer
   * @param frame The frame to sketch
   */
  private handleSketchAction(frame: InsightFrame): void {
    this.openHtmlViewer(frame.id);
  }

  /**
   * Open HTML viewer modal for frame
   * @param frameId The frame ID to view
   */
  private openHtmlViewer(frameId: number): void {
    if (this.isHtmlViewerOpen) return;
    this.isHtmlViewerOpen = true;

    // TODO: Import and use DevelopmentHtmlViewerComponent
    // For now, show a placeholder
    console.log('Opening HTML viewer for frame:', frameId);
    this.showNotification('محرر HTML قيد التطوير', 'info');
    this.isHtmlViewerOpen = false;
    
    // When DevelopmentHtmlViewerComponent is available, use this:
    /*
    const modalRef = this.modalService.open(DevelopmentHtmlViewerComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });

    modalRef.componentInstance.frameId = frameId;

    if (modalRef.componentInstance.onClose) {
      modalRef.componentInstance.onClose.subscribe(() => modalRef.close());
    }

    modalRef.result.finally(() => {
      this.isHtmlViewerOpen = false;
    });
    */
  }

  /**
   * Handle copy action for frame
   * @param frame The frame to copy
   */
  private handleCopyAction(frame: InsightFrame): void {
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
   * Handle delete action for frame
   * @param frame The frame to delete
   */
  private handleDeleteAction(frame: InsightFrame): void {
    this.confirmDelete(frame.id, frame.title);
  }

  /**
   * Format frame information for clipboard
   */
  private formatFrameInfoForClipboard(frame: InsightFrame): string {
    const frameIndex = this.getFrameGlobalIndex(frame) + 1;
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
      const copyButton = frameElement.querySelector('.copy-btn') as HTMLElement;
      if (copyButton) {
        copyButton.classList.add('copy-success');
        setTimeout(() => {
          copyButton.classList.remove('copy-success');
        }, 600);
      }
    }
  }

  /**
   * Get global frame index for a specific frame
   */
  private getFrameGlobalIndex(frame: InsightFrame): number {
    let globalIndex = 0;
    
    for (const insight of this.insights) {
      const frameIndex = insight.frames.findIndex(f => f.id === frame.id);
      if (frameIndex !== -1) {
        return globalIndex + frameIndex;
      }
      globalIndex += insight.frames.length;
    }
    
    return -1; // Frame not found
  }

  // ============================================
  // MODAL METHODS - UPDATED FOR NGBOOTSTRAP
  // ============================================

  // Inline editing methods
  toggleInlineEdit(frameId: number) {
    if (this.editingFrameId === frameId) {
      this.editingFrameId = null;
    } else {
      this.editingFrameId = frameId;
    }
  }

  finishInlineEdit(event: Event) {
    event.preventDefault();
    (event.target as HTMLElement).blur();
  }

  updateFrameField(frameId: number, field: string, event: Event) {
    const target = event.target as HTMLElement;
    const newValue = target.textContent?.trim() || '';
    
    if (!newValue) {
      // Revert to original value if empty
      this.loadFrames();
      return;
    }

    const updateData: any = {};
    updateData[field] = newValue;

    const subscription = this.tamemService.updateInsightFrame(frameId, updateData).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Field updated successfully');
          // Update local data
          this.updateLocalFrameData(frameId, updateData);
          this.editingFrameId = null;
        } else {
          console.error('Failed to update field:', response.message);
          // Revert to original value
          this.editingFrameId = null;
          this.loadFrames();
        }
      },
      error: (error) => {
        console.error('Error updating field:', error);
        // Revert to original value
        this.editingFrameId = null;
        this.loadFrames();
      }
    });

    this.subscriptions.push(subscription);
  }

  private updateLocalFrameData(frameId: number, updateData: any) {
    for (const insight of this.insights) {
      const frameIndex = insight.frames.findIndex(f => f.id === frameId);
      if (frameIndex !== -1) {
        Object.assign(insight.frames[frameIndex], updateData);
        break;
      }
    }
  }

  // Modal editing methods - UPDATED
  openEditModal(frame: InsightFrame) {
    this.editingFrame = { ...frame }; // Create a copy
    this.currentModalRef = this.modalService.open(this.editModalTemplate, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'custom-modal-class'
    });

    this.currentModalRef.result.catch((result) => {
      // Handle modal dismissal
      this.closeEditModal();
    });
  }

  closeEditModal() {
    if (this.currentModalRef) {
      this.currentModalRef.close();
      this.currentModalRef = null;
    }
    this.editingFrame = null;
    this.isSaving = false;
  }

  onFrameFieldChange() {
    // Placeholder for form change detection
    // Can be used for auto-save or dirty checking
  }

  saveFrameChanges() {
    if (!this.editingFrame) return;

    this.isSaving = true;

    const updateData = {
      sceneId: this.editingFrame.sceneId,
      title: this.editingFrame.title,
      description: this.editingFrame.description,
      voiceOver: this.editingFrame.voiceOver,
      imageUrl: this.editingFrame.imageUrl,
      notes: this.editingFrame.notes,
      extraReq: this.editingFrame.extraReq,
      duration: this.editingFrame.duration,
      sequence_order: this.editingFrame.sequence_order
    };

    const subscription = this.tamemService.updateInsightFrame(this.editingFrame.id, updateData).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Frame updated successfully');
          this.updateLocalFrameData(this.editingFrame!.id, updateData);
          this.closeEditModal();
        } else {
          console.error('Failed to update frame:', response.message);
        }
        this.isSaving = false;
        // Refresh the frame list
        this.loadFrames();
      },
      error: (error) => {
        console.error('Error updating frame:', error);
        this.isSaving = false;
      }
    });

    this.subscriptions.push(subscription);
  }

  // Delete methods - UPDATED
  confirmDelete(frameId: number, frameTitle: string) {
    this.frameToDelete = { id: frameId, title: frameTitle };
    this.currentModalRef = this.modalService.open(this.deleteModalTemplate, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
      windowClass: 'delete-modal-class'
    });

    this.currentModalRef.result.catch((result) => {
      // Handle modal dismissal
      this.cancelDelete();
    });
  }

  cancelDelete() {
    if (this.currentModalRef) {
      this.currentModalRef.close();
      this.currentModalRef = null;
    }
    this.frameToDelete = null;
    this.isDeletingFrame = null;
  }

  deleteFrame() {
    if (!this.frameToDelete) return;

    this.isDeletingFrame = this.frameToDelete.id;

    const subscription = this.tamemService.deleteInsightFrame(this.frameToDelete.id).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Frame deleted successfully');
          this.removeFrameFromLocal(this.frameToDelete!.id);
          this.cancelDelete();
        } else {
          console.error('Failed to delete frame:', response.message);
          this.isDeletingFrame = null;
        }
      },
      error: (error) => {
        console.error('Error deleting frame:', error);
        this.isDeletingFrame = null;
      }
    });

    this.subscriptions.push(subscription);
  }

  private removeFrameFromLocal(frameId: number) {
    for (const insight of this.insights) {
      const frameIndex = insight.frames.findIndex(f => f.id === frameId);
      if (frameIndex !== -1) {
        insight.frames.splice(frameIndex, 1);
        insight.frames_count--;
        if (this.blockData) {
          this.blockData.total_frames--;
        }
        break;
      }
    }
  }

  // Add frame methods - UPDATED
  showAddFrameOptions(referenceFrameId: number, direction: 'before' | 'after') {
    this.addFrameReferenceId = referenceFrameId;
    this.addFrameDirection = direction;
    this.newFrameTitle = 'إطار جديد';
    this.currentModalRef = this.modalService.open(this.addFrameModalTemplate, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
      windowClass: 'add-frame-modal-class'
    });

    this.currentModalRef.result.catch((result) => {
      // Handle modal dismissal
      this.cancelAddFrame();
    });
  }

  cancelAddFrame() {
    if (this.currentModalRef) {
      this.currentModalRef.close();
      this.currentModalRef = null;
    }
    this.addFrameReferenceId = null;
    this.newFrameTitle = '';
    this.isCreatingFrame = false;
  }

  createFrame() {
    if (!this.addFrameReferenceId) return;

    this.isCreatingFrame = true;

    const createData = {
      reference_frame_id: this.addFrameReferenceId,
      direction: this.addFrameDirection,
      title: this.newFrameTitle || 'إطار جديد'
    };

    const subscription = this.tamemService.createInsightFrame(createData).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Frame created successfully');
          // Reload frames to get updated sequence orders
          this.loadFrames();
          this.cancelAddFrame();
        } else {
          console.error('Failed to create frame:', response.message);
          this.isCreatingFrame = false;
        }
      },
      error: (error) => {
        console.error('Error creating frame:', error);
        this.isCreatingFrame = false;
      }
    });

    this.subscriptions.push(subscription);
  }

  // Methods for enhanced UI functionality
  generateFrames() {
    console.log('Generate frames with AI');
    // This would call the existing insight generation endpoints
    // For now, just redirect to load frames if they exist
    this.loadFrames();
  }

  showAddFrameForSceneType(sceneType: any) {
    this.selectedSceneType = sceneType;
    // In a real implementation, this might show a modal
    // or directly create a frame with the selected scene type
    console.log('Add frame for scene type:', sceneType);
  }

  getSceneName(frame: InsightFrame): string {
    const sceneType = this.blockData?.keySceneTypes?.find(st => st.id === frame.sceneId);
    return sceneType?.scene_type || 'نوع غير محدد';
  }

  getFrameColorClass(frame: InsightFrame): string {
    // Return a CSS class based on scene type or frame status
    return 'frame-default';
  }

  navigateFrame(frame: InsightFrame, direction: 'previous' | 'next', event: Event) {
    event.stopPropagation();
    // Find the frame's position and navigate accordingly
    const allFrames = this.getAllFramesFlat();
    const currentIndex = allFrames.findIndex(f => f.id === frame.id);
    
    if (direction === 'previous' && currentIndex > 0) {
      const previousFrame = allFrames[currentIndex - 1];
      this.openEditModal(previousFrame);
    } else if (direction === 'next' && currentIndex < allFrames.length - 1) {
      const nextFrame = allFrames[currentIndex + 1];
      this.openEditModal(nextFrame);
    }
  }

  private getAllFramesFlat(): InsightFrame[] {
    const allFrames: InsightFrame[] = [];
    for (const insight of this.insights) {
      allFrames.push(...insight.frames);
    }
    return allFrames;
  }

  copyFrame(frame: InsightFrame, event: Event) {
    event.stopPropagation();
    this.handleCopyAction(frame);
  }

  getFrameIndex(frame: InsightFrame | null): number {
    if (!frame) return -1;
    
    // Find the frame in its insight
    const insight = this.insights.find(i => i.id === frame.insight_id);
    if (!insight) return -1;
    
    return insight.frames.findIndex(f => f.id === frame.id);
  }

  navigateModalFrame(direction: 'previous' | 'next') {
    if (!this.editingFrame) return;
    
    const allFrames = this.getAllFramesFlat();
    const currentIndex = allFrames.findIndex(f => f.id === this.editingFrame!.id);
    
    if (direction === 'previous' && currentIndex > 0) {
      this.editingFrame = { ...allFrames[currentIndex - 1] };
    } else if (direction === 'next' && currentIndex < allFrames.length - 1) {
      this.editingFrame = { ...allFrames[currentIndex + 1] };
    }
  }

  getTotalFramesCount(): number {
    return this.blockData?.total_frames || 0;
  }

  showAddFrameForInsight(insight: Insight) {
    // When adding the first frame to an insight, we need to handle it differently
    // since there's no reference frame yet, we might need to use a different approach
    console.log('Add first frame for insight:', insight);
    
    // For now, show the add frame modal without a reference frame
    this.addFrameReferenceId = null; // No reference frame for first frame
    this.addFrameDirection = 'after'; // Default direction
    this.newFrameTitle = 'الإطار الأول';
    this.currentModalRef = this.modalService.open(this.addFrameModalTemplate, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
      windowClass: 'add-frame-modal-class'
    });
    
    // Store the insight context for frame creation
    this.currentInsightForNewFrame = insight;

    this.currentModalRef.result.catch((result) => {
      // Handle modal dismissal
      this.cancelAddFrame();
    });
  }

  /**
   * Open insight component with specific insight ID
   * @param insightId The ID of the insight to view/edit
   */
  openInsightComponent(insightId: number) {
    console.log('Opening insight component for insight ID:', insightId);
    
    // TODO: Replace with actual component navigation/modal
    // This is a placeholder method as requested
    // You can implement this to:
    // - Open a modal with insight details
    // - Navigate to insight edit page
    // - Show insight management component
    
    // Example implementations:
    // this.router.navigate(['/insight', insightId]);
    // this.modalService.open(InsightDetailsComponent, { data: { insightId } });
    // this.showInsightModal = true; this.selectedInsightId = insightId;
    
    this.showNotification(`فتح مكون الرؤية للمعرف: ${insightId}`, 'info');
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
}