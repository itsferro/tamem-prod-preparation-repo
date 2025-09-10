import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockActionTrackingComponent } from '../block-action-tracking/block-action-tracking.component';

@Component({
  selector: 'detail-lesson-block-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbNavModule],
  templateUrl: './lesson-block-form.component.html',
  styleUrl: './lesson-block-form.component.scss'
})
export class LessonBlockFormComponent implements OnInit {
  @Input() existingBlocks: any[] = [];
  @Input() editBlock: any = null; // If provided, we're in edit mode
  @Input() lessonId: string | null = null; // Added to get the parent lesson ID
  @Output() blockCreated = new EventEmitter<any>();
  @Output() blockUpdated = new EventEmitter<any>();

  blockForm!: FormGroup;
  isEditMode = false;
  activeTab = 1; // Default active tab
  previewImageUrl: string | null = null;
  selectedVideoName: string | null = null;
  selectedVideoUrl: string | null = null;
  coverImageFile: File | null = null;
  videoFile: File | null = null;
  isSubmitting = false;
  errorMessage: string | null = null;

  blockKeyInsights: any;
  loading = false;
  error = false;





  // Options for difficulty levels
  difficultyLevels = [
    { value: 1, label: 'سهل جداً' },
    { value: 2, label: 'سهل' },
    { value: 3, label: 'متوسط' },
    { value: 4, label: 'صعب' },
    { value: 5, label: 'صعب جداً' }
  ];

  // Options for review intervals (in days)
  reviewIntervals = [
    { value: 1, label: 'يوم واحد' },
    { value: 3, label: '3 أيام' },
    { value: 7, label: 'أسبوع' },
    { value: 14, label: 'أسبوعين' },
    { value: 30, label: 'شهر' }
  ];

  // Options for development status
  devStatusOptions = [
    { value: 1, label: 'not-started' },
    { value: 2, label: 'sketch-start' },
    { value: 3, label: 'sketch-end' },
    { value: 4, label: 'studio-start' },
    { value: 5, label: 'studio-end' },
    { value: 6, label: 'finished' }
    // { value: 'not-started', label: 'لم يبدأ' },
    // { value: 'init', label: 'تم البدء' },
    // { value: 'content-added', label: 'تم إضافة المحتوى' },
    // { value: 'storyboard-created', label: 'تم إنشاء السيناريو' },
    // { value: 'prompts-added', label: 'تم إضافة النصوص التوجيهية' },
    // { value: 'images-uploaded', label: 'تم رفع الصور' },
    // { value: 'complete', label: 'مكتمل' }
  ];

  // Inject services
  private formBuilder = inject(FormBuilder);
  public modal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);
  private tamemService = inject(TamemService);
  private router = inject(Router);

  // Array to store block actions/history
  blockActions: any[] = [];

  ngOnInit(): void {
    this.isEditMode = !!this.editBlock;

    // Initialize the form
    this.initForm();

    // If in edit mode, populate the form with existing data
    if (this.isEditMode && this.editBlock) {
      this.populateFormWithExistingData();
    }
  }

  private initForm(): void {
    // Calculate next order number if adding new block
    const nextOrder = this.isEditMode
      ? this.editBlock.order
      : this.calculateNextOrderNumber();

    this.blockForm = this.formBuilder.group({
      // Basic Info
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [''],

      // Details
      duration: ['5 دقائق', Validators.required],
      activitiesCount: [2, [Validators.required, Validators.min(1), Validators.max(20)]],
      difficulty: [3, Validators.required],
      avgCompletionTime: ['10 دقائق', Validators.required],
      isLocked: [false],
      order: [nextOrder, [Validators.required, Validators.min(1)]],
      prerequisiteId: [''],
      reviewInterval: [7], // Default review interval (7 days)

      // Content
      blockContent: ['', Validators.maxLength(10000)],

      // Media
      coverImageType: ['upload'], // 'upload' or 'url'
      coverImageUrl: [''],
      coverImageRemoved: [false], // Add this flag to track intentional removal
      videoType: ['upload'], // 'upload' or 'url'
      videoUrl: [''],

      // Development Status
      studentBookPageNo: [''],
      teacherBookPageNo: [''],
      devStatus: [1], // Default to not started
      sketchCanvaLink: [''],
      googleDriveLink: ['']
    });
  }

  private populateFormWithExistingData(): void {
    console.log('Editing block data:', this.editBlock); // Add debug output

    this.blockForm.patchValue({
      // Basic Info
      title: this.editBlock.title,
      description: this.editBlock.description,

      // Details
      duration: this.editBlock.duration,
      activitiesCount: this.editBlock.activities_count || this.editBlock.activitiesCount || 2,
      difficulty: this.editBlock.difficulty || 3,
      avgCompletionTime: this.editBlock.avg_completion_time || this.editBlock.avgCompletionTime || '10 دقائق',
      isLocked: this.editBlock.is_locked || this.editBlock.isLocked || false,
      order: this.editBlock.display_order || this.editBlock.order || 1,
      prerequisiteId: this.editBlock.prerequisite_id || this.editBlock.prerequisiteId || '',
      reviewInterval: this.editBlock.review_interval || this.editBlock.reviewInterval || 7,

      // Content
      blockContent: this.editBlock.block_content || this.editBlock.blockContent || '',

      // Media - set appropriate types based on existing data
      videoUrl: this.editBlock.video_url || this.editBlock.videoUrl || '',

      // Development Status
      studentBookPageNo: this.editBlock.student_book_page_no || this.editBlock.studentBookPageNo,
      teacherBookPageNo: this.editBlock.teacher_book_page_no || this.editBlock.teacherBookPageNo,
      devStatus: this.editBlock.dev_status || this.editBlock.devStatus || 'not-started',
      sketchCanvaLink: this.editBlock.sketch_canva_link || this.editBlock.sketchCanvaLink || '',
      googleDriveLink: this.editBlock.google_drive_link || this.editBlock.googleDriveLink || ''
    });

    // Set preview image
    if (this.editBlock.cover_image || this.editBlock.coverImage) {
      const imagePath = this.editBlock.cover_image || this.editBlock.coverImage;

      if (imagePath.startsWith('data:') || imagePath.startsWith('blob:')) {
        this.blockForm.patchValue({ coverImageType: 'upload' });
        // We can't directly set the file, but we can show the preview
      } else {
        this.blockForm.patchValue({
          coverImageType: 'url',
          coverImageUrl: imagePath
        });
      }
      this.previewImageUrl = imagePath;
    }

    // Handle video display
    if (this.editBlock.video_url || this.editBlock.videoUrl) {
      const videoPath = this.editBlock.video_url || this.editBlock.videoUrl;

      if (videoPath && videoPath.startsWith('upload:')) {
        this.blockForm.patchValue({ videoType: 'upload' });
        // Extract the file name from the path or use a generic name
        const fileName = videoPath.replace('upload:', '');
        this.selectedVideoName = fileName;
      } else if (videoPath) {
        this.blockForm.patchValue({
          videoType: 'url',
          videoUrl: videoPath
        });
        this.selectedVideoUrl = videoPath;
      }
    }

    // load key insights 
    this.loadKeyInsights();


  }

  private calculateNextOrderNumber(): number {
    if (!this.existingBlocks || this.existingBlocks.length === 0) {
      return 1;
    }

    // Find the highest order number and add 1
    const maxOrder = Math.max(...this.existingBlocks.map(block => block.order));
    return maxOrder + 1;
  }

  // File handling methods
  onFileSelected(event: any, fileType: 'image' | 'video'): void {
    const file = event.target.files[0];
    if (!file) return;

    if (fileType === 'image') {
      // Create preview URL for image
      this.previewImageUrl = URL.createObjectURL(file);
      this.coverImageFile = file; // Store the actual file
    } else {
      // Store video name and file
      this.selectedVideoName = file.name;
      this.videoFile = file; // Store the actual file
    }
  }

  onCoverImageUrlChange(event: any): void {
    const url = event.target.value;
    if (url && url.trim() !== '') {
      this.previewImageUrl = url;
    } else {
      this.previewImageUrl = null;
    }
  }

  onVideoUrlChange(event: any): void {
    const url = event.target.value;
    if (url && url.trim() !== '') {
      this.selectedVideoUrl = url;
      this.selectedVideoName = null;
    } else {
      this.selectedVideoUrl = null;
    }
  }

  clearCoverImage(): void {
    this.previewImageUrl = null;
    this.coverImageFile = null;
    this.blockForm.patchValue({
      coverImageUrl: '',
      coverImageRemoved: true  // Set this flag to true when clearing
    });
    console.log('Cover image cleared, removal flag set');
  }

  clearVideo(): void {
    this.selectedVideoName = null;
    this.selectedVideoUrl = null;
    this.videoFile = null;
    this.blockForm.patchValue({
      videoUrl: ''
    });
  }

  onSubmit(): void {
    if (this.blockForm.invalid) {
      // Mark all form controls as touched to display validation errors
      Object.keys(this.blockForm.controls).forEach(key => {
        const control = this.blockForm.get(key);
        control?.markAsTouched();
      });

      // Switch to the tab with validation errors
      this.navigateToFirstInvalidTab();
      return;
    }

    // Prevent double submission
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const formData = new FormData();
    const formValues = this.blockForm.value;

    // Add basic information
    formData.append('title', formValues.title);
    formData.append('description', formValues.description);
    formData.append('duration', formValues.duration);
    formData.append('activities_count', String(formValues.activitiesCount));
    formData.append('difficulty', String(formValues.difficulty));
    formData.append('avg_completion_time', formValues.avgCompletionTime);
    formData.append('is_locked', formValues.isLocked ? '1' : '0');
    formData.append('order', String(formValues.order));
    formData.append('review_interval', String(formValues.reviewInterval));
    formData.append('block_content', formValues.blockContent || '');
    formData.append('lesson_id', String(this.lessonId));
    formData.append('student_book_page_no', String(formValues.studentBookPageNo || 0));
    formData.append('teacher_book_page_no', String(formValues.teacherBookPageNo || 0));
    formData.append('dev_status', String(formValues.devStatus || 1));
    formData.append('sketch_canva_link', formValues.sketchCanvaLink || '');
    formData.append('google_drive_link', formValues.googleDriveLink || '');

    // Add relation IDs
    if (this.lessonId) {
      formData.append('lesson_id', String(this.lessonId));
    }
    if (formValues.prerequisiteId) {
      formData.append('prerequisite_id', formValues.prerequisiteId);
    }

    // Handle image file or URL
    if (formValues.coverImageType === 'upload' && this.coverImageFile) {
      formData.append('cover_image', this.coverImageFile);
    } else if (formValues.coverImageType === 'url' && formValues.coverImageUrl) {
      formData.append('cover_image_url', formValues.coverImageUrl);
    }

    // Handle video file or URL
    if (formValues.videoType === 'upload' && this.videoFile) {
      formData.append('video_file', this.videoFile);
    } else if (formValues.videoType === 'url' && formValues.videoUrl) {
      formData.append('video_url', formValues.videoUrl);
    }

    // Handle image file, URL, or removal
    if (formValues.coverImageRemoved) {
      formData.append('cover_image_removed', 'true');
      formData.append('cover_image', ''); // Send empty value to clear the image
    } else if (formValues.coverImageType === 'upload' && this.coverImageFile) {
      formData.append('cover_image', this.coverImageFile);
    } else if (formValues.coverImageType === 'url' && formValues.coverImageUrl) {
      formData.append('cover_image_url', formValues.coverImageUrl);
    }


    // Add mode information
    formData.append('is_edit_mode', this.isEditMode ? '1' : '0');
    if (this.isEditMode && this.editBlock) {
      formData.append('block_id', String(this.editBlock.id));
    }

    // Call API to save the data
    if (this.isEditMode) {
      this.tamemService.updateLessonBlock(formData).subscribe({
        next: (response) => {
          // Handle successful update
          this.handleSuccessResponse(response);
        },
        error: (error) => {
          // Handle error
          this.handleErrorResponse(error);
        }
      });
    } else {
      this.tamemService.createLessonBlock(formData).subscribe({
        next: (response) => {
          // Handle successful creation
          this.handleSuccessResponse(response);
        },
        error: (error) => {
          // Handle error
          this.handleErrorResponse(error);
        }
      });
    }
  }



  private handleSuccessResponse(response: any): void {
    this.isSubmitting = false;

    // Create a block object from the response
    const blockData = {
      id: response.id || (this.isEditMode ? this.editBlock.id : `block${Date.now()}`),
      title: this.blockForm.value.title,
      description: this.blockForm.value.description,
      duration: this.blockForm.value.duration,
      activities_count: this.blockForm.value.activitiesCount,
      difficulty: this.blockForm.value.difficulty,
      avgCompletionTime: this.blockForm.value.avgCompletionTime,
      isLocked: this.blockForm.value.isLocked,
      order: this.blockForm.value.order,
      prerequisiteId: this.blockForm.value.prerequisiteId || null,
      reviewInterval: this.blockForm.value.reviewInterval,
      blockContent: this.blockForm.value.blockContent || '',
      // Handle cover image with proper removal logic
      cover_image: this.blockForm.value.coverImageRemoved ? null :
        (response.cover_image_path || this.previewImageUrl || null),
      studentsCount: this.isEditMode ? this.editBlock.studentsCount : 0,
      rating: this.isEditMode ? this.editBlock.rating : 0,
      ratingCount: this.isEditMode ? this.editBlock.ratingCount : 0,
      //  devStatus: this.editBlock.dev_status || this.editBlock.devStatus || 1,
      studentBookPageNo: this.blockForm.value.studentBookPageNo,
      teacherBookPageNo: this.blockForm.value.teacherBookPageNo,
      devStatus: this.blockForm.value.devStatus,
      sketchCanvaLink: this.blockForm.value.sketchCanvaLink || '',
      googleDriveLink: this.blockForm.value.googleDriveLink || '',
    };


    this.editBlock.title = this.blockForm.value.title;
    this.editBlock.description = this.blockForm.value.description;
    this.editBlock.duration = this.blockForm.value.duration;
    this.editBlock.activities_count = this.blockForm.value.activitiesCount;
    this.editBlock.activitiesCount = this.blockForm.value.activitiesCount;
    this.editBlock.difficulty = this.blockForm.value.difficulty;
    this.editBlock.avg_completion_time = this.blockForm.value.avgCompletionTime;
    this.editBlock.avgCompletionTime = this.blockForm.value.avgCompletionTime;
    this.editBlock.is_locked = this.blockForm.value.isLocked;
    this.editBlock.order = this.blockForm.value.order;
    this.editBlock.display_order = this.blockForm.value.order;
    this.editBlock.prerequisite_id = this.blockForm.value.prerequisiteId;
    this.editBlock.review_interval = this.blockForm.value.reviewInterval;
    this.editBlock.block_content = this.blockForm.value.blockContent;
    this.editBlock.student_book_page_no = this.blockForm.value.studentBookPageNo;
    this.editBlock.teacher_book_page_no = this.blockForm.value.teacherBookPageNo;
    this.editBlock.dev_status = this.blockForm.value.devStatus;
    this.editBlock.sketch_canva_link = this.blockForm.value.sketchCanvaLink;
    this.editBlock.google_drive_link = this.blockForm.value.googleDriveLink;


    console.log('Block data after update with image:', blockData);

    // Emit appropriate event
    if (this.isEditMode) {
      this.blockUpdated.emit(blockData);
    } else {
      this.blockCreated.emit(blockData);
    }

    // Close the modal
    this.modal.close(blockData);
  }



  private handleErrorResponse(error: any): void {
    this.isSubmitting = false;

    // Log the error for debugging
    console.error('Error saving block:', error);

    // If there's validation errors from the backend
    if (error.error && error.error.errors) {
      // Handle validation errors from Laravel backend
      const validationErrors = error.error.errors;

      // Match backend errors to form controls if possible
      Object.keys(validationErrors).forEach(key => {
        const formControlName = this.mapBackendPropertyToFormControl(key);
        const control = this.blockForm.get(formControlName);
        if (control) {
          control.setErrors({ serverError: validationErrors[key][0] });
          control.markAsTouched();
        }
      });

      // Navigate to the first tab with errors
      this.navigateToFirstInvalidTab();

      // Set general error message
      this.errorMessage = 'يرجى تصحيح الأخطاء الموضحة أدناه';
    } else if (error.error && error.error.message) {
      // If there's a general error message
      this.errorMessage = error.error.message;
    } else {
      // Generic error handling
      this.errorMessage = 'حدث خطأ أثناء حفظ الوحدة. يرجى المحاولة مرة أخرى.';
    }
  }

  // Helper to map backend property names to form control names
  private mapBackendPropertyToFormControl(backendProperty: string): string {
    // Map backend snake_case to frontend camelCase
    const mapping: { [key: string]: string } = {
      'title': 'title',
      'description': 'description',
      'duration': 'duration',
      'activities_count': 'activitiesCount',
      'difficulty': 'difficulty',
      'avg_completion_time': 'avgCompletionTime',
      'is_locked': 'isLocked',
      'order': 'order',
      'prerequisite_id': 'prerequisiteId',
      'review_interval': 'reviewInterval',
      'block_content': 'blockContent',
      'cover_image': 'coverImageFile',
      'cover_image_url': 'coverImageUrl',
      'video_file': 'videoFile',
      'video_url': 'videoUrl',
      'student_book_page_no': 'studentBookPageNo',
      'teacher_book_page_no': 'teacherBookPageNo',
      'dev_status': 'devStatus',
      'sketch_canva_link': 'sketchCanvaLink',
      'google_drive_link': 'googleDriveLink'
    };

    return mapping[backendProperty] || backendProperty;
  }

  onCancel(): void {
    this.modal.dismiss('cancel');
  }

  // Navigate to the first tab with validation errors
  navigateToFirstInvalidTab(): void {
    // Basic Info tab (1)
    if (
      this.blockForm.get('title')?.invalid ||
      this.blockForm.get('description')?.invalid
    ) {
      this.activeTab = 1;
      return;
    }

    // Details tab (2)
    if (
      this.blockForm.get('order')?.invalid ||
      this.blockForm.get('duration')?.invalid ||
      this.blockForm.get('avgCompletionTime')?.invalid ||
      this.blockForm.get('activitiesCount')?.invalid ||
      this.blockForm.get('difficulty')?.invalid ||
      this.blockForm.get('reviewInterval')?.invalid ||
      this.blockForm.get('prerequisiteId')?.invalid ||
      this.blockForm.get('isLocked')?.invalid
    ) {
      this.activeTab = 2;
      return;
    }

    // Content tab (3)
    if (this.blockForm.get('blockContent')?.invalid) {
      this.activeTab = 3;
      return;
    }

    // Media tab (4)
    if (
      this.blockForm.get('coverImageType')?.invalid ||
      this.blockForm.get('coverImageUrl')?.invalid ||
      this.blockForm.get('videoType')?.invalid ||
      this.blockForm.get('videoUrl')?.invalid
    ) {
      this.activeTab = 4;
      return;
    }
  }

  // Helper method to get prerequisite options
  getPrerequisiteOptions(): any[] {
    if (!this.existingBlocks || this.existingBlocks.length === 0) {
      return [];
    }

    // If we're editing, filter out the current block and any blocks with higher order
    if (this.isEditMode && this.editBlock) {
      return this.existingBlocks.filter(block =>
        block.id !== this.editBlock.id && block.order < this.editBlock.order
      );
    }

    // For new blocks, all existing blocks can be prerequisites
    return this.existingBlocks;
  }

  // Method to open the action tracking page
  openActionTrackingModal(): void {
    // Check if the block has been saved first (has an ID)
    if (this.isEditMode && this.editBlock && this.editBlock.id) {
      // Navigate to the action tracking page
      this.router.navigate(['/course/detail/block', this.editBlock.id, 'actions']);
    } else {
      // If it's a new block, we need to save it first
      alert('Please save the block first to access the development log.');
    }
  }



  generateKeyInsights() {

    this.error = false;
    this.loading = true;

    const extendInsights = true;
    this.tamemService.generateKeyInsights(this.editBlock.id, extendInsights).subscribe({
      next: (response) => {
        // Handle successful creation
        // this.handleSuccessResponse(response);
        this.blockKeyInsights = response.data;
        console.log(response);
        this.loading = false;
      },
      error: (error) => {
        // Handle error
        // this.handleErrorResponse(error);
      }
    });


  }

  loadKeyInsights() {

    this.tamemService.getKeyInsights(this.editBlock.id).subscribe({
      next: (response) => {
        // Handle successful creation
        console.log(response);
        this.blockKeyInsights = response.data;

      },
      error: (error) => {
        // Handle error
        // this.handleErrorResponse(error);
      }
    });

  }







}