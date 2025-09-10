import { ChangeDetectorRef, Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { BlockManagmentInsightScenesComponent } from './storyboard/scenes/scenes.component';
import { BlockManagmentAiApiManagerComponent } from './ai-api-manager/ai-api-manager.component';
import { BlockManagmentContentExplainerComponent } from '../content-explainer/content-explainer.component';

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
  selector: 'block-managment-key-insights',
  standalone: true,
  imports: [CommonModule, FormsModule, BlockManagmentInsightScenesComponent, BlockManagmentAiApiManagerComponent , BlockManagmentContentExplainerComponent],
  templateUrl: './key-insights.component.html',
  styleUrl: './key-insights.component.scss'
})
export class BlockManagmentKeyInsightsComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private tamemService = inject(TamemService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  blockId: number = 0;

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

  // AI Insights Generation
  isGeneratingInsights: boolean = false;
  generatedInsights: any[] = [];

  // Mock Data - Enhanced with new properties
  blockInfo: BlockInfo = {
    id: 1,
    title: "Advanced Angular Component Architecture",
    lessonName: "Angular Component Mastery",
    courseName: "Modern Web Development with Angular",
    description: "Master the art of building scalable, maintainable Angular components with advanced patterns, lifecycle management, and performance optimization techniques.",
    duration: "45 minutes",
    difficulty: "intermediate",
    content: `# Advanced Angular Component Architecture

## Module Overview
In this comprehensive module, you'll explore:

### 1. Component Design Patterns
- Smart vs Presentational Components
- Container/Component Pattern
- Higher-Order Components
- Component Composition Strategies

### 2. Advanced Lifecycle Management
- OnPush Change Detection Strategy
- Async Operations in Components
- Memory Leak Prevention
- Performance Optimization

### 3. State Management
- Component State Patterns
- Parent-Child Communication
- Service-based State Sharing
- Observable Patterns

### 4. Testing Strategies
- Unit Testing Components
- Integration Testing
- Component Mocking
- Test-Driven Development

### 5. Performance Optimization
- Change Detection Optimization
- Lazy Loading Components
- Bundle Size Optimization
- Runtime Performance

This module combines theoretical knowledge with hands-on exercises to ensure you can apply these concepts in real-world applications.`,
    lastUpdated: "2024-01-15T10:30:00Z"
  };

  keyInsights: KeyInsight[] = [
    {
      id: 1,
      title: "Smart vs Presentational Components",
      description: "Learn the fundamental architectural pattern that separates business logic from presentation concerns for better maintainability.",
      content: "Smart components handle data and business logic, while presentational components focus purely on rendering UI. This separation improves testability and reusability.",
      type: "concept",
      priority: "high",
      estimatedDuration: "12 minutes",
      tags: ["architecture", "design-patterns", "best-practices"],
      hasStoryboard: true,
      storyboardScenes: 5,
      createdAt: "2024-01-10T09:00:00Z",
      status: "approved",
      completionPercentage: 100
    },
    {
      id: 2,
      title: "OnPush Change Detection Strategy",
      description: "Optimize your Angular app performance by implementing OnPush change detection strategy effectively.",
      content: "OnPush strategy reduces the number of change detection cycles by only checking components when their inputs change or events are triggered.",
      type: "practice",
      priority: "high",
      estimatedDuration: "18 minutes",
      tags: ["performance", "change-detection", "optimization"],
      hasStoryboard: true,
      storyboardScenes: 7,
      createdAt: "2024-01-10T10:15:00Z",
      status: "approved",
      completionPercentage: 100
    },
    {
      id: 3,
      title: "Component Communication Patterns",
      description: "Master various techniques for components to communicate effectively in complex Angular applications.",
      content: "Explore @Input/@Output, ViewChild, Services, and RxJS patterns for robust component communication strategies.",
      type: "example",
      priority: "high",
      estimatedDuration: "15 minutes",
      tags: ["communication", "input-output", "services", "rxjs"],
      hasStoryboard: true,
      storyboardScenes: 6,
      createdAt: "2024-01-11T14:20:00Z",
      status: "review",
      completionPercentage: 85
    },
    {
      id: 4,
      title: "Advanced Lifecycle Hooks",
      description: "Deep dive into Angular lifecycle hooks and learn when and how to use each one effectively.",
      content: "Beyond ngOnInit and ngOnDestroy, explore ngOnChanges, ngAfterViewInit, and other hooks for precise component control.",
      type: "concept",
      priority: "medium",
      estimatedDuration: "20 minutes",
      tags: ["lifecycle", "hooks", "advanced", "component-lifecycle"],
      hasStoryboard: false,
      storyboardScenes: 0,
      createdAt: "2024-01-12T11:45:00Z",
      status: "draft",
      completionPercentage: 60
    },
    {
      id: 5,
      title: "Testing Component Architecture",
      description: "Learn comprehensive testing strategies for complex Angular component hierarchies.",
      content: "Implement unit tests, integration tests, and end-to-end tests for your component architecture patterns.",
      type: "practice",
      priority: "medium",
      estimatedDuration: "25 minutes",
      tags: ["testing", "unit-tests", "integration", "e2e"],
      hasStoryboard: true,
      storyboardScenes: 4,
      createdAt: "2024-01-13T16:30:00Z",
      status: "approved",
      completionPercentage: 100
    },
    {
      id: 6,
      title: "Performance Best Practices Summary",
      description: "Essential performance optimization techniques and common pitfalls to avoid in Angular components.",
      content: "A comprehensive summary of performance best practices including change detection, memory management, and bundle optimization.",
      type: "summary",
      priority: "low",
      estimatedDuration: "8 minutes",
      tags: ["performance", "summary", "best-practices", "optimization"],
      hasStoryboard: true,
      storyboardScenes: 3,
      createdAt: "2024-01-14T12:00:00Z",
      status: "approved",
      completionPercentage: 100
    }
  ];

  storyboardData: StoryboardInfo = {
    id: 1,
    keyInsightId: 1,
    title: "Smart vs Presentational Components Visual Guide",
    description: "An interactive visual journey through the smart/presentational component pattern with real-world examples and implementation strategies.",
    totalScenes: 5,
    estimatedDuration: "12 minutes",
    style: "animated",
    status: "in-progress",
    lastUpdated: "2024-01-14T15:20:00Z",
    scenes: [
      {
        id: 1,
        sceneNumber: 1,
        title: "Introduction to Component Patterns",
        description: "Overview of component architecture patterns and why separation of concerns matters",
        duration: "2.5 minutes",
        frameCount: 12,
        status: "finalized"
      },
      {
        id: 2,
        sceneNumber: 2,
        title: "Smart Components Deep Dive",
        description: "Detailed exploration of smart components, their responsibilities, and implementation",
        duration: "3 minutes",
        frameCount: 15,
        status: "finalized"
      },
      {
        id: 3,
        sceneNumber: 3,
        title: "Presentational Components",
        description: "Understanding presentational components and their role in the architecture",
        duration: "2.5 minutes",
        frameCount: 10,
        status: "sketched"
      },
      {
        id: 4,
        sceneNumber: 4,
        title: "Real-World Implementation",
        description: "Step-by-step implementation of the pattern in a real Angular application",
        duration: "3 minutes",
        frameCount: 18,
        status: "sketched"
      },
      {
        id: 5,
        sceneNumber: 5,
        title: "Testing and Best Practices",
        description: "How to test components following this pattern and common best practices",
        duration: "1 minute",
        frameCount: 8,
        status: "planned"
      }
    ]
  };

  ngOnInit(): void {
    // Subscribe to route params to get the lessonBlockId
    this.route.paramMap.subscribe(params => {
      this.blockId = Number(params.get('blockId'));

      if (isNaN(this.blockId)) {
        console.error('Invalid blockId parameter:', this.blockId);
        this.blockId = 0;
      } else {
        this.loadBLockInfo();
      }
    });

    console.log('Key Insights component initialized');
    this.initializeAnimations();
    this.loadInsightsData();
  }

  // Tab Management
  setActiveTab(tab: 'insights' | 'images'): void {
    this.activeTab = tab;
    console.log('Active tab changed to:', tab);
    
    // Load saved images when images tab is activated
    if (tab === 'images' && this.savedImages.length === 0) {
      this.loadSavedImages();
    }
  }

  // Image Upload Methods
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
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
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  private handleFiles(files: File[]): void {
    const validFiles = files.filter(file => this.validateFile(file));
    
    if (this.uploadedImages.length + validFiles.length > this.maxFiles) {
      this.showNotification(`Maximum ${this.maxFiles} images allowed`, 'warning');
      return;
    }

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image: UploadedImage = {
          id: this.generateImageId(),
          name: file.name,
          size: file.size,
          type: file.type,
          preview: e.target?.result as string,
          file: file
        };
        this.uploadedImages.push(image);
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    });
  }

  private validateFile(file: File): boolean {
    if (!this.allowedTypes.includes(file.type)) {
      this.showNotification(`Invalid file type: ${file.name}`, 'error');
      return false;
    }

    if (file.size > this.maxFileSize) {
      this.showNotification(`File too large: ${file.name}`, 'error');
      return false;
    }

    return true;
  }

  private generateImageId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  removeImage(imageId: string): void {
    this.uploadedImages = this.uploadedImages.filter(img => img.id !== imageId);
    this.showNotification('Image removed', 'info');
  }

  // Remove saved image
  removeSavedImage(imageId: number): void {
    if (confirm('Are you sure you want to delete this image?')) {
      this.tamemService.deleteAttachment(imageId.toString()).subscribe({
        next: (response) => {
          this.savedImages = this.savedImages.filter(img => img.id !== imageId);
          this.showNotification('Image deleted successfully', 'success');
        },
        error: (error) => {
          console.error('Error deleting image:', error);
          this.showNotification('Failed to delete image', 'error');
        }
      });
    }
  }

  viewImage(image: UploadedImage | SavedImage): void {
    // Combine all images for navigation
    this.allImages = [...this.uploadedImages, ...this.savedImages];
    
    // Find current image index
    this.currentImageIndex = this.allImages.findIndex(img => {
      if (this.isSavedImage(image) && this.isSavedImage(img)) {
        return img.id === image.id;
      } else if (!this.isSavedImage(image) && !this.isSavedImage(img)) {
        return img.id === image.id;
      }
      return false;
    });
    
    this.selectedImageForView = image;
  }

  closeImageModal(): void {
    this.selectedImageForView = null;
    this.currentImageIndex = -1;
    this.allImages = [];
  }

  // Navigate to next image in modal
  nextImage(): void {
    if (this.currentImageIndex < this.allImages.length - 1) {
      this.currentImageIndex++;
      this.selectedImageForView = this.allImages[this.currentImageIndex];
    }
  }

  // Navigate to previous image in modal
  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.selectedImageForView = this.allImages[this.currentImageIndex];
    }
  }

  // Check if there's a next image
  hasNextImage(): boolean {
    return this.currentImageIndex < this.allImages.length - 1;
  }

  // Check if there's a previous image
  hasPreviousImage(): boolean {
    return this.currentImageIndex > 0;
  }

  // Get current image position info
  getCurrentImagePosition(): string {
    if (this.allImages.length === 0) return '';
    return `${this.currentImageIndex + 1} of ${this.allImages.length}`;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Drag and Drop Reordering Methods - REMOVED
  // Keeping only manual reordering methods

  // Manual reordering methods
  moveImageUp(index: number): void {
    if (index > 0) {
      this.reorderImages(index, index - 1);
      this.showNotification('Image moved up', 'info');
    }
  }

  moveImageDown(index: number): void {
    if (index < this.uploadedImages.length - 1) {
      this.reorderImages(index, index + 1);
      this.showNotification('Image moved down', 'info');
    }
  }

  private reorderImages(fromIndex: number, toIndex: number): void {
    const draggedImage = this.uploadedImages[fromIndex];
    
    // Create a new array to trigger change detection
    const newImages = [...this.uploadedImages];
    
    // Remove from old position
    newImages.splice(fromIndex, 1);
    
    // Insert at new position
    newImages.splice(toIndex, 0, draggedImage);
    
    // Update the array
    this.uploadedImages = newImages;
    
    console.log('Reordered images:', this.uploadedImages.map((img, i) => `${i + 1}: ${img.name}`));
  }

  // Reset image order to original upload order
  resetImageOrder(): void {
    if (confirm('Reset all images to their original upload order?')) {
      // Sort by the timestamp in the ID (which contains Date.now())
      this.uploadedImages.sort((a, b) => {
        const timeA = parseInt(a.id.substring(0, 13));
        const timeB = parseInt(b.id.substring(0, 13));
        return timeA - timeB;
      });
      this.showNotification('Image order reset to original upload order', 'info');
    }
  }

  // Updated saveImages method to work with new API
  saveImages(): void {
    if (this.uploadedImages.length === 0) {
      this.showNotification('No images to save', 'warning');
      return;
    }

    this.isSaving = true;
    
    // Extract files from uploadedImages in the current order
    const files = this.uploadedImages.map(image => image.file);
    
    console.log('Saving images in order:', this.uploadedImages.map((img, i) => `${i + 1}: ${img.name}`));

    // Call the updated service method
    this.tamemService.saveBlockImages(this.blockId, files).subscribe({
      next: (response) => {
        if (response.status === 'complete') {
          console.log('Images saved successfully:', response.data);
          this.showNotification('Images saved successfully in the specified order!', 'success');
          this.isSaving = false;
          
          // Clear uploaded images after successful save
          this.uploadedImages = [];
          
          // Reload saved images to show the new ones
          this.loadSavedImages();
        } else if (response.status === 'progress') {
          // You can show progress if needed
          console.log('Upload progress:', response.progress + '%');
        }
      },
      error: (error) => {
        console.error('Error saving images:', error);
        this.showNotification('Failed to save images', 'error');
        this.isSaving = false;
      }
    });
  }

  // Load saved images from backend
  loadSavedImages(): void {
    this.isLoadingImages = true;
    
    this.tamemService.getBlockImages(this.blockId).subscribe({
      next: (response) => {
        this.savedImages = response.data || [];
        console.log('Loaded saved images:', this.savedImages);
        this.isLoadingImages = false;
      },
      error: (error) => {
        console.error('Error loading saved images:', error);
        this.isLoadingImages = false;
      }
    });
  }

  // Check if image is from saved images
  isSavedImage(image: UploadedImage | SavedImage): image is SavedImage {
    return 'id' in image && typeof image.id === 'number';
  }

  // Get image URL for display
  getImageUrl(image: UploadedImage | SavedImage): string {
    if (this.isSavedImage(image)) {
      return image.url;
    } else {
      return image.preview;
    }
  }

  // Get image size display
  getImageSize(image: UploadedImage | SavedImage): string {
    if (this.isSavedImage(image)) {
      return image.formatted_size;
    } else {
      return this.formatFileSize(image.size);
    }
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
          
          // Optionally switch to insights tab to show results
          this.setActiveTab('insights');
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

  // Initialization Methods
  private initializeAnimations(): void {
    setTimeout(() => {
      this.isHeroAnimated = true;
    }, 100);
  }

  private loadBLockInfo() {
    this.tamemService.getLessonBlock(this.blockId).subscribe({
      next: (response) => {
        this.currentBlock = response;
        console.log('currentblockData => ' + JSON.stringify(this.currentBlock));
        this.blockInfo.description = response.block.description;
        this.blockInfo.duration = response.block.duration;
        this.blockInfo.title = response.block.title;
        this.blockInfo.content = response.block.block_content;
      },
      error: (error) => {
        console.error('Error loading lesson blocks:', error);
      }
    });
  }

  private loadInsightsData(): void {
    this.isLoading = true;

    this.tamemService.getKeyInsights(this.blockId).subscribe({
      next: (response) => {
        this.currentInsights = response.data;
        console.log('insights Data => ' + JSON.stringify(this.currentInsights));
      },
      error: (error) => {
        console.error('Error loading lesson blocks:', error);
      }
    });
  }

  // Insight Selection Methods
  selectInsight(insightId: number): void {
    const previousId = this.selectedInsightId;
    this.selectedInsightId = insightId;

    const insight = this.keyInsights.find(i => i.id === insightId);

    if (insight?.hasStoryboard) {
      this.showStoryboardPanel = true;
      this.updateStoryboardData(insightId);
    } else {
      this.showStoryboardPanel = false;
    }

    this.trackInsightSelection(insightId, previousId);
    console.log('Selected insight:', insight?.title);
  }

  private updateStoryboardData(insightId: number): void {
    const insight = this.keyInsights.find(i => i.id === insightId);
    if (insight) {
      this.storyboardData.keyInsightId = insightId;
      this.storyboardData.title = `${insight.title} - Visual Guide`;
      console.log('Updated storyboard for insight:', insight.title);
    }
  }

  private trackInsightSelection(newId: number, previousId: number | null): void {
    console.log('Insight selection tracked:', { newId, previousId, timestamp: new Date() });
  }

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

  // Date Formatting
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }

  // Action Methods
  addNewInsight(): void {
    console.log('Opening add new insight modal');
    this.showNotification('Add New Insight feature coming soon!', 'info');
  }

  editInsight(insightId: number): void {
    const insight = this.keyInsights.find(i => i.id === insightId);
    console.log('Editing insight:', insight?.title);
    this.showNotification(`Editing "${insight?.title}" - feature coming soon!`, 'info');
  }

  deleteInsight(insightId: number): void {
    const insight = this.keyInsights.find(i => i.id === insightId);
    if (insight && confirm(`Are you sure you want to delete "${insight.title}"?`)) {
      this.keyInsights = this.keyInsights.filter(i => i.id !== insightId);
      if (this.selectedInsightId === insightId) {
        this.selectedInsightId = null;
        this.showStoryboardPanel = false;
      }
      console.log('Deleted insight:', insight.title);
      this.showNotification(`Deleted "${insight.title}"`, 'success');
    }
  }

  openStoryboard(): void {
    const insight = this.keyInsights.find(i => i.id === this.selectedInsightId);
    console.log('Opening storyboard for:', insight?.title);
    this.showNotification('Opening storyboard viewer...', 'info');
  }

  // Filter Methods
  setFilter(filter: string): void {
    this.currentFilter = filter;
    console.log('Filter changed to:', filter);
  }

  getFilteredInsights(): KeyInsight[] {
    if (this.currentFilter === 'all') {
      return this.keyInsights;
    }
    return this.keyInsights.filter(insight => insight.type === this.currentFilter);
  }

  // Computed Properties (Getters)
  get totalInsights(): number {
    return this.keyInsights.length;
  }

  get totalStoryboards(): number {
    return 0;
  }

  get approvedInsights(): number {
    return 0;
  }

  get averageCompletionRate(): number {
    const insights = this.keyInsights.filter(i => i.completionPercentage !== undefined);
    if (insights.length === 0) return 0;

    const total = insights.reduce((sum, i) => sum + (i.completionPercentage || 0), 0);
    return Math.round(total / insights.length);
  }

  get totalEstimatedDuration(): string {
    const totalMinutes = this.keyInsights.reduce((total, insight) => {
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

  // Keyboard Navigation Support
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        if (this.showStoryboardPanel) {
          this.showStoryboardPanel = false;
          event.preventDefault();
        }
        if (this.selectedImageForView) {
          this.closeImageModal();
          event.preventDefault();
        }
        break;
      case 'ArrowLeft':
        if (this.selectedImageForView) {
          this.previousImage();
          event.preventDefault();
        }
        break;
      case 'ArrowRight':
        if (this.selectedImageForView) {
          this.nextImage();
          event.preventDefault();
        }
        break;
    }
  }

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
    const insight = this.keyInsights.find(i => i.id === this.selectedInsightId);
    return insight?.title || '';
  }

  // Lifecycle cleanup
  ngOnDestroy(): void {
    console.log('Key Insights component destroyed');
  }
}