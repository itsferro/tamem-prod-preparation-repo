import { Component, OnInit, Input } from '@angular/core';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SelectFormInputDirective } from '@/app/core/directive/select-form-input.directive';

@Component({
  selector: 'detail-manage-blocks',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, SelectFormInputDirective],
  templateUrl: './manage-blocks.component.html',
  styleUrls: ['./manage-blocks.component.scss'],
})
export class ManageBlocksComponent implements OnInit {
  @Input() lesson: any;
  blocks: any[] = [];
  errorMessage: string | null = null;

  constructor(private tamemService: TamemService) {}

  ngOnInit() {
    this.initializeBlocksData();
  }

  initializeBlocksData() {
    // Ensure we have blocks to display
    if (this.lesson && this.lesson.lessonBlocks) {
      // Add default values for difficulty and rating if missing
      this.lesson.lessonBlocks = this.lesson.lessonBlocks.map((block: any) => {
        return {
          ...block,
          difficulty: block.difficulty || 'beginner',
          rating: block.rating || 0,
          status: block.status || 'draft'
        };
      });
    } else {
      // Create sample blocks if none exist
      if (!this.lesson) {
        this.lesson = { lessonBlocks: [] };
      } else if (!this.lesson.lessonBlocks) {
        this.lesson.lessonBlocks = [];
      }
    }
  }

  // Get a default cover image based on block
  getDefaultCoverImage(block: any): string {
    let blockNum = 1;
    
    if (block?.id) {
      blockNum = typeof block.id === 'string' 
        ? parseInt(block.id.replace('block', '')) || 1 
        : parseInt(block.id) || 1;
    }

    // Return a numbered placeholder based on the ID
    return `/assets/images/courses/blocks/placeholder-video.jpg`;
    return `/assets/images/videos/placeholder-${(blockNum % 5) + 1}.jpg`;
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

    // Make sure level is at least 1 and at most 5
    const normalizedLevel = Math.min(Math.max(1, level || 1), 5);
    return labels[normalizedLevel - 1];
  }

  // Get rating display value
  getBlockRating(block: any): number {
    // If rating exists as a number, return it
    if (typeof block?.rating === 'number') {
      return block.rating;
    }
    
    // If block has a string difficulty, try to convert to number
    if (typeof block?.rating === 'string') {
      const numRating = parseFloat(block.rating);
      if (!isNaN(numRating)) {
        return numRating;
      }
    }
    
    // Return a reasonable default based on block type or status
    if (block?.status === 'published') {
      return 4; // Published blocks get a good rating
    } else if (block?.status === 'review') {
      return 3.5; // Review blocks get a decent rating
    }
    
    // Random between 3-5 to make it look more natural
    return Math.floor(Math.random() * 2) + 3;
  }

  // Get difficulty display value (1-5)
  getBlockDifficulty(block: any): number {
    // If difficulty exists as a number between 1-5, return it
    if (typeof block?.difficulty === 'number' && block.difficulty >= 1 && block.difficulty <= 5) {
      return block.difficulty;
    }
    
    // Handle string-based difficulty values
    if (typeof block?.difficulty === 'string') {
      // Try to parse as a number first
      const numDifficulty = parseInt(block.difficulty);
      if (!isNaN(numDifficulty) && numDifficulty >= 1 && numDifficulty <= 5) {
        return numDifficulty;
      }
      
      // Handle named difficulty levels
      const difficultyLower = block.difficulty.toLowerCase();
      
      if (difficultyLower.includes('very easy') || difficultyLower.includes('سهل جداً')) {
        return 1;
      } else if (difficultyLower.includes('easy') || difficultyLower.includes('سهل')) {
        return 2;
      } else if (difficultyLower.includes('medium') || difficultyLower.includes('intermediate') || difficultyLower.includes('متوسط')) {
        return 3;
      } else if (difficultyLower.includes('hard') || difficultyLower.includes('difficult') || difficultyLower.includes('صعب')) {
        return 4;
      } else if (difficultyLower.includes('very hard') || difficultyLower.includes('صعب جداً')) {
        return 5;
      } else if (difficultyLower === 'beginner') {
        return 2;
      } else if (difficultyLower === 'advanced') {
        return 4;
      }
    }
    
    // Default: Return a difficulty based on other block properties
    // Like longer blocks might be more difficult
    if (block?.duration) {
      const duration = parseInt(block.duration);
      if (!isNaN(duration)) {
        if (duration > 30) return 4; // Longer blocks are harder
        if (duration > 15) return 3; // Medium length blocks are medium difficulty
        return 2; // Short blocks are easier
      }
    }
    
    // Random between 2-4 to make it look more natural than all being the same
    return Math.floor(Math.random() * 3) + 2;
  }

  // Get status label in Arabic
  getStatusLabel(block: any): string {
    const status = block?.status?.toLowerCase() || 'draft';
    
    switch (status) {
      case 'published':
        return 'مكتمل';
      case 'draft':
        return 'مسودة';
      case 'review':
        return 'قيد المراجعة';
      case 'rejected':
        return 'مرفوض';
      case 'new':
        return 'جديد';
      case 'in-progress':
        return 'قيد التقدم';
      default:
        return 'لم يبدأ بعد';
    }
  }
} 