import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockManagmentContentInsightsComponent } from './insights/insights.component';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { ActivatedRoute } from '@angular/router';
import { BlockManagmentContentImagesComponent } from './images/images.component';
import { BlockManagmentContentExplainerComponent } from './explainer/explainer.component';
import { InsightFramesComponent } from './all-insights-frames/all-insights-frames.component';

// Interface for block information
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
  viewCount?: number;
  imageCount?: number;
  insightCount?: number;
}

@Component({
  selector: 'block-managment-content',
  standalone: true,
  imports: [
    CommonModule,
    BlockManagmentContentExplainerComponent,
    BlockManagmentContentImagesComponent,
    BlockManagmentContentInsightsComponent,
    InsightFramesComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class BlockManagmentContentComponent implements OnInit {

  private tamemService = inject(TamemService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  // Component state
  currentBlock: any;
  blockInfo: BlockInfo | null = null;
  blockId: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  // Section collapse states
  sectionStates = {
    images: false,      // Start with images expanded
    explainer: false,   // Start with explainer expanded  
    insights: false,     // Start with insights expanded
    frames: true
  };

  ngOnInit(): void {
    // Subscribe to route params to get the lessonBlockId
    this.route.paramMap.subscribe(params => {
      this.blockId = Number(params.get('blockId'));

      if (isNaN(this.blockId)) {
        console.error('Invalid blockId parameter:', this.blockId);
        this.blockId = 0;
        this.errorMessage = 'Invalid block ID';
      } else {
        this.loadBlockInfo();
      }
    });
  }

  private loadBlockInfo(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.tamemService.getLessonBlock(this.blockId).subscribe({
      next: (response) => {
        this.currentBlock = response;
        console.log('currentblockData => ' + JSON.stringify(this.currentBlock));
        
        // Map response to blockInfo interface
        this.blockInfo = {
          id: this.blockId,
          title: response.block?.title || 'Untitled Block',
          description: response.block?.description || '',
          duration: response.block?.duration || '30 min',
          difficulty: response.block?.difficulty || 'beginner',
          content: response.block?.block_content || '',
          lessonName: response.lesson?.name || response.lesson?.title || 'Unknown Lesson',
          courseName: response.course?.name || response.course?.title || 'Unknown Course',
          lastUpdated: response.block?.updated_at || response.block?.created_at || new Date().toISOString(),
          viewCount: response.block?.view_count || 0,
          imageCount: response.block?.image_count || 0,
          insightCount: response.block?.insight_count || 0
        };
        
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading lesson blocks:', error);
        this.errorMessage = 'Failed to load block information';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Get total images count
  getTotalImages(): number {
    return this.blockInfo?.imageCount || 0;
  }

  // Get total insights count
  getTotalInsights(): number {
    return this.blockInfo?.insightCount || 0;
  }

  // Get view count
  getViewCount(): number {
    return this.blockInfo?.viewCount || 0;
  }

  // Format date for display
  formatDate(dateString: string): string {
    try {
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
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    } catch (error) {
      return 'Unknown';
    }
  }

  // Handle edit block action
  onEditBlock(): void {
    console.log('Edit block clicked for block ID:', this.blockId);
    // Implement edit functionality
  }

  // Handle preview block action
  onPreviewBlock(): void {
    console.log('Preview block clicked for block ID:', this.blockId);
    // Implement preview functionality
  }

  // Refresh block data
  refreshBlockData(): void {
    this.loadBlockInfo();
  }

  // Check if block has content
  hasContent(): boolean {
    return !!(this.blockInfo?.content && this.blockInfo.content.trim().length > 0);
  }

  // Get block difficulty color class
  getDifficultyClass(): string {
    if (!this.blockInfo?.difficulty) return 'difficulty-beginner';
    return `difficulty-${this.blockInfo.difficulty}`;
  }

  // Handle errors
  private handleError(error: any, context: string): void {
    console.error(`Error in ${context}:`, error);
    this.errorMessage = `Failed to ${context.toLowerCase()}`;
    this.cdr.detectChanges();
  }

  // Toggle section collapse/expand
  toggleSection(section: 'images' | 'explainer' | 'insights' | 'frames'): void {
    this.sectionStates[section] = !this.sectionStates[section];
  }

  // Check if section is expanded
  isSectionExpanded(section: 'images' | 'explainer' | 'insights' | 'frames'): boolean {
    return this.sectionStates[section];
  }

  // Expand all sections
  expandAllSections(): void {
    this.sectionStates.images = true;
    this.sectionStates.explainer = true;
    this.sectionStates.insights = true;
  }

  // Collapse all sections
  collapseAllSections(): void {
    this.sectionStates.images = false;
    this.sectionStates.explainer = false;
    this.sectionStates.insights = false;
  }

  // Component cleanup
  ngOnDestroy(): void {
    console.log('Content component destroyed');
  }
}