import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { LessonBlockTrackFormComponent } from '../lesson-block-track-form/lesson-block-track-form.component';
import { LessonBlockTasksComponent } from './lesson-block-tasks/lesson-block-tasks.component';



@Component({
  selector: 'detail-lesson-block-track',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './lesson-block-track.component.html',
  styleUrl: './lesson-block-track.component.scss'
})
export class LessonBlockTrackComponent implements OnInit, OnDestroy {


  @Input() lesson: any;
  @Input() userProgress: any;
  @Input() isEditMode: boolean = false;

  // Add event emitters for actions
  @Output() editBlockEvent = new EventEmitter<any>();
  @Output() viewBlockEvent = new EventEmitter<any>();
  @Output() deleteBlockEvent = new EventEmitter<any>();


  private modalService = inject(NgbModal);
  private tamemService = inject(TamemService);

  private cdr = inject(ChangeDetectorRef);

  // Dropdown state
  activeActionMenuId: string | null = null;

  constructor() {
    // Get base URL from window.location
    this.baseUrl = window.location.origin;

  }


  private sentBlock: any = null;
  private originalDevStatus: number | null = null;

  // Add action methods
  editBlock(block: any): void {
    this.sentBlock = block;
    this.originalDevStatus = block.dev_status;

    this.editBlockEvent.emit(block);
  }

  ngDoCheck() {
    /*
        if (this.sentBlock && this.sentBlock.dev_status !== this.originalDevStatus) {
          console.log('Block dev_status changed from', this.originalDevStatus, 'to', this.sentBlock.dev_status);
          // Force change detection to update the tr colors
          alert('تم تحديث حالة الوحدة "' + this.sentBlock.title + '" إلى "' + this.sentBlock.dev_status + '"');
          this.cdr.detectChanges();
          // Reset tracking
          this.sentBlock = null;
          this.originalDevStatus = null;
        }
    */
  }




  viewBlock(block: any): void {
    this.viewBlockEvent.emit(block);
  }

  deleteBlock(block: any): void {
    this.deleteBlockEvent.emit(block);
  }

  // Toggle action menu dropdown
  toggleActionMenu(blockId: string): void {
    // If the same menu is clicked, close it, otherwise open the clicked one
    this.activeActionMenuId = this.activeActionMenuId === blockId ? null : blockId;

    // Add a click handler to the document to close the dropdown when clicking outside
    if (this.activeActionMenuId) {
      setTimeout(() => {
        document.addEventListener('click', this.closeActionMenuOnClickOutside);
      }, 0);
    }
  }

  // Close action menu when clicking outside
  closeActionMenuOnClickOutside = (event: MouseEvent): void => {
    // Check if the click is outside the dropdown
    const dropdownElements = document.querySelectorAll('.action-dropdown-menu.show');
    const toggleButtons = document.querySelectorAll('.btn-info-soft');
    let isClickedInside = false;

    // Check if clicked inside dropdown menu
    dropdownElements.forEach(dropdown => {
      if (dropdown.contains(event.target as Node)) {
        isClickedInside = true;
      }
    });

    // Check if clicked on toggle button
    toggleButtons.forEach(button => {
      if (button.contains(event.target as Node)) {
        isClickedInside = true;
      }
    });

    if (!isClickedInside) {
      this.activeActionMenuId = null;
      document.removeEventListener('click', this.closeActionMenuOnClickOutside);
    }
  }

  // Handle actions from the dropdown menu
  performBlockAction(block: any, action: string): void {
    // Close the dropdown menu
    this.activeActionMenuId = null;
    document.removeEventListener('click', this.closeActionMenuOnClickOutside);

    switch (action) {
      case 'view-actions':
        this.navigateToActionsBoard(block);
        break;
      case 'preview':
        this.previewBlock(block);
        break;
      case 'analytics':
        this.viewBlockAnalytics(block);
        break;
      case 'duplicate':
        this.duplicateBlock(block);
        break;
      case 'delete':
        this.deleteBlock(block);
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  // Handle development status changes
  setDevBlockStatus(block: any, status: string): void {
    // Close the dropdown menu
    this.activeActionMenuId = null;
    document.removeEventListener('click', this.closeActionMenuOnClickOutside);

    if (block && block.id) {
      console.log(`Setting block ${block.id} development phase to: ${status}`);

      // Update the block's development phase (first badge)
      block.devPhase = status;

      // Reset the status to 'New' (second badge) when changing phases
      block.devStatus = 'New';

      // Set the assigned user if not already set (third badge)
      if (!block.assignedUser) {
        block.assignedUser = 'Waim';
      }

      // Temporary visual feedback
      alert(`تم تحديث مرحلة الوحدة "${block.title}" إلى "${status}"`);

      // Here you would implement the actual API call to update the block's development phase and status
      // Example:
      // this.blockService.updateDevPhase(block.id, {phase: status, status: 'New'}).subscribe(
      //   response => {
      //     // Handle success
      //     console.log('Development phase updated successfully', response);
      //   },
      //   error => {
      //     console.error('Error updating development phase', error);
      //     // Handle error (show notification, etc.)
      //   }
      // );
    }
  }

  // Get development status label (first badge - phase)


  @ViewChild('tableBody', { static: false }) tableBody!: ElementRef;
  // Get development status badge class
  getDevStatus(block: any): number {
    const status = block.dev_status;


    return status;
  }
  // Get phase label
  getPhaseLabel(block: any): string {
    // Return the block's phase status or default to 'New'
    return block?.devStatus || 'New';
  }

  // Get phase status badge class
  getPhaseClass(block: any): string {
    const status = block?.devStatus || 'New';

    switch (status) {
      case 'On-Progress':
        return 'primary'; // Blue
      case 'Needs Help':
        return 'warning'; // Orange
      case 'Stuck':
        return 'danger'; // Red
      case 'Done':
        return 'success'; // Green
      case 'New':
      default:
        return 'secondary'; // Silver
    }
  }

  // Get user label
  getUserLabel(block: any): string {
    // Return the block's assigned user or default to 'Waim'
    return block?.assignedUser || 'Waim';
  }

  // Direct navigation to storyboard without event emission
  navigateToStoryboard(block: any): void {
    if (block && block.id) {
      // Open storyboard in a new tab
      const url = `/course/story-board/${block.id}`;
      window.open(url, '_blank');
    }
  }

  navigateToCanva(block: any) {

    if (block && block.id) {
      // Open storyboard in a new tab
      const url = `${block.sketch_canva_link}`;
      window.open(url, '_blank');
    }

  }

  navigateToGoogleDrive(block: any) {

    if (block && block.id) {
      // Open storyboard in a new tab
      const url = `${block.google_drive_link}`;
      window.open(url, '_blank');
    }

  }



  // Direct navigation to actions board
  navigateToActionsBoard(block: any): void {
    if (block && block.id) {
      // Open actions board in a new tab
      const url = `/course/block-actions/${block.id}`;
      window.open(url, '_blank');
    }
  }

  // Preview the block
  previewBlock(block: any): void {
    if (block && block.id) {
      // Open block preview in a new tab
      const url = `/course/preview-block/${block.id}`;
      window.open(url, '_blank');
    }
  }

  // View block analytics
  viewBlockAnalytics(block: any): void {
    if (block && block.id) {
      // Open block analytics in a new tab
      const url = `/course/analytics/block/${block.id}`;
      window.open(url, '_blank');
    }
  }

  // Duplicate block - emits event to parent component
  duplicateBlock(block: any): void {
    if (block) {
      console.log('Duplicating block:', block);
      // You can emit an event to the parent component to handle duplication
      // or implement the duplication logic here
      alert('تم طلب نسخ الوحدة: ' + block.title);
    }
  }

  ngOnInit(): void {
    // Initialize component
    console.log( 'title => :' + JSON.stringify(this.lesson.title) ); 

    console.log( 'lesson => :' + JSON.stringify(this.lesson) ); 
  }

  ngOnDestroy(): void {
    // Clean up any event listeners when component is destroyed
    document.removeEventListener('click', this.closeActionMenuOnClickOutside);
  }

  // Helper method to get default cover image based on block type
  getDefaultCoverImage(block: any): string {
    if (!block) return '/assets/images/courses/blocks/placeholder-default.jpg';

    switch (block.type?.toLowerCase()) {
      case 'video':
        return '/assets/images/courses/blocks/placeholder-video.jpg';
      case 'quiz':
      case 'test':
        return '/assets/images/courses/blocks/placeholder-quiz.jpg';
      case 'reading':
      case 'article':
        return '/assets/images/courses/blocks/placeholder-reading.jpg';
      case 'exercise':
      case 'practice':
        return '/assets/images/courses/blocks/placeholder-exercise.jpg';
      default:
        return '/assets/images/courses/blocks/placeholder-video.jpg';
    }
  }

  // Get difficulty level (1-5) from block or default to middle value
  getBlockDifficulty(block: any): number {
    if (!block) return 3;

    // If difficulty is present as a number
    if (typeof block.difficulty === 'number') {
      return Math.min(Math.max(Math.round(block.difficulty), 1), 5);
    }

    // If difficulty is a string representation of a number
    if (typeof block.difficulty === 'string' && !isNaN(Number(block.difficulty))) {
      return Math.min(Math.max(Math.round(Number(block.difficulty)), 1), 5);
    }

    // Map string difficulty levels to numbers
    if (typeof block.difficulty === 'string') {
      const difficultyMap: { [key: string]: number } = {
        'easy': 1,
        'سهل': 1,
        'beginner': 1,
        'مبتدئ': 1,

        'medium-easy': 2,
        'سهل متوسط': 2,

        'medium': 3,
        'متوسط': 3,
        'intermediate': 3,

        'medium-hard': 4,
        'متوسط صعب': 4,
        'advanced': 4,
        'متقدم': 4,

        'hard': 5,
        'صعب': 5,
        'expert': 5,
        'خبير': 5
      };

      const lowerDifficulty = block.difficulty.toLowerCase();
      if (difficultyMap[lowerDifficulty]) {
        return difficultyMap[lowerDifficulty];
      }
    }

    // Infer difficulty from block properties
    if (block.is_advanced) return 5;
    if (block.is_beginner) return 1;

    // Default to medium difficulty
    return 3;
  }

  // Get rating value (0-5) from block or default to middle value
  getBlockRating(block: any): number {
    if (!block) return 3.0;

    // If rating is present as a number
    if (typeof block.rating === 'number') {
      return Math.min(Math.max(block.rating, 0), 5);
    }

    // If rating is a string representation of a number
    if (typeof block.rating === 'string' && !isNaN(Number(block.rating))) {
      return Math.min(Math.max(Number(block.rating), 0), 5);
    }

    // Infer rating from status and other properties
    if (block.status === 'published' || block.status === 'completed') return 4.5;
    if (block.status === 'review' || block.status === 'in-progress') return 3.5;
    if (block.status === 'draft') return 3.0;
    if (block.status === 'rejected') return 2.0;

    // Default rating
    return 3.0;
  }

  // Get difficulty label based on level
  getDifficultyLabel(level: number): string {
    switch (level) {
      case 1: return 'سهل';
      case 2: return 'سهل متوسط';
      case 3: return 'متوسط';
      case 4: return 'متقدم';
      case 5: return 'صعب';
      default: return 'متوسط';
    }
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

  // Create an array of a specific length (for dots, stars, etc.)
  getArrayOfLength(length: number): any[] {
    return new Array(length);
  }

  // Create an array for star ratings (whole, half, or empty stars)
  getStarArray(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return [
      ...Array(fullStars).fill(1),
      ...(hasHalfStar ? [0.5] : []),
      ...Array(emptyStars).fill(0)
    ];
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
  handleImageError(event: Event, block: any): void {
    const imgElement = event.target as HTMLImageElement;

    // If the image failed to load, try an alternative URL format
    if (imgElement.src && imgElement.src.startsWith(this.baseUrl) && imgElement.src.includes('/storage/')) {
      // Try the URL without the base origin
      const relativePath = imgElement.src.replace(this.baseUrl, '');
      imgElement.src = relativePath;

      console.log(`Retrying image with relative path: ${relativePath}`);

      // Add a backup error handler for the second attempt
      imgElement.onerror = () => {
        console.error(`Failed to load image with both absolute and relative paths: ${block.cover_image}`);
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







  // Add these methods to your component TypeScript file
  // Add these methods to your component TypeScript file

  // Phase definitions
  getPhases() {
    return [
      { id: 1, name: 'Content Development', shortName: 'Content', iconClass: 'fas fa-file-text' },
      { id: 2, name: 'Storyboard Generation', shortName: 'Storyboard', iconClass: 'fas fa-film' },
      { id: 3, name: 'Sketch Prep', shortName: 'S.Prep', iconClass: 'fas fa-pen-tool' },
      { id: 4, name: 'Sketch Pencil', shortName: 'S.Pencil', iconClass: 'fas fa-pencil-alt' },
      { id: 5, name: 'Sketch Polishing', shortName: 'S.Polish', iconClass: 'fas fa-palette' },
      { id: 6, name: 'Motion Planning', shortName: 'S.Motion', iconClass: 'fas fa-play' },
      { id: 7, name: 'Asset Organization', shortName: 'S.Export', iconClass: 'fas fa-folder-open' },
      { id: 8, name: 'Video Production', shortName: 'Video', iconClass: 'fas fa-video' },
      { id: 9, name: 'Final Review', shortName: 'Review', iconClass: 'fas fa-check-circle' }
    ];
  }

  // Get phase status based on block.dev_status
  getPhaseStatus(block: any, phaseId: number): string {
    // This is a simplified mapping - adjust based on your actual task tracking
    if (block.dev_status > phaseId) {
      return 'approved';
    } else if (block.dev_status === phaseId) {
      return 'in-progress';
    } else {
      return 'to-do';
    }
  }

  // Get CSS class for phase icon based on status
  getPhaseIconClass(block: any, phaseId: number): string {
    const status = this.getPhaseStatus(block, phaseId);
    const baseClass = 'phase-icon-circle';

    switch (status) {
      case 'approved':
        return `${baseClass} phase-approved`;
      case 'in-progress':
        return `${baseClass} phase-in-progress`;
      case 'done':
        return `${baseClass} phase-done`;
      default:
        return `${baseClass} phase-todo`;
    }
  }

  // Check if phase is completed (for connector line styling)
  isPhaseCompleted(block: any, phaseId: number): boolean {
    return this.getPhaseStatus(block, phaseId) === 'approved';
  }

  // Calculate progress percentage
  getProgressPercentage(block: any): number {
    const totalPhases = this.getPhases().length;
    const approvedPhases = this.getPhases().filter(phase =>
      this.getPhaseStatus(block, phase.id) === 'approved'
    ).length;

    return Math.round((approvedPhases / totalPhases) * 100);
  }


  // Updated function in your parent component
  // Replace your existing openEditBlockTrackModal function with this updated version
  private isModalOpen = false;

  openEditBlockTrackModal(block: any) {
    // Prevent opening if modal is already open
    if (this.isModalOpen) {
      return;
    }

    this.isModalOpen = true;
    // Open the modal with the phases data
    const modalRef = this.modalService.open(LessonBlockTasksComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.blockId = block.id;

    // here we send canvaLink + GoogleDriveLink + StoryBoardLink    
    modalRef.componentInstance.canvaLink = block.sketch_canva_link;
    modalRef.componentInstance.googleDriveLink = block.google_drive_link;
    modalRef.componentInstance.hasStoryBoard =  block.has_story_board;

    modalRef.componentInstance.courseName = block.courseName;
    modalRef.componentInstance.lessonName = block.lessonName;
    modalRef.componentInstance.blockName = block.blockName;

  

    // Reset flag when modal closes
    modalRef.result.finally(() => {
      this.isModalOpen = false;
    });
    
  }







} // end of comp
