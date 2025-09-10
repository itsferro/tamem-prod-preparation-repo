import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LearningJourneyComponent } from '../../../learning-journey/learning-journey.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';




@Component({
  selector: 'detail-lesson-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-block.component.html',
  styleUrl: './lesson-block.component.scss'
})
export class LessonBlockComponent {
  @Input() block: any;
  @Input() userProgress: any;
  @Input() isOverrideEnabled: boolean = false;
  @Input() lesson: any;
  @Input() isEditMode: boolean = false;
  @Output() editBlockEvent = new EventEmitter<any>();
  @Output() deleteBlockEvent = new EventEmitter<any>();
  @Output() startBlockEvent = new EventEmitter<any>();


  private router = inject(Router);
  private modalService = inject(NgbModal);

  constructor() {
    // Get base URL from window.location
    this.baseUrl = window.location.origin;
  }

  // Handle delete button click
  deleteBlock() {
    // Emit an event to the parent component
    this.deleteBlockEvent.emit(this.block);
  }
  // Handle edit button click
  editBlock() {
    // Emit an event to the parent component
    this.editBlockEvent.emit(this.block);
  }


  // Get a default cover image based on block
  getDefaultCoverImage(block: any): string {
    let blockNum = 1;

    // if (block?.id) {
    //   blockNum = typeof block.id === 'string'
    //     ? parseInt(block.id.replace('block', '')) || 1
    //     : parseInt(block.id) || 1;
    // }

    // Return a numbered placeholder based on the ID
    return '';
   // return `/assets/images/videos/placeholder-${(blockNum % 5) + 1}.jpg`;
  }



  // Check if a block is completed
  isBlockCompleted(block: any): boolean {
    return block?.is_completed || false;
  }

  // Check if a block is currently active
  isBlockActive(block: any): boolean {
    return block?.status === 'in-progress';
  }

  // Check if a block is locked
  isBlockLocked(block: any): boolean {
    return block?.is_locked || false;
  }

  // Get block progress percentage
  getBlockProgress(block: any): number {
    return block?.progress || 0;
  }


  // Get block order number
  getBlockOrder(block: any): number {
    return block?.display_order || block?.order || 0;
  }

  // Check if prerequisites have been completed
  hasCompletedPrerequisite(block: any): boolean {
    // Modify based on your specific prerequisite logic
    return false;
  }

  // Get the last viewed time for a block
  getLastViewedTime(block: any): string {
    if (!block.last_viewed_at) {
      return '';
    }

    const lastViewedDate = new Date(block.last_viewed_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastViewedDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'اليوم';
    } else if (diffDays === 1) {
      return 'أمس';
    } else if (diffDays < 7) {
      return `منذ ${diffDays} أيام`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `منذ ${weeks} ${weeks === 1 ? 'أسبوع' : 'أسابيع'}`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `منذ ${months} ${months === 1 ? 'شهر' : 'أشهر'}`;
    }
  }

  needsReview(block: any): boolean {
    // If no last viewed date or block is not completed, no review needed
    if (!block.last_viewed_at || !block.is_completed) {
      return false;
    }

    const lastViewedDate = new Date(block.last_viewed_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastViewedDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Use review interval from the block
    const reviewInterval = block.review_interval || 7; // Default to 7 if not specified

    // Check if days since last view exceed the review interval
    return diffDays >= reviewInterval;
  }

  // Get knowledge retention percentage for a block
  getKnowledgeRetention(block: any): number {
    // Since the current API response doesn't include knowledge retention, 
    // you might want to return a default value or calculate it differently
    return 0;
  }

  // Get study streak for a block
  getStudyStreak(block: any): number {
    // Similarly, return 0 or implement a calculation method
    return 0;
  }

  // Generate an array of star values for ratings
  getStarArray(rating: number): number[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(1);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(0.5);
    }

    // Fill the rest with empty stars
    while (stars.length < 5) {
      stars.push(0);
    }

    return stars;
  }

  // Helper function to generate arrays of length n
  getArrayOfLength(length: number): any[] {
    return Array(length).fill(0);
  }

  // Get difficulty label based on level (1-5)
  getDifficultyLabel(level: number): string {
    const labels = [
      'سهل جداً',
      'سهل',
      'متوسط',
      'صعب',
      'صعب جداً'
    ];

    return labels[Math.min(Math.max(0, level - 1), 4)];
  }

  // Inside lesson-block.component.ts - modify the startBlock method

  // startBlock(block: any) {
  //   console.log('Starting block:', block.id);
  //   this.startBlockEvent.emit(block);
  // }

  startBlock(block: any) {
    const modalRef = this.modalService.open(LearningJourneyComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static' // Prevents closing by clicking outside
    });

    // Pass block and lesson data to modal
    modalRef.componentInstance.block = block;
    modalRef.componentInstance.lesson = this.lesson;

    // Handle modal close/completion
    modalRef.result.then(
      (result) => {
        // Handle successful completion
        // Update progress, save scores etc.
      },
      (reason) => {
        // Handle dismissal
      }
    );
  }



  // In lesson-block.component.ts

  // Add this method
  navigateToStoryboard(block: any): void {
    if (block && block.id) {
      // Open storyboard in a new tab
      const url = `/course/story-board/${block.id}`;
      window.open(url, '_blank');
    }
  }

  // Base URL of the application, used for relative paths
  private baseUrl: string = '';
  // Image preview state
  previewImageUrl: SafeUrl | null = null;
  // Inject sanitizer for URL handling
  private sanitizer = inject(DomSanitizer);
  // Function to handle image URL transformation


  getImageUrl(url: string | undefined): SafeUrl | string {
    if (!url) return '';

    // If it's already a data URL (from file upload preview) or absolute URL, return as is
    if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    // If it's a relative URL starting with /storage
    if (url.startsWith('/storage')) {
      // Try to convert to absolute URL using the base URL
      const absoluteUrl = `${this.baseUrl}${url}`;
      return this.sanitizer.bypassSecurityTrustUrl(absoluteUrl);
    }

    // For other cases, return the URL as is
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


    // Handle image loading errors
    handleImageError(event: Event): void {
      const imgElement = event.target as HTMLImageElement;
      
      // If the image failed to load, try an alternative URL format
      if (imgElement.src && imgElement.src.startsWith(this.baseUrl) && imgElement.src.includes('/storage/')) {
        // Try the URL without the base origin
        const relativePath = imgElement.src.replace(this.baseUrl, '');
        imgElement.src = relativePath;
        
        console.log(`Retrying image with relative path: ${relativePath}`);
        
        // Add a backup error handler for the second attempt
        imgElement.onerror = () => {
          console.error(`Failed to load image with both absolute and relative paths: ${this.block.cover_image}`);
          imgElement.src = '/assets/images/courses/blocks/placeholder-video.jpg';  // Use a placeholder image
          imgElement.onerror = null; // Remove error handler to prevent loops
        };
      } else {
        // If already tried relative or it's another format, use placeholder
        console.error(`Failed to load image: ${imgElement.src}`);
        imgElement.src = '/assets/images/courses/blocks/placeholder-video.jpg';
        imgElement.onerror = null; // Remove error handler to prevent loops
      }
    }



}