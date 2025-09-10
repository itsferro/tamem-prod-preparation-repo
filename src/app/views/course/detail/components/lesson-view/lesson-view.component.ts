import { Component, Input, OnInit, OnChanges, SimpleChanges, inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LessonBlockComponent } from '../lesson-block/lesson-block.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonBlockFormComponent } from '../lesson-block-form/lesson-block-form.component';
import { CommonModule } from '@angular/common';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { LessonBlockTestComponent } from '../lesson-block-test/lesson-block-test.component';
import { LessonBlockListComponent } from '../lesson-block-list/lesson-block-list.component';
import { ChangeDetectorRef } from '@angular/core';
import { LessonBlockTrackComponent } from '../lesson-block-track/lesson-block-track.component';


 

@Component({
  selector: 'detail-lesson-view',
  standalone: true,
  imports: [CommonModule, LessonBlockComponent, LessonBlockListComponent, LessonBlockTrackComponent],
  templateUrl: './lesson-view.component.html',
  styleUrl: './lesson-view.component.scss'
})
export class LessonViewComponent implements OnInit, OnChanges {
  @Input() lesson: any;
  @Input() userProgress: any;
  @Input() isOverrideEnabled: boolean = false;
  @Input() isEditMode: boolean = false;

  @Output() startJourney = new EventEmitter<any>();
  

    private cdr = inject(ChangeDetectorRef);

    
  startBlockJourney(block: any): void {
    this.startJourney.emit(block);
  }
  
  
  // Add new states
  isLoadingBlocks: boolean = false;
  errorMessage: string | null = null;
  viewMode: 'grid' | 'list' | 'track' = 'track'; // Changed from 'grid' to 'list' as default
  
  // Inject services
  private router = inject(Router);
  private modalService = inject(NgbModal);
  private tamemService = inject(TamemService);
  
  ngOnInit() {
    // Initialize progress data if needed
    if (!this.userProgress) {
      this.userProgress = {
        completionPercentage: 0,
        timeSpent: '0:00',
        lastAccessed: '',
        completedBlocks: 0,
        blockProgress: {}
      };
    }
    
    // Load blocks if we have a lesson
    if (this.lesson?.id) {
      this.loadLessonBlocks(this.lesson.id);
    }
  }
  
  ngOnChanges(changes: SimpleChanges) {
    // If lesson changes, reload blocks
    if (changes['lesson'] && !changes['lesson'].firstChange && this.lesson?.id) {
      this.loadLessonBlocks(this.lesson.id);
    }
  }
  

  loadLessonBlocks(lessonId: number) {
    this.isLoadingBlocks = true;
    this.errorMessage = null;
    
    this.tamemService.getLessonBlocks(lessonId).subscribe({
      next: (response) => {
        // Update lesson blocks with progress information
        this.lesson.lessonBlocks = response.blocks;
        this.lesson.totalBlocks = response.blocks.length;
        
        // Compute user progress
        this.userProgress = {
          completionPercentage: this.calculateCompletionPercentage(response.blocks),
          blockProgress: this.getBlockProgressMap(response.blocks),
          lastBlockId: this.findLastActiveBlockId(response.blocks),
          // Add other default progress properties
          timeSpent: '0:00',
          lastAccessed: '',
          completedBlocks: response.blocks.filter((block: { is_completed: any; }) => block.is_completed).length,
          // ... other default values
        };
        
        this.isLoadingBlocks = false;
      },
      error: (error) => {
        console.error('Error loading lesson blocks:', error);
        this.errorMessage = 'فشل في تحميل وحدات الدرس. يرجى المحاولة مرة أخرى.';
        this.isLoadingBlocks = false;
      }
    });
  }
  
  // Helper methods
  private calculateCompletionPercentage(blocks: any): number {
    if (blocks.length === 0) return 0;
    
    const totalProgress = blocks.reduce((sum: any, block: { progress: any; }) => sum + block.progress, 0);
    return (totalProgress / (blocks.length * 100)) * 100;
  }
  
  private getBlockProgressMap(blocks: any): { [key: string]: number } {
    return blocks.reduce((acc: { [x: string]: any; }, block: { id: string | number; progress: any; }) => {
      acc[block.id] = block.progress;
      return acc;
    }, {});
  }
  
  private findLastActiveBlockId(blocks: any): string | null {
    // Find the last block with any progress
    const activeBlocks = blocks.filter((block: { progress: number; }) => block.progress > 0);
    return activeBlocks.length > 0 ? activeBlocks[activeBlocks.length - 1].id : null;
  }



  // Get block name by ID
  getBlockName(blockId: string): string {
    const block = this.lesson?.lessonBlocks?.find((b: any) => b.id === blockId);
    return block?.title || 'وحدة الدراسة';
  }

  // Continue from last accessed block
  continueBlock(blockId: string) {
    console.log('Continuing from last block:', blockId);
    this.startBlock(blockId);
    


  }

  // Start or continue a specific lesson block
  startBlock(blockId: string) {
    console.log('Starting block:', blockId);

    this.startBlockJourney(blockId) ; // here we should get this action from the block it self or get the whole block by blockid 

    // Navigate to the lesson block
    // this.router.navigate(['/lesson', this.lesson?.id, 'block', blockId]);
  }

  // Navigate to view full statistics
  viewFullStatistics() {
    console.log('Viewing full statistics for:', this.lesson?.id);
    // Navigate to statistics page
    // this.router.navigate(['/lesson', this.lesson?.id, 'statistics']);
  }

  // Open modal to add new lesson block
  openAddBlockModal() {
    const modalRef = this.modalService.open(LessonBlockFormComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
    
    // Pass existing blocks to the modal
    modalRef.componentInstance.existingBlocks = this.lesson.lessonBlocks || [];
    
    // Pass the lesson ID to the modal
    modalRef.componentInstance.lessonId = this.lesson.id;
    
    // Handle the created block
    modalRef.componentInstance.blockCreated.subscribe((newBlock: any) => {
      // Add the new block to the existing array
      if (!this.lesson.lessonBlocks) {
        this.lesson.lessonBlocks = [];
      }
      
      this.lesson.lessonBlocks.push(newBlock);
      this.lesson.totalBlocks = this.lesson.lessonBlocks.length;
      
      // Sort blocks by order
      this.lesson.lessonBlocks.sort((a: any, b: any) => a.order - b.order);
      
      console.log('New block added:', newBlock);
    });
  }
  
 
  openEditBlockModal(block: any) {
    console.log('Opening edit modal with block data:', block);
    
    // Open the modal using NgbModal
    const modalRef = this.modalService.open(LessonBlockFormComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
    
    // Pass the block to edit and existing blocks
    modalRef.componentInstance.editBlock = block;
    modalRef.componentInstance.existingBlocks = this.lesson.lessonBlocks || [];
    
    // Pass the lesson ID to the modal
    modalRef.componentInstance.lessonId = this.lesson.id;
    
    // Handle the updated block
    modalRef.componentInstance.blockUpdated.subscribe((updatedBlock: any) => {
      // Find and update the block in the array
      const index = this.lesson.lessonBlocks.findIndex((b: any) => b.id === updatedBlock.id);
      
      if (index !== -1) {
        // Get the existing block
        const existingBlock = this.lesson.lessonBlocks[index];
        
        // Ensure these properties are preserved if not in the updated block
        if (!updatedBlock.last_viewed_at && existingBlock.last_viewed_at) {
          updatedBlock.last_viewed_at = existingBlock.last_viewed_at;
        }
        
        if (updatedBlock.is_completed === undefined && existingBlock.is_completed !== undefined) {
          updatedBlock.is_completed = existingBlock.is_completed;
        }
        
        if (updatedBlock.progress === undefined && existingBlock.progress !== undefined) {
          updatedBlock.progress = existingBlock.progress;
        }
        
        if (updatedBlock.status === undefined && existingBlock.status !== undefined) {
          updatedBlock.status = existingBlock.status;
        }
        
        // Important: Make sure cover_image is properly transferred
        if (updatedBlock.cover_image) {
          // Ensure we're using the same property format throughout
          existingBlock.cover_image = updatedBlock.cover_image;
        }
        
        // Update the block with preserved properties
        this.lesson.lessonBlocks[index] = { ...existingBlock, ...updatedBlock };
        
        // Re-sort blocks by order if needed
        this.lesson.lessonBlocks.sort((a: any, b: any) => {
          const orderA = a.display_order !== undefined ? a.display_order : a.order;
          const orderB = b.display_order !== undefined ? b.display_order : b.order;
          return orderA - orderB;
        });
        

          this.loadLessonBlocks(this.lesson.id);

       //   this.cdr.detectChanges();
          

        console.log('Block updated with preserved properties:', this.lesson.lessonBlocks[index]);
      }
    });
  }

// Confirm and delete a lesson block
confirmDeleteBlock(block: any) {
  if (confirm(`هل أنت متأكد من حذف وحدة "${block.title}"؟`)) {
    this.deleteBlock(block);
  }
}


// Delete a lesson block
deleteBlock(block: any) {
  this.isLoadingBlocks = true;
  
  this.tamemService.deleteLessonBlock(block.id).subscribe({
    next: (response) => {
      // Remove the block from the array
      this.lesson.lessonBlocks = this.lesson.lessonBlocks.filter((b: any) => b.id !== block.id);
      this.lesson.totalBlocks = this.lesson.lessonBlocks.length;
      
      // Show success message
      console.log('Block deleted successfully', response);
      this.isLoadingBlocks = false;
    },
    error: (error) => {
      console.error('Error deleting block:', error);
      this.errorMessage = 'فشل في حذف الوحدة. يرجى المحاولة مرة أخرى.';
      this.isLoadingBlocks = false;
    }
  });
}

// Method to toggle view mode
toggleViewMode(mode: 'grid' | 'list' | 'track'): void {
  this.viewMode = mode;
}

} // end of class




/*


  // Get default lesson data for testing
  getDefaultLesson() {
    return {
      id: 'lesson1_2',
      title: 'العمليات الأساسية',
      category: 'أساسيات الجبر',
      duration: '20 دقيقة',
      totalBlocks: 5,
      // Rename to lessonBlocks
      lessonBlocks: this.getDefaultBlocks()
    };
  }

  // Get default progress data for testing
  getDefaultProgress() {
    return {
      completionPercentage: 65,
      timeSpent: '45:20',
      lastAccessed: 'منذ يومين',
      completedBlocks: 3,
      lastBlockId: 'block3',
      correctAnswers: 75,
      blockProgress: {
        'block1': 100,
        'block2': 100,
        'block3': 80,
        'block4': 0,
        'block5': 0
      },
      lastViewed: {
        'block1': '2023-11-20T14:30:00',
        'block2': '2023-11-25T10:15:00',
        'block3': '2023-12-01T09:45:00'
      },
      knowledgeRetention: {
        'block1': 75,
        'block2': 85,
        'block3': 60
      },
      streak: {
        'block1': 0,
        'block2': 0,
        'block3': 3
      },
      reviewCount: {
        'block1': 2,
        'block2': 1,
        'block3': 0
      }
    };
  }

  // Renamed from getDefaultBlocks to getDefaultLessonBlocks
  getDefaultBlocks() {
    return [
      {
        id: 'block1',
        order: 1,
        title: 'مقدمة في العمليات الأساسية',
        description: 'تعرف على المفاهيم الأساسية للعمليات الحسابية في الجبر',
        duration: '5 دقائق',
        activitiesCount: 2,
        isLocked: false,
        coverImage: '/assets/images/courses/blocks/1.png',
        studentsCount: 325,
        rating: 4.7,
        ratingCount: 145,
        difficulty: 2,
        avgCompletionTime: '4 دقائق'
      },
      {
        id: 'block2',
        order: 2,
        title: 'الجمع والطرح الجبري',
        description: 'تعلم كيفية إجراء عمليات الجمع والطرح مع المتغيرات',
        duration: '7 دقائق',
        activitiesCount: 3,
        isLocked: false,
        coverImage: '/assets/images/courses/blocks/2.png',
        studentsCount: 298,
        rating: 4.5,
        ratingCount: 132,
        difficulty: 2,
        avgCompletionTime: '6 دقائق'
      },
      {
        id: 'block3',
        order: 3,
        title: 'الضرب والقسمة الجبرية',
        description: 'استكشف قواعد عمليات الضرب والقسمة في الجبر',
        duration: '10 دقائق',
        activitiesCount: 4,
        isLocked: false,
        coverImage: '/assets/images/courses/blocks/3.png',
        studentsCount: 256,
        rating: 4.2,
        ratingCount: 118,
        difficulty: 3,
        avgCompletionTime: '9 دقائق',
        prerequisiteId: 'block2'
      },
      {
        id: 'block4',
        order: 4,
        title: 'ترتيب العمليات الحسابية',
        description: 'تعلم الترتيب الصحيح لإجراء العمليات الحسابية المتعددة',
        duration: '8 دقائق',
        activitiesCount: 3,
        isLocked: true,
        coverImage: '/assets/images/courses/blocks/4.png',
        studentsCount: 210,
        rating: 4.6,
        ratingCount: 95,
        difficulty: 4,
        avgCompletionTime: '11 دقائق',
        prerequisiteId: 'block3'
      },
      {
        id: 'block5',
        order: 5,
        title: 'تطبيقات عملية',
        description: 'حل مسائل حياتية باستخدام العمليات الجبرية الأساسية',
        duration: '15 دقائق',
        activitiesCount: 5,
        isLocked: true,
        coverImage: '/assets/images/courses/blocks/5.png',
        studentsCount: 185,
        rating: 4.8,
        ratingCount: 87,
        difficulty: 5,
        avgCompletionTime: '16 دقائق',
        prerequisiteId: 'block4'
      }
    ];
  }

  // Get block name by ID
  getBlockName(blockId: string): string {
    const block = this.lesson?.lessonBlocks?.find((b: any) => b.id === blockId);
    return block?.title || 'وحدة الدراسة';
  }

  // Continue from last accessed block
  continueBlock(blockId: string) {
    console.log('Continuing from last block:', blockId);
    this.startBlock(blockId);
  }

  // Start or continue a specific lesson block
  startBlock(blockId: string) {
    console.log('Starting block:', blockId);
    // Navigate to the lesson block
    // this.router.navigate(['/lesson', this.lesson?.id, 'block', blockId]);
  }

  // Navigate to view full statistics
  viewFullStatistics() {
    console.log('Viewing full statistics for:', this.lesson?.id);
    // Navigate to statistics page
    // this.router.navigate(['/lesson', this.lesson?.id, 'statistics']);
  }


*/