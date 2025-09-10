import { ChangeDetectorRef, Component, OnInit, inject, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { BlockManagmentInsightScenesComponent } from '../../key-insights/storyboard/scenes/scenes.component';
import { BlockManagmentAiApiManagerComponent } from '../../key-insights/ai-api-manager/ai-api-manager.component';
import { BlockManagmentContentInsightFramesComponent } from './frames/frames.component';
import { BlockManagmentContentExplainerComponent } from '../explainer/explainer.component';

// Interfaces
interface BlockInfo {
  id: number;
  title: string;
  lessonName: string;
  courseName: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  lastUpdated: string;
}

interface KeyInsight {
  id: number;
  title: string;
  description: string;
  content: string;
  type: 'concept' | 'example' | 'practice' | 'summary';
  priority: 'high' | 'medium' | 'low';
  estimatedDuration: string;
  tags: string[];
  hasStoryboard: boolean;
  storyboardScenes?: number;
  createdAt: string;
  status: 'draft' | 'review' | 'approved';
  completionPercentage?: number;
}

interface StoryboardInfo {
  id: number;
  keyInsightId: number;
  title: string;
  description: string;
  totalScenes: number;
  estimatedDuration: string;
  style: 'animated' | 'static' | 'interactive';
  status: 'planning' | 'in-progress' | 'completed';
  lastUpdated: string;
  scenes: StoryboardScene[];
}

interface StoryboardScene {
  id: number;
  sceneNumber: number;
  title: string;
  description: string;
  duration: string;
  frameCount: number;
  status: 'planned' | 'sketched' | 'finalized';
}

interface UploadedImage {
  id: string;
  name: string;
  size: number;
  type: string;
  preview: string;
  file: File;
}

// New interface for saved images from backend
interface SavedImage {
  id: number;
  name: string;
  url: string;
  size: number;
  formatted_size: string;
  type: string;
  file_type: string;
  metadata?: any;
  uploaded_at: string;
}

@Component({
  selector: 'block-managment-content-insights',
  standalone: true,
  imports: [CommonModule, FormsModule, BlockManagmentInsightScenesComponent, BlockManagmentContentExplainerComponent , BlockManagmentContentInsightFramesComponent],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.scss'
})
export class BlockManagmentContentInsightsComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild(BlockManagmentContentInsightFramesComponent) framesComponent!: BlockManagmentContentInsightFramesComponent;

  private tamemService = inject(TamemService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  @Input() blockId: number = 0;

  // Component State
  selectedInsightId: number | null = null;
  showStoryboardPanel: boolean = false;
  currentFilter: string = 'all';
  isLoading: boolean = false;

  // Tab State
  activeTab: 'insights' | 'images' = 'insights';

  // Image Upload State
  uploadedImages: UploadedImage[] = []; // For new uploads
  savedImages: SavedImage[] = []; // For images already saved to backend
  isDragOver: boolean = false;
  isSaving: boolean = false;
  isLoadingImages: boolean = false;
  selectedImageForView: UploadedImage | SavedImage | null = null;
  maxFileSize: number = 5 * 1024 * 1024; // 5MB
  maxFiles: number = 10;
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  // Image navigation in modal
  currentImageIndex: number = -1;
  allImages: (UploadedImage | SavedImage)[] = [];

  // Animation states
  isHeroAnimated: boolean = false;
  currentBlock: any;
  currentInsights: any;
  blockInfo: any;
  keyInsights: any;
  storyboardData: any;

  // AI Insights Generation
  isGeneratingInsights: boolean = false;
  generatedInsights: any[] = [];

  // Frame Loading States
  selectedInsightFrames: any = null;
  isLoadingFrames: boolean = false;

  // Enhanced loading states
  loadingStep: number = 1;
  loadingProgress: number = 0;
  private loadingInterval: any;
  private stepTimer: any;

  // Loading and error states
  error: boolean = false;
  loading: boolean = false;

  // UI State
  showFabMenu: boolean = false;
  showKeyboardShortcuts: boolean = false;

  ngOnInit(): void {
    // Subscribe to route params to get the lessonBlockId
    this.route.paramMap.subscribe(params => {
      this.blockId = Number(params.get('blockId'));

      if (isNaN(this.blockId)) {
        console.error('Invalid blockId parameter:', this.blockId);
        this.blockId = 0;
      } else {
        // Block ID is valid, proceed with initialization
      }
    });

    console.log('Key Insights component initialized');
    this.initializeAnimations();
    this.loadInsightsData();
    this.setupKeyboardShortcuts();
  }

  // ============================================
  // KEYBOARD SHORTCUTS
  // ============================================

  private setupKeyboardShortcuts(): void {
    document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
  }

  private handleKeyboardShortcuts(event: KeyboardEvent): void {
    // Only handle shortcuts when not in input fields
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case 'n':
          event.preventDefault();
          this.addNewInsight();
          break;
        case 'g':
          event.preventDefault();
          this.generateKeyInsights();
          break;
        case 'r':
          event.preventDefault();
          this.loadInsightsData();
          break;
        case '/':
          event.preventDefault();
          this.showKeyboardShortcuts = !this.showKeyboardShortcuts;
          break;
      }
    } else {
      switch (event.key) {
        case 'Escape':
          if (this.isLoading) {
            this.stopLoadingAnimation();
            this.isLoading = false;
            this.selectedInsightId = null;
            this.selectedInsightFrames = null;
            this.showNotification('Loading cancelled', 'info');
          } else {
            this.selectedInsightId = null;
            this.selectedInsightFrames = null;
            this.showFabMenu = false;
            this.showKeyboardShortcuts = false;
          }
          break;
        case '?':
          this.showKeyboardShortcuts = !this.showKeyboardShortcuts;
          break;
      }
    }
  }

  // ============================================
  // INITIALIZATION AND DATA LOADING
  // ============================================

  // Initialization Methods
  private initializeAnimations(): void {
    setTimeout(() => {
      this.isHeroAnimated = true;
    }, 100);
  }

  public loadInsightsData(): void {
    this.isLoading = true;

    this.tamemService.getKeyInsights(this.blockId).subscribe({
      next: (response) => {
        this.currentInsights = response.data;
        this.keyInsights = response.data; // For compatibility with existing methods
        this.isLoading = false;
        console.log('insights Data => ' + JSON.stringify(this.currentInsights));
      },
      error: (error) => {
        console.error('Error loading lesson blocks:', error);
        this.isLoading = false;
      }
    });
  }

  // ============================================
  // AI INSIGHTS GENERATION
  // ============================================

  generateKeyInsights() {
    this.error = false;
    this.loading = true;

    const extendInsights = true;
    this.tamemService.generateKeyInsights(this.blockId, extendInsights).subscribe({
      next: (response) => {
        // Handle successful creation
        this.loadInsightsData();
        console.log(response);
        this.loading = false;
      },
      error: (error) => {
        // Handle error
        console.error('Error generating insights:', error);
        this.loading = false;
      }
    });
  }

  // Generate insights from images
  generateInsightsFromImages(): void {
    if (!this.blockId) {
      this.showNotification('Block ID not found', 'error');
      return;
    }

    if (this.savedImages.length === 0) {
      this.showNotification('No images found. Please upload images first.', 'warning');
      return;
    }

    this.isGeneratingInsights = true;

    this.tamemService.generateInsightsFromBlockImages(this.blockId).subscribe({
      next: (response) => {
        if (response.success) {
          this.generatedInsights = response.insights || [];
          this.showNotification(
            `Generated ${this.generatedInsights.length} insights from ${response.images_processed} images!`,
            'success'
          );

          console.log('Generated insights:', this.generatedInsights);
        } else {
          this.showNotification('Failed to generate insights', 'error');
        }
        this.isGeneratingInsights = false;
      },
      error: (error) => {
        console.error('Error generating insights:', error);
        this.showNotification(error.message || 'Failed to generate insights', 'error');
        this.isGeneratingInsights = false;
      }
    });
  }

  // ============================================
  // INSIGHT SELECTION AND FRAME MANAGEMENT
  // ============================================

  /**
   * Enhanced select insight with loading animation
   */
  selectInsight(insightId: number): void {
    this.selectedInsightId = insightId;
    this.isLoading = true;
    this.selectedInsightFrames = null;
    
    // Start loading animation
    this.startLoadingAnimation();

    // Notify frames component about loading state if it exists
    if (this.framesComponent) {
      this.framesComponent.setFramesLoading(true);
    }

    this.tamemService.getInsightFrames(insightId, this.blockId).subscribe({
      next: (response) => {
        // Complete the loading animation before showing results
        this.completeLoadingAnimation().then(() => {
          this.selectedInsightFrames = response.data;
          this.isLoading = false;
          
          // Notify frames component that loading is complete
          if (this.framesComponent) {
            this.framesComponent.setFramesLoading(false);
          }
          
          console.log('insight frames Data => ', this.selectedInsightFrames);
        });
      },
      error: (error) => {
        console.error('Error loading insight frames:', error);
        this.stopLoadingAnimation();
        this.isLoading = false;
        
        // Notify frames component that loading failed
        if (this.framesComponent) {
          this.framesComponent.setFramesLoading(false);
        }
        
        this.showNotification('فشل في تحميل الإطارات', 'error');
      }
    });
  }

  /**
   * Enhanced generate frames with loading animation
   */
  generateFramesForInsight(insightId: number): void {
    this.selectedInsightId = insightId;
    this.isLoading = true;
    this.selectedInsightFrames = null;

    // Start loading animation
    this.startLoadingAnimation();

    // Notify frames component about loading state
    if (this.framesComponent) {
      this.framesComponent.setFramesLoading(true);
      this.framesComponent.isGeneratingFrames = true;
    }

    this.tamemService.postInsightFrames(insightId, this.blockId).subscribe({
      next: (response) => {
        // Complete the loading animation before showing results
        this.completeLoadingAnimation().then(() => {
          this.selectedInsightFrames = response.data;
          this.isLoading = false;
          
          // Notify frames component that generation is complete
          if (this.framesComponent) {
            this.framesComponent.setFramesLoading(false);
            this.framesComponent.isGeneratingFrames = false;
          }
          
          console.log('Generated insight frames => ', this.selectedInsightFrames);
          this.showNotification('تم إنشاء الإطارات بنجاح!', 'success');
        });
      },
      error: (error) => {
        console.error('Error generating insight frames:', error);
        this.stopLoadingAnimation();
        this.isLoading = false;
        
        // Notify frames component that generation failed
        if (this.framesComponent) {
          this.framesComponent.setFramesLoading(false);
          this.framesComponent.isGeneratingFrames = false;
          this.framesComponent.generationError = error.message || 'فشل في إنشاء الإطارات';
        }
        
        this.showNotification('فشل في إنشاء الإطارات', 'error');
      }
    });
  }

  /**
   * Start the loading animation with progress simulation
   */
  private startLoadingAnimation(): void {
    // Reset states
    this.loadingStep = 1;
    this.loadingProgress = 0;
    
    // Clear any existing intervals
    this.stopLoadingAnimation();

    // Simulate progress
    this.loadingInterval = setInterval(() => {
      if (this.loadingProgress < 90) {
        // Randomize progress increments for more realistic feel
        const increment = Math.random() * 15 + 5; // 5-20% increments
        this.loadingProgress = Math.min(90, this.loadingProgress + increment);
      }
    }, 200);

    // Simulate step progression
    this.stepTimer = setTimeout(() => {
      this.loadingStep = 2;
      
      setTimeout(() => {
        this.loadingStep = 3;
      }, 1500);
    }, 1000);
  }

  /**
   * Complete the loading animation smoothly
   */
  private completeLoadingAnimation(): Promise<void> {
    return new Promise((resolve) => {
      // Clear intervals
      this.stopLoadingAnimation();
      
      // Complete progress to 100%
      this.loadingProgress = 100;
      this.loadingStep = 3;
      
      // Wait a moment before resolving to show completion
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

  /**
   * Stop the loading animation
   */
  private stopLoadingAnimation(): void {
    if (this.loadingInterval) {
      clearInterval(this.loadingInterval);
      this.loadingInterval = null;
    }
    
    if (this.stepTimer) {
      clearTimeout(this.stepTimer);
      this.stepTimer = null;
    }
    
    // Reset states
    this.loadingStep = 1;
    this.loadingProgress = 0;
  }

  /**
   * Reset loading state when no insight is selected
   */
  private resetLoadingState(): void {
    this.stopLoadingAnimation();
    this.isLoading = false;
    this.selectedInsightFrames = null;
  }

  /**
   * Handle frames generated event from frames component
   */
  onFramesGenerated(framesData: any): void {
    console.log('Frames generated:', framesData);
    
    // Update the insight data if needed
    if (framesData && this.selectedInsightId) {
      // You can update any insight-level data here
      this.selectedInsightFrames = framesData;
      
      // Optionally refresh the insights list to show updated frame counts
      // this.loadInsightsData();
    }
  }

  // ============================================
  // STORYBOARD AND DATA MANAGEMENT
  // ============================================

  private updateStoryboardData(insightId: number): void {
    const insight = this.keyInsights?.find((i: { id: number; }) => i.id === insightId);
    if (insight) {
      this.storyboardData.keyInsightId = insightId;
      this.storyboardData.title = `${insight.title} - Visual Guide`;
      console.log('Updated storyboard for insight:', insight.title);
    }
  }

  private trackInsightSelection(newId: number, previousId: number | null): void {
    console.log('Insight selection tracked:', { newId, previousId, timestamp: new Date() });
  }

  // ============================================
  // INSIGHT TYPE AND STYLING METHODS
  // ============================================

  // Insight Type Methods
  getInsightTypeIcon(type: string): string {
    const icons = {
      definition: 'fas fa-book-open',
      concept: 'fas fa-lightbulb',
      procedure: 'fas fa-cogs',
      example: 'fas fa-code',
      formula: 'fas fa-superscript',
      fact: 'fas fa-info-circle',
      principle: 'fas fa-balance-scale'
    };

    return icons[type as keyof typeof icons] || 'fas fa-circle';
  }

  getInsightTypeClass(type: string): string {
    return `insight-type-${type}`;
  }

  // Status and Priority Methods
  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getDifficultyClass(difficulty: string): string {
    return `difficulty-${difficulty}`;
  }

  // Scene Status Methods
  getSceneStatusIcon(status: string): string {
    const icons = {
      'planned': 'fas fa-clock',
      'sketched': 'fas fa-pencil-alt',
      'finalized': 'fas fa-check-circle'
    };
    return icons[status as keyof typeof icons] || 'fas fa-circle';
  }

  // ============================================
  // ACTION METHODS
  // ============================================

  // Action Methods
  addNewInsight(): void {
    console.log('Opening add new insight modal');
    this.showNotification('Add New Insight feature coming soon!', 'info');
  }

  editInsight(insightId: number): void {
    const insight = this.keyInsights?.find((i: { id: number; }) => i.id === insightId);
    console.log('Editing insight:', insight?.title);
    this.showNotification(`Editing "${insight?.title}" - feature coming soon!`, 'info');
  }

  deleteInsight(insightId: number): void {
    const insight = this.keyInsights?.find((i: { id: number; }) => i.id === insightId);
    if (insight && confirm(`Are you sure you want to delete "${insight.title}"?`)) {
      this.keyInsights = this.keyInsights.filter((i: { id: number; }) => i.id !== insightId);
      if (this.selectedInsightId === insightId) {
        this.selectedInsightId = null;
        this.showStoryboardPanel = false;
        this.selectedInsightFrames = null;
      }
      console.log('Deleted insight:', insight.title);
      this.showNotification(`Deleted "${insight.title}"`, 'success');
    }
  }

  openStoryboard(): void {
    const insight = this.keyInsights?.find((i: { id: number | null; }) => i.id === this.selectedInsightId);
    console.log('Opening storyboard for:', insight?.title);
    this.showNotification('Opening storyboard viewer...', 'info');
  }

  // ============================================
  // FILTER AND SEARCH METHODS
  // ============================================

  // Filter Methods
  setFilter(filter: string): void {
    this.currentFilter = filter;
    console.log('Filter changed to:', filter);
  }

  getFilteredInsights(): KeyInsight[] {
    if (!this.keyInsights) return [];
    
    if (this.currentFilter === 'all') {
      return this.keyInsights;
    }
    return this.keyInsights.filter((insight: { type: string; }) => insight.type === this.currentFilter);
  }

  // ============================================
  // COMPUTED PROPERTIES (GETTERS)
  // ============================================

  // Computed Properties (Getters)
  get totalInsights(): number {
    return this.keyInsights?.length || 0;
  }

  get totalStoryboards(): number {
    return 0;
  }

  get approvedInsights(): number {
    return 0;
  }

  get averageCompletionRate(): number {
    if (!this.keyInsights || this.keyInsights.length === 0) return 0;
    
    const insights = this.keyInsights.filter((i: { completionPercentage: undefined; }) => i.completionPercentage !== undefined);
    if (insights.length === 0) return 0;

    const total = insights.reduce((sum: any, i: { completionPercentage: any; }) => sum + (i.completionPercentage || 0), 0);
    return Math.round(total / insights.length);
  }

  get totalEstimatedDuration(): string {
    if (!this.keyInsights || this.keyInsights.length === 0) return '0 minutes';
    
    const totalMinutes = this.keyInsights.reduce((total: number, insight: { estimatedDuration: string; }) => {
      const minutes = parseInt(insight.estimatedDuration.split(' ')[0]);
      return total + minutes;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes} minutes`;
  }

  /**
   * Check if the current insight has any frames
   */
  get hasFramesForSelectedInsight(): boolean {
    return this.selectedInsightFrames && 
           this.selectedInsightFrames.frames && 
           this.selectedInsightFrames.frames.length > 0;
  }

  /**
   * Get frame count for selected insight
   */
  get selectedInsightFrameCount(): number {
    return this.selectedInsightFrames?.frames?.length || 0;
  }

  // ============================================
  // LOADING STATE HELPERS
  // ============================================

  /**
   * Get loading status text for accessibility
   */
  getLoadingStatusText(): string {
    if (!this.isLoading) return '';
    
    switch (this.loadingStep) {
      case 1:
        return 'Analyzing insight content...';
      case 2:
        return 'Processing educational material...';
      case 3:
        return 'Building storyboard frames...';
      default:
        return 'Loading...';
    }
  }

  /**
   * Check if a specific insight is currently loading
   */
  isInsightLoading(insightId: number): boolean {
    return this.selectedInsightId === insightId && this.isLoading;
  }

  /**
   * Get progress description for screen readers
   */
  getProgressDescription(): string {
    return `Loading progress: ${Math.round(this.loadingProgress)}% complete. ${this.getLoadingStatusText()}`;
  }

  // ============================================
  // UTILITY AND HELPER METHODS
  // ============================================

  // Utility Methods
  private showNotification(message: string, type: 'success' | 'info' | 'warning' | 'error'): void {
    console.log(`[${type.toUpperCase()}] ${message}`);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(message);
    }
  }

  // Analytics Methods
  trackInteraction(action: string, target: string, metadata?: any): void {
    const event = {
      action,
      target,
      metadata,
      timestamp: new Date().toISOString(),
      userId: 'current-user',
      componentVersion: '2.0.0'
    };

    console.log('Analytics event:', event);
  }

  // ============================================
  // PERFORMANCE OPTIMIZATION METHODS
  // ============================================

  // Performance Methods
  trackByInsightId(index: number, insight: KeyInsight): number {
    return insight.id;
  }

  trackBySceneId(index: number, scene: StoryboardScene): number {
    return scene.id;
  }

  trackByImageId(index: number, image: UploadedImage): string {
    return image.id;
  }

  trackBySavedImageId(index: number, image: SavedImage): number {
    return image.id;
  }

  // ============================================
  // UI INTERACTION METHODS
  // ============================================

  /**
   * Toggle FAB menu
   */
  toggleFabMenu(): void {
    this.showFabMenu = !this.showFabMenu;
  }

  /**
   * Close FAB menu
   */
  closeFabMenu(): void {
    this.showFabMenu = false;
  }

  /**
   * Toggle keyboard shortcuts help
   */
  toggleKeyboardShortcuts(): void {
    this.showKeyboardShortcuts = !this.showKeyboardShortcuts;
  }

  /**
   * Close keyboard shortcuts help
   */
  closeKeyboardShortcuts(): void {
    this.showKeyboardShortcuts = false;
  }

  /**
   * Handle clicks outside of FAB menu
   */
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.floating-actions')) {
      this.showFabMenu = false;
    }
  }

  // Carousel Methods
  scrollCarousel(direction: 'left' | 'right'): void {
    const carousel = document.querySelector('.insights-carousel') as HTMLElement;
    if (carousel) {
      const scrollAmount = 340; // Card width + gap
      const currentScroll = carousel.scrollLeft;

      if (direction === 'left') {
        carousel.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: 'smooth'
        });
      } else {
        carousel.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  }

  // Get selected insight title for storyboard header
  getSelectedInsightTitle(): string {
    const insight = this.keyInsights?.find((i: { id: number | null; }) => i.id === this.selectedInsightId);
    return insight?.title || '';
  }

  // ============================================
  // IMAGE UPLOAD AND MANAGEMENT METHODS
  // ============================================

  // Image upload methods (if needed for future features)
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFileSelection(Array.from(input.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    if (event.dataTransfer?.files) {
      this.handleFileSelection(Array.from(event.dataTransfer.files));
    }
  }

  private handleFileSelection(files: File[]): void {
    console.log('Files selected:', files.length);
    
    // Validate files
    const validFiles = files.filter(file => this.validateFile(file));
    
    if (validFiles.length !== files.length) {
      this.showNotification(
        `${files.length - validFiles.length} files were rejected due to validation errors`,
        'warning'
      );
    }

    // Check total file limit
    if (this.uploadedImages.length + validFiles.length > this.maxFiles) {
      this.showNotification(
        `Cannot upload more than ${this.maxFiles} files. Current: ${this.uploadedImages.length}`,
        'error'
      );
      return;
    }

    // Process valid files
    validFiles.forEach(file => this.processFile(file));
  }

  private validateFile(file: File): boolean {
    // Check file type
    if (!this.allowedTypes.includes(file.type)) {
      this.showNotification(`File type ${file.type} is not allowed`, 'error');
      return false;
    }

    // Check file size
    if (file.size > this.maxFileSize) {
      this.showNotification(
        `File ${file.name} is too large. Maximum size: ${this.maxFileSize / (1024 * 1024)}MB`,
        'error'
      );
      return false;
    }

    return true;
  }

  private processFile(file: File): void {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const uploadedImage: UploadedImage = {
        id: this.generateUniqueId(),
        name: file.name,
        size: file.size,
        type: file.type,
        preview: e.target?.result as string,
        file: file
      };

      this.uploadedImages.push(uploadedImage);
      console.log('File processed:', uploadedImage.name);
    };

    reader.readAsDataURL(file);
  }

  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  removeUploadedImage(imageId: string): void {
    this.uploadedImages = this.uploadedImages.filter(img => img.id !== imageId);
    console.log('Removed uploaded image:', imageId);
  }

  removeSavedImage(imageId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;

    // Call API to delete from backend
    // this.tamemService.deleteImage(imageId).subscribe({...});
    
    this.savedImages = this.savedImages.filter(img => img.id !== imageId);
    console.log('Removed saved image:', imageId);
  }

  // ============================================
  // MODAL AND VIEW METHODS
  // ============================================

  viewImage(image: UploadedImage | SavedImage): void {
    this.selectedImageForView = image;
    this.allImages = [...this.uploadedImages, ...this.savedImages];
    this.currentImageIndex = this.allImages.findIndex(img => 
      'id' in img && 'id' in image ? img.id === image.id : false
    );
  }

  closeImageModal(): void {
    this.selectedImageForView = null;
    this.currentImageIndex = -1;
  }

  navigateImage(direction: 'prev' | 'next'): void {
    if (direction === 'prev' && this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else if (direction === 'next' && this.currentImageIndex < this.allImages.length - 1) {
      this.currentImageIndex++;
    }
    
    this.selectedImageForView = this.allImages[this.currentImageIndex];
  }

  // ============================================
  // ADVANCED LOADING FEATURES
  // ============================================

  /**
   * Simulate realistic loading steps for better UX
   */
  private simulateLoadingSteps(): void {
    const steps = [
      { step: 1, delay: 0, message: 'Connecting to AI service...' },
      { step: 2, delay: 800, message: 'Analyzing insight content...' },
      { step: 3, delay: 2000, message: 'Generating visual elements...' },
    ];

    steps.forEach(({ step, delay }) => {
      setTimeout(() => {
        if (this.isLoading) {
          this.loadingStep = step;
          this.cdr.detectChanges();
        }
      }, delay);
    });
  }

  /**
   * Get dynamic loading messages
   */
  getDynamicLoadingMessage(): string {
    const messages = [
      'Creating engaging visual content...',
      'Optimizing for educational impact...',
      'Building interactive elements...',
      'Finalizing storyboard structure...'
    ];

    const index = Math.floor(this.loadingProgress / 25);
    return messages[Math.min(index, messages.length - 1)];
  }

  /**
   * Handle loading timeout (fallback)
   */
  private handleLoadingTimeout(): void {
    setTimeout(() => {
      if (this.isLoading) {
        console.warn('Loading timeout reached, stopping animation');
        this.stopLoadingAnimation();
        this.isLoading = false;
        this.showNotification('Loading timed out. Please try again.', 'error');
      }
    }, 30000); // 30 seconds timeout
  }

  // ============================================
  // ERROR HANDLING AND RECOVERY
  // ============================================

  /**
   * Handle network errors gracefully
   */
  private handleNetworkError(error: any): void {
    console.error('Network error:', error);
    
    if (error.status === 0) {
      this.showNotification('Network connection lost. Please check your internet connection.', 'error');
    } else if (error.status >= 500) {
      this.showNotification('Server error. Please try again later.', 'error');
    } else if (error.status === 429) {
      this.showNotification('Too many requests. Please wait a moment and try again.', 'warning');
    } else {
      this.showNotification('An unexpected error occurred. Please try again.', 'error');
    }
  }

  /**
   * Retry failed operations
   */
  retryLastOperation(): void {
    if (this.selectedInsightId) {
      console.log('Retrying operation for insight:', this.selectedInsightId);
      this.selectInsight(this.selectedInsightId);
    }
  }

  // ============================================
  // ACCESSIBILITY HELPERS
  // ============================================

  /**
   * Get ARIA label for insight cards
   */
  getInsightAriaLabel(insight: any, index: number): string {
    const statusText = this.isInsightLoading(insight.id) ? 'Loading' : 'Ready';
    return `Insight ${index + 1}: ${insight.learning_objective}. Type: ${insight.insight_type}. Status: ${statusText}`;
  }

  /**
   * Get ARIA live region text for loading states
   */
  getAriaLiveText(): string {
    if (!this.isLoading) return '';
    return `${this.getLoadingStatusText()} ${Math.round(this.loadingProgress)}% complete`;
  }

  /**
   * Handle focus management during loading
   */
  private manageFocusDuringLoading(): void {
    if (this.isLoading) {
      // Move focus to loading container for screen readers
      const loadingContainer = document.querySelector('.frames-loading-state');
      if (loadingContainer) {
        (loadingContainer as HTMLElement).focus();
      }
    }
  }

  // ============================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================

  /**
   * Debounce rapid insight selections
   */
  private debounceInsightSelection = this.debounce((insightId: number) => {
    this.selectInsight(insightId);
  }, 300);

  /**
   * Debounce utility function
   */
  private debounce(func: Function, wait: number): Function {
    let timeout: any;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Optimize carousel scrolling
   */
  private optimizedCarouselScroll = this.throttle((direction: 'left' | 'right') => {
    this.scrollCarousel(direction);
  }, 100);

  /**
   * Throttle utility function
   */
  private throttle(func: Function, limit: number): Function {
    let inThrottle: boolean;
    return (...args: any[]) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // ============================================
  // LOCAL STORAGE AND PREFERENCES
  // ============================================

  /**
   * Save user preferences to localStorage
   */
  private saveUserPreferences(): void {
    const preferences = {
      selectedFilter: this.currentFilter,
      lastSelectedInsight: this.selectedInsightId,
      viewMode: this.activeTab
    };

    try {
      localStorage.setItem('insightsPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.warn('Could not save preferences to localStorage:', error);
    }
  }

  /**
   * Load user preferences from localStorage
   */
  private loadUserPreferences(): void {
    try {
      const preferences = localStorage.getItem('insightsPreferences');
      if (preferences) {
        const parsed = JSON.parse(preferences);
        this.currentFilter = parsed.selectedFilter || 'all';
        this.activeTab = parsed.viewMode || 'insights';
        // Note: Don't auto-select last insight as it might trigger unwanted API calls
      }
    } catch (error) {
      console.warn('Could not load preferences from localStorage:', error);
    }
  }

  // ============================================
  // ANIMATION CALLBACKS
  // ============================================

  /**
   * Handle animation end events
   */
  onAnimationEnd(event: AnimationEvent): void {
    console.log('Animation ended:', event.animationName);
    
    if (event.animationName === 'framesLoadingSlideIn') {
      // Animation completed, focus management
      this.manageFocusDuringLoading();
    }
  }

  /**
   * Handle transition end events
   */
  onTransitionEnd(event: TransitionEvent): void {
    console.log('Transition ended:', event.propertyName);
    
    if (event.propertyName === 'opacity' && !this.isLoading) {
      // Loading completed, cleanup any temporary states
      this.cleanupLoadingStates();
    }
  }

  /**
   * Cleanup temporary loading states
   */
  private cleanupLoadingStates(): void {
    // Remove any temporary CSS classes
    const loadingElements = document.querySelectorAll('.temp-loading');
    loadingElements.forEach(el => el.classList.remove('temp-loading'));
    
    // Reset any temporary variables
    this.loadingStep = 1;
    this.loadingProgress = 0;
  }

  // ============================================
  // COMPONENT COMMUNICATION
  // ============================================

  /**
   * Handle messages from child components
   */
  onChildComponentMessage(message: any): void {
    console.log('Message from child component:', message);
    
    switch (message.type) {
      case 'FRAMES_UPDATED':
        this.handleFramesUpdated(message.data);
        break;
      case 'FRAME_ERROR':
        this.handleFrameError(message.error);
        break;
      case 'PROGRESS_UPDATE':
        this.handleProgressUpdate(message.progress);
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  }

  /**
   * Handle frames updated from child component
   */
  private handleFramesUpdated(framesData: any): void {
    this.selectedInsightFrames = framesData;
    this.showNotification('Frames updated successfully', 'success');
  }

  /**
   * Handle frame errors from child component
   */
  private handleFrameError(error: any): void {
    console.error('Frame error:', error);
    this.showNotification('Error updating frames', 'error');
  }

  /**
   * Handle progress updates from child component
   */
  private handleProgressUpdate(progress: number): void {
    this.loadingProgress = Math.max(this.loadingProgress, progress);
  }

  // ============================================
  // DEVELOPMENT AND DEBUGGING HELPERS
  // ============================================

  /**
   * Debug information (only in development)
   */
  getDebugInfo(): any {
    return {
      componentVersion: '2.1.0',
      selectedInsightId: this.selectedInsightId,
      isLoading: this.isLoading,
      loadingStep: this.loadingStep,
      loadingProgress: this.loadingProgress,
      frameCount: this.selectedInsightFrameCount,
      insightCount: this.totalInsights,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Log component state for debugging
   */
  logComponentState(): void {
    console.group('Insights Component State');
    console.log('Debug Info:', this.getDebugInfo());
    console.log('Current Insights:', this.currentInsights);
    console.log('Selected Frames:', this.selectedInsightFrames);
    console.log('Loading State:', {
      isLoading: this.isLoading,
      step: this.loadingStep,
      progress: this.loadingProgress
    });
    console.groupEnd();
  }

  // ============================================
  // LIFECYCLE METHODS
  // ============================================

  ngAfterViewInit(): void {
    // Component view has been initialized
    console.log('Insights component view initialized');
    
    // Load user preferences
    this.loadUserPreferences();
    
    // Setup intersection observers for performance
    this.setupIntersectionObservers();
  }

  ngAfterViewChecked(): void {
    // Detect changes that might affect layout
    if (this.selectedInsightFrames && !this.isLoading) {
      // Ensure proper layout after frames are loaded
      this.cdr.detectChanges();
    }
  }

  /**
   * Setup intersection observers for lazy loading and performance
   */
  private setupIntersectionObservers(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Handle visible elements for performance optimization
          entry.target.classList.add('in-viewport');
        } else {
          entry.target.classList.remove('in-viewport');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Observe insight cards for performance
    setTimeout(() => {
      const insightCards = document.querySelectorAll('.insight-card-horizontal');
      insightCards.forEach(card => observer.observe(card));
    }, 100);
  }

  /**
   * Enhanced lifecycle cleanup
   */
  ngOnDestroy(): void {
    console.log('Key Insights component destroyed');
    
    // Stop loading animations
    this.stopLoadingAnimation();
    
    // Save user preferences
    this.saveUserPreferences();
    
    // Remove keyboard event listeners
    document.removeEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
    
    // Clear any pending timeouts or intervals
    if (this.loadingInterval) {
      clearInterval(this.loadingInterval);
    }
    if (this.stepTimer) {
      clearTimeout(this.stepTimer);
    }
    
    // Cleanup subscriptions
    // Note: Angular handles Observable subscriptions automatically for HTTP requests
    
    // Cleanup any DOM observers
    const observers = document.querySelectorAll('[data-observer]');
    observers.forEach(element => {
      // Cleanup intersection observers if they exist
      const observer = (element as any).__observer__;
      if (observer) {
        observer.disconnect();
      }
    });
    
    // Reset all states
    this.selectedInsightId = null;
    this.selectedInsightFrames = null;
    this.isLoading = false;
    this.isLoadingFrames = false;
    this.showFabMenu = false;
    this.showKeyboardShortcuts = false;
    this.selectedImageForView = null;
    this.currentImageIndex = -1;
    
    // Clear arrays
    this.uploadedImages = [];
    this.savedImages = [];
    this.generatedInsights = [];
    this.allImages = [];
    
    console.log('Insights component cleanup completed');
  }
}