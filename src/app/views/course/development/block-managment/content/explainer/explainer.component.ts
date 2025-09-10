import { Component, Input, inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TamemService } from '@/app/core/service/tamem-service.service';

@Component({
  selector: 'block-managment-content-explainer',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './explainer.component.html',
  styleUrl: './explainer.component.scss'
})
export class BlockManagmentContentExplainerComponent implements OnInit, OnChanges {
  @Input() blockId: number = 0;
  
  // Current content from the server
  currentContent: string | null = null;
  
  // Generated content
  generatedContent: string = '';
  
  // Loading states
  isLoadingCurrent: boolean = false;
  isLoading: boolean = false;
  isSaving: boolean = false;
  
  // Error handling
  error: string = '';

  private tamemService = inject(TamemService);
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Auto-load current content when component initializes
    if (this.blockId && this.blockId > 0) {
      this.loadCurrentContent();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Auto-load current content when blockId changes
    if (changes['blockId'] && this.blockId && this.blockId > 0) {
      this.loadCurrentContent();
    }
  }

  /**
   * Load the current content of the block from the server
   */
  loadCurrentContent(): void {
    if (!this.blockId || this.blockId <= 0) {
      this.error = 'Valid Block ID is required to load current content';
      return;
    }

    this.isLoadingCurrent = true;
    this.error = '';

    console.log('Loading current content for blockId:', this.blockId);

    // Use tamemService to get current block content
    this.tamemService.getBlockContent(this.blockId).subscribe({
      next: (response) => {
        console.log('Current content response:', response);
        
        // Handle different possible response structures
        let content = '';
        
        if (response.content) {
          content = response.content;
        } else if (response.data && response.data.content) {
          content = response.data.content;
        } else if (typeof response === 'string') {
          content = response;
        } else {
          console.warn('Unexpected response structure for current content:', response);
          content = response.content_explanation || '';
        }
        
        this.currentContent = content || '';
        this.isLoadingCurrent = false;
        
        console.log('Current content loaded, length:', this.currentContent.length);
      },
      error: (error) => {
        console.error('Error loading current content:', error);
        
        // If it's a 404 or content not found, that's okay - just set empty content
        if (error.status === 404 || error.message?.includes('not found')) {
          this.currentContent = '';
          console.log('No current content found - block is empty');
        } else {
          this.error = error.message || 'Failed to load current content';
          this.currentContent = null;
        }
        
        this.isLoadingCurrent = false;
      }
    });
  }

  /**
   * Generate new content based on block images
   */
  generateContent(): void {
    if (!this.blockId || this.blockId <= 0) {
      this.error = 'Valid Block ID is required to generate content';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.generatedContent = '';

    console.log('Starting content generation for blockId:', this.blockId);

    // Use tamemService to generate content based on block images
    this.tamemService.generateContentFromBlockImages(this.blockId).subscribe({
      next: (response) => {
        console.log('Full API Response:', response);
        
        // Handle different possible response structures
        let content = '';
        
        if (response.content) {
          content = response.content;
        } else if (response.data && response.data.content) {
          content = response.data.content;
        } else if (response.storyboard) {
          content = response.storyboard;
        } else if (response.data && response.data.storyboard) {
          content = response.data.storyboard;
        } else if (typeof response === 'string') {
          content = response;
        } else {
          console.warn('Unexpected response structure:', response);
          content = response.content_explanation || '';
        }
        
        console.log('Extracted content:', content);
        
        this.generatedContent = content;
        this.isLoading = false;
        this.showNotification('Content generated successfully!', 'success');
        
        console.log('Component state updated - isLoading:', this.isLoading, 'content length:', content.length);
      },
      error: (error) => {
        console.error('Error generating content:', error);
        this.error = error.message || 'Failed to generate content. Please try again.';
        this.isLoading = false;
        this.showNotification(this.error, 'error');
        
        console.log('Error state - isLoading:', this.isLoading, 'error:', this.error);
      }
    });
  }

  /**
   * Save the generated content to the block and refresh current content
   */
  saveContent(): void {
    if (!this.blockId || this.blockId <= 0) {
      this.error = 'Valid Block ID is required to save content';
      return;
    }

    if (!this.generatedContent || this.generatedContent.trim() === '') {
      this.error = 'No content to save';
      return;
    }

    this.isSaving = true;
    this.error = '';

    console.log('Starting content save for blockId:', this.blockId);

    // Use tamemService to save the content
    this.tamemService.patchBlockContent(this.blockId, this.generatedContent).subscribe({
      next: (response) => {
        console.log('Save response:', response);
        this.isSaving = false;
        this.showNotification('Content saved successfully!', 'success');
        
        // Update the current content to reflect the saved content
        this.currentContent = this.generatedContent;
        
        // Clear the generated content since it's now saved
        this.generatedContent = '';
        
        console.log('Save completed - isSaving:', this.isSaving);
        console.log('Current content updated with saved content');
      },
      error: (error) => {
        console.error('Error saving content:', error);
        this.error = error.message || 'Failed to save content. Please try again.';
        this.isSaving = false;
        this.showNotification(this.error, 'error');
        
        console.log('Save error state - isSaving:', this.isSaving, 'error:', this.error);
      }
    });
  }

  /**
   * Discard the generated content without saving
   */
  discardGenerated(): void {
    this.generatedContent = '';
    this.showNotification('Generated content discarded', 'success');
    console.log('Generated content discarded');
  }

  /**
   * Clear all content (both current view and generated)
   */
  clearContent(): void {
    this.generatedContent = '';
    this.currentContent = null;
    this.error = '';
    console.log('All content cleared');
  }

  /**
   * Refresh current content (useful after external changes)
   */
  refreshCurrentContent(): void {
    this.loadCurrentContent();
  }

  /**
   * Show notification to user
   */
  private showNotification(message: string, type: 'success' | 'error'): void {
    // Implement your notification logic here
    console.log(`NOTIFICATION ${type.toUpperCase()}: ${message}`);
    
    // Example: You might want to show this in the UI temporarily
    if (type === 'success') {
      // Handle success notification
      console.log('✅ Success notification:', message);
    } else {
      // Handle error notification  
      console.log('❌ Error notification:', message);
    }
    
    // TODO: Replace with your actual notification system
    // For now, you can use a simple alert for testing
    // alert(`${type.toUpperCase()}: ${message}`);
  }

  /**
   * Helper method to check if content has changed
   */
  get hasContentChanged(): any {
    return this.currentContent !== this.generatedContent && 
           this.generatedContent && 
           this.generatedContent.trim() !== '';
  }

  /**
   * Helper method to get content comparison stats
   */
  get comparisonStats(): { currentLength: number, generatedLength: number, difference: number } {
    const currentLength = this.currentContent?.length || 0;
    const generatedLength = this.generatedContent?.length || 0;
    const difference = generatedLength - currentLength;
    
    return {
      currentLength,
      generatedLength,
      difference
    };
  }
}