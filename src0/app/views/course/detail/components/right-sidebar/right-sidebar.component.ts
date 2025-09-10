import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, OnDestroy, HostListener } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { LightgalleryModule } from 'lightgallery/angular'
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { CurriculumComponent } from '../curriculum/curriculum.component'
import { AdminPanelComponent } from '../admin-panel/admin-panel.component'
import { TamemService } from '@/app/core/service/tamem-service.service';

// Import interfaces from separate file
import {
  CourseTheme,
  CourseUnit,
  CourseLesson,
  TocChanges,
  ChangeResponse,
  CourseStructureSaveResponse
} from './toc.interface';

@Component({
  selector: 'detail-right-sidebar',
  standalone: true,
  imports: [
    LightgalleryModule,
    NgbDropdownModule,
    CurriculumComponent,
    AdminPanelComponent,
    FormsModule
  ],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.scss',
})
export class RightSidebarComponent implements OnInit, OnDestroy {
  // Input for course data from parent component
  @Input() courseData: any = null;

  // Input to control edit mode
  @Input() editMode: boolean = true;

  // Output events for parent component
  @Output() lessonSelected = new EventEmitter<CourseLesson>();
  @Output() structureChanged = new EventEmitter<{
    type: 'theme' | 'unit' | 'lesson',
    action: 'add' | 'edit' | 'delete',
    data: CourseTheme | CourseUnit | CourseLesson
  }>();

  // Properties for Table of Contents
  courseTitle: string = 'جاري التحميل...';
  courseThemes: CourseTheme[] = [];
  flattenedLessons: CourseLesson[] = [];

  // Track deleted items by their IDs
  deletedThemeIds: number[] = [];
  deletedUnitIds: number[] = [];
  deletedLessonIds: number[] = [];

  // Dependency injection
  activeOffcanvas = inject(NgbActiveOffcanvas);
  private tamemService = inject(TamemService);

  // UI state
  isDataLoaded: boolean = false;
  isLoading: boolean = false;
  savingProgress: number = 0;
  private hasStructureChanges: boolean = false;
  isMobileView: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();

    // Force check data loaded state on resize
    if (this.courseData) {
      this.isDataLoaded = true;
    }
  }

  // Check screen size and update mobile view state
  private checkScreenSize() {
    this.isMobileView = window.innerWidth < 1200; // Matches Bootstrap's xl breakpoint
  }

  constructor() {
    // Set initial mobile state
    this.checkScreenSize();
  }

  ngOnInit(): void {
    // Set isDataLoaded to false initially
    this.isDataLoaded = false;

    // Initialize course data
    this.initializeCourseData();

    // Force isDataLoaded to true after processing data
    setTimeout(() => {
      this.isDataLoaded = true;
    }, 0);
  }

  ngOnDestroy(): void {
    // No special cleanup needed
  }

  // Initialize course data from input
  initializeCourseData(): void {
    if (this.courseData) {
      this.courseTitle = this.courseData.title || 'الفهرس';
      this.processCourseData();
    }
  }

  // Process course data with added change tracking
  processCourseData(data?: any): void {
   // console.log('Processing course data:', data);



    // Reset data and tracking arrays
    this.courseThemes = [];
    this.flattenedLessons = [];
    this.deletedThemeIds = [];
    this.deletedUnitIds = [];
    this.deletedLessonIds = [];

    // Use provided data or existing courseData
    const sourceData = data || this.courseData;
   // console.log('Source data to process:', sourceData);

    if (sourceData?.course_themes && Array.isArray(sourceData.course_themes)) {
    //  console.log('Processing themes from course_themes array');

      // Process each theme
      this.courseThemes = sourceData.course_themes.map((theme: any, themeIndex: number) => {
       // console.log(`Processing theme: ${theme.title}`);

        const processedTheme: CourseTheme = {
          id: theme.id,
          title: theme.title,
          slug: theme.slug,
          description: theme.description,
          display_order: theme.display_order,
          course_id: theme.course_id || this.courseData.id,
          course_units: [],
          isOpen: themeIndex === 0,
          isActive: themeIndex === 0,
          isEditing: false,
          isNew: false,
          isModified: false,
          isDeleted: false,
          isSaved: true, // Explicitly mark as saved
          originalData: { ...theme }, // Store original data for change detection
          deletedUnits: [], // Initialize tracking for deleted units
          managementOptions: {
            canEdit: true,
            canDelete: true,
            canAddUnit: true
          },
          is_visible: theme.is_visible === 1 || theme.is_visible === true // Convert to boolean
        };

        // Process units within each theme
        if (theme.course_units && Array.isArray(theme.course_units)) {
         // console.log(`Processing ${theme.course_units.length} units for theme: ${theme.title}`);

          processedTheme.course_units = theme.course_units.map((unit: any) => {
           // console.log(`Processing unit: ${unit.title}`);

            const processedUnit: CourseUnit = {
              id: unit.id,
              title: unit.title,
              slug: unit.slug,
              description: unit.description,
              display_order: unit.display_order,
              course_theme_id: unit.course_theme_id || theme.id,
              course_lessons: [],
              isEditing: false,
              isNew: false,
              isModified: false,
              isDeleted: false,
              isSaved: true, // Explicitly mark as saved
              originalData: { ...unit }, // Store original data for change detection
              deletedLessons: [], // Initialize tracking for deleted lessons
              managementOptions: {
                canEdit: true,
                canDelete: true,
                canAddLesson: true
              },
              is_visible: unit.is_visible === 1 || unit.is_visible === true // Convert to boolean
            };

            // Process lessons within each unit
            if (unit.course_lessons && Array.isArray(unit.course_lessons)) {
             // console.log(`Processing ${unit.course_lessons.length} lessons for unit: ${unit.title}`);

              processedUnit.course_lessons = unit.course_lessons.map((lesson: any) => {
                // console.log(`Processing lesson: ${lesson.title}`);

                const processedLesson: CourseLesson = {
                  id: lesson.id,
                  title: lesson.title,
                  description: lesson.description,
                  video_url: lesson.video_url,
                  cover_image: lesson.cover_image,
                  duration: lesson.duration,
                  is_free: lesson.is_free || false,
                  display_order: lesson.display_order,
                  page_number: lesson.page_number,
                  course_unit_id: lesson.course_unit_id || unit.id,
                  status: this.determineLessonStatus(lesson),
                  isActive: false,
                  isEditing: false,
                  isNew: false,
                  isModified: false,
                  isDeleted: false,
                  isSaved: true, // Explicitly mark as saved
                  originalData: { ...lesson }, // Store original data for change detection
                  managementOptions: {
                    canEdit: true,
                    canDelete: true,
                    canAdd: true
                  }
                };

                // Add to flattened lessons for quick access
                this.flattenedLessons.push(processedLesson);

                return processedLesson;
              });
            } else if (unit.lessons && Array.isArray(unit.lessons)) {
              // Alternative format that might come from the API
            //  console.log(`Processing ${unit.lessons.length} lessons from alternative format for unit: ${unit.title}`);

              processedUnit.course_lessons = unit.lessons.map((lesson: any) => {
             //   console.log(`Processing lesson from alt format: ${lesson.title}`);

                const processedLesson: CourseLesson = {
                  id: lesson.id,
                  title: lesson.title,
                  course_unit_id: lesson.course_unit_id || unit.id,
                  is_free: lesson.is_free || false,
                  status: 'not-started',
                  isActive: false,
                  isEditing: false,
                  isNew: false,
                  isModified: false,
                  isDeleted: false,
                  isSaved: true,
                  originalData: { ...lesson }, // Store original data for change detection
                  managementOptions: {
                    canEdit: true,
                    canDelete: true,
                    canAdd: true
                  }
                };

                // Add to flattened lessons for quick access
                this.flattenedLessons.push(processedLesson);

                return processedLesson;
              });
            }

            return processedUnit;
          });
        } else if (theme.units && Array.isArray(theme.units)) {
          // Alternative format that might come from the API
         // console.log(`Processing ${theme.units.length} units from alternative format for theme: ${theme.title}`);

          processedTheme.course_units = theme.units.map((unit: any) => {
         //   console.log(`Processing unit from alt format: ${unit.title}`);

            const processedUnit: CourseUnit = {
              id: unit.id,
              title: unit.title,
              course_theme_id: unit.course_theme_id || theme.id,
              course_lessons: [],
              isEditing: false,
              isNew: false,
              isModified: false,
              isDeleted: false,
              isSaved: true,
              originalData: { ...unit }, // Store original data for change detection
              deletedLessons: [], // Initialize tracking for deleted lessons
              managementOptions: {
                canEdit: true,
                canDelete: true,
                canAddLesson: true
              }
            };

            // Process lessons from alternative format
            if (unit.lessons && Array.isArray(unit.lessons)) {
            //  console.log(`Processing ${unit.lessons.length} lessons from alternative format for unit: ${unit.title}`);

              processedUnit.course_lessons = unit.lessons.map((lesson: any) => {
              //  console.log(`Processing lesson from alt format: ${lesson.title}`);

                const processedLesson: CourseLesson = {
                  id: lesson.id,
                  title: lesson.title,
                  course_unit_id: lesson.course_unit_id || unit.id,
                  is_free: lesson.is_free || false,
                  status: 'not-started',
                  isActive: false,
                  isEditing: false,
                  isNew: false,
                  isModified: false,
                  isDeleted: false,
                  isSaved: true,
                  originalData: { ...lesson }, // Store original data for change detection
                  managementOptions: {
                    canEdit: true,
                    canDelete: true,
                    canAdd: true
                  }
                };

                // Add to flattened lessons for quick access
                this.flattenedLessons.push(processedLesson);

                return processedLesson;
              });
            }

            return processedUnit;
          });
        }

        return processedTheme;
      });
    } else {
    //  console.warn('No valid course_themes array found in data:', sourceData);
    }

    // Log the processed data
    // console.log('Processed themes:', this.courseThemes);
    // console.log('Total themes:', this.courseThemes.length);
    // console.log('Total units:', this.courseThemes.reduce((count, theme) => count + theme.course_units.length, 0));
    // console.log('Total lessons:', this.flattenedLessons.length);

    // Mark data as loaded
    this.isDataLoaded = true;

    this.courseThemes.forEach((theme) => {
      theme.course_units.forEach((unit) => {
      //  console.log('Unit:', unit.title);
      //  console.log('is_visible type:', typeof unit.is_visible);
      //  console.log('is_visible value:', unit.is_visible);
      });
    });


  }


  //#ref 


  // Determine lesson status based on progress
  determineLessonStatus(lesson: any): string {
    if (lesson.progress !== undefined) {
      if (lesson.progress >= 100) return 'completed';
      if (lesson.progress > 0) return 'in-progress';
    }
    return 'not-started';
  }

  // Toggle theme open/closed state
  toggleTheme(theme: CourseTheme, event?: Event): void {
    // Prevent event propagation if event is provided
    if (event) {
      event.stopPropagation();
    }

    // Toggle the open state of the clicked theme
    theme.isOpen = !theme.isOpen;

    // Set this theme as active
    this.courseThemes.forEach(t => {
      t.isActive = (t.id === theme.id);
    });
  }

  // Toggle editMode on/off
  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  // THEME MANAGEMENT METHODS

  // Add a new theme
  addTheme(): void {
    // Generate a unique default name
    const newThemeNumber = this.courseThemes.length + 1;
    const newTheme: CourseTheme = {
      id: -Date.now(), // Temporary negative ID to identify as new but unique
      title: `باب جديد ${newThemeNumber}`,
      course_id: this.courseData.id,
      course_units: [],
      isOpen: true,
      isEditing: true,
      isNew: true, // Mark as new
      isModified: false,
      isDeleted: false,
      isSaved: false,
      deletedUnits: [],
      managementOptions: {
        canEdit: true,
        canDelete: true,
        canAddUnit: true
      }
    };

    // Add the new theme to the themes array
    this.courseThemes.push(newTheme);
  }

  // Edit an existing theme
  editTheme(theme: CourseTheme): void {
    theme.isEditing = true;
  }

  // Save a theme (new or edited)
  saveTheme(theme: CourseTheme): void {
    theme.isEditing = false;

    if (theme.isNew) {
      // It's a new theme, keep isNew flag
      theme.isSaved = false;
      this.saveEntireCourseStructure() ; 
    } else {
      // Check if the theme has actually changed
      if (theme.title !== theme.originalData?.title) {
        theme.isModified = true;
        theme.isSaved = false;
      }
    }

    // Emit event for parent component to know about the change
    this.structureChanged.emit({
      type: 'theme',
      action: theme.isNew ? 'add' : 'edit',
      data: theme
    });
  }

  // Delete a theme
  deleteTheme(theme: CourseTheme): void {
    if (confirm(`هل أنت متأكد من حذف الموضوع: ${theme.title}؟`)) {
      // If it's a new theme that hasn't been saved to the database yet
      if (theme.isNew) {
        // Just remove it from the array
        this.courseThemes = this.courseThemes.filter(t => t.id !== theme.id);
      } else {
        // For existing themes, mark as deleted and add to deleted IDs
        theme.isDeleted = true;
        this.deletedThemeIds.push(theme.id);

        // Also mark all child units and lessons as deleted
        theme.course_units.forEach(unit => {
          if (!unit.isNew) {
            this.deletedUnitIds.push(unit.id);
            unit.course_lessons.forEach(lesson => {
              if (!lesson.isNew) {
                this.deletedLessonIds.push(lesson.id);
              }
            });
          }
        });

        // Remove from the visible array
        this.courseThemes = this.courseThemes.filter(t => t.id !== theme.id);
      }

      // Mark that we have changes
      this.hasStructureChanges = true;

      // Emit event for parent component
      this.structureChanged.emit({
        type: 'theme',
        action: 'delete',
        data: theme
      });
    }
  }

  // UNIT MANAGEMENT METHODS

  // Add a new unit to a theme
  addUnit(theme: CourseTheme): void {
    const newUnit: CourseUnit = {
      id: -Date.now(), // Temporary negative ID
      title: 'وحدة جديدة',
      course_theme_id: theme.id,
      course_lessons: [],
      isEditing: true,
      isNew: true,
      isModified: false,
      isDeleted: false,
      isExpanded: true,
      isSaved: false,
      deletedLessons: [],
      managementOptions: {
        canEdit: true,
        canDelete: true,
        canAddLesson: true
      }
    };

    // Add the new unit
    theme.course_units.push(newUnit);
    theme.isOpen = true;

    // Mark that we have changes
    this.hasStructureChanges = true;
  }

  // Edit an existing unit
  editUnit(unit: CourseUnit): void {
    unit.isEditing = true;
  }

  // Save a unit (new or edited)
  saveUnit(theme: CourseTheme, unit: CourseUnit): void {
    unit.isEditing = false;

    if (unit.isNew) {
      // It's a new unit, keep isNew flag
      unit.isSaved = false;
      this.saveEntireCourseStructure() ; 
    } else {
      // Check if the unit has actually changed
      if (unit.title !== unit.originalData?.title) {
        unit.isModified = true;
        unit.isSaved = false;
      }
    }

    // Mark that we have changes
    this.hasStructureChanges = true;

    // Emit event for parent component
    this.structureChanged.emit({
      type: 'unit',
      action: unit.isNew ? 'add' : 'edit',
      data: unit
    });
  }

  // Delete a unit
  deleteUnit(theme: CourseTheme, unit: CourseUnit): void {
    if (confirm(`هل أنت متأكد من حذف الوحدة: ${unit.title}؟`)) {
      // If it's a new unit that hasn't been saved to the database yet
      if (unit.isNew) {
        // Just remove it from the array
        theme.course_units = theme.course_units.filter(u => u.id !== unit.id);
      } else {
        // For existing units, add to tracking arrays
        this.deletedUnitIds.push(unit.id);
        if (theme.deletedUnits) {
          theme.deletedUnits.push(unit.id);
        } else {
          theme.deletedUnits = [unit.id];
        }

        // Also mark all child lessons as deleted
        unit.course_lessons.forEach(lesson => {
          if (!lesson.isNew) {
            this.deletedLessonIds.push(lesson.id);
          }
        });

        // Remove from the visible array
        theme.course_units = theme.course_units.filter(u => u.id !== unit.id);
      }

      // Mark that we have changes
      this.hasStructureChanges = true;

      // Emit event for parent component
      this.structureChanged.emit({
        type: 'unit',
        action: 'delete',
        data: unit
      });
    }
  }

  // LESSON MANAGEMENT METHODS

  // Add a new lesson to a unit
  addLesson(unit: CourseUnit): void {
    const newLesson: CourseLesson = {
      id: -Date.now(), // Temporary negative ID
      title: 'درس جديد',
      course_unit_id: unit.id,
      is_free: false,
      isEditing: true,
      isNew: true,
      isModified: false,
      isDeleted: false,
      status: 'not-started',
      isSaved: false,
      managementOptions: {
        canEdit: true,
        canDelete: true,
        canAdd: true
      }
    };

    // Add the new lesson
    unit.course_lessons.push(newLesson);
    unit.isExpanded = true;

    // Add to flattened lessons array
    this.flattenedLessons.push(newLesson);

    // Mark that we have changes
    this.hasStructureChanges = true;
  }

  // Edit an existing lesson
  editLesson(lesson: CourseLesson): void {
    lesson.isEditing = true;
  }

  // Save a lesson (new or edited)
  saveLesson(unit: CourseUnit, lesson: CourseLesson): void {
    lesson.isEditing = false;

    if (lesson.isNew) {
      // It's a new lesson, keep isNew flag
      lesson.isSaved = false;
    } else {
      // Check if the lesson has actually changed
      if (lesson.title !== lesson.originalData?.title) {
        lesson.isModified = true;
        lesson.isSaved = false;
      }
    }

    // Mark that we have changes
    this.hasStructureChanges = true;

    // Emit event for parent component
    this.structureChanged.emit({
      type: 'lesson',
      action: lesson.isNew ? 'add' : 'edit',
      data: lesson
    });
  }

  // Delete a lesson
  deleteLesson(unit: CourseUnit, lesson: CourseLesson): void {
    if (confirm(`هل أنت متأكد من حذف الدرس: ${lesson.title}؟`)) {
      // If it's a new lesson that hasn't been saved to the database yet
      if (lesson.isNew) {
        // Just remove it from the array
        unit.course_lessons = unit.course_lessons.filter(l => l.id !== lesson.id);
        this.flattenedLessons = this.flattenedLessons.filter(l => l.id !== lesson.id);
      } else {
        // For existing lessons, add to tracking arrays
        this.deletedLessonIds.push(lesson.id);
        if (unit.deletedLessons) {
          unit.deletedLessons.push(lesson.id);
        } else {
          unit.deletedLessons = [lesson.id];
        }

        // Remove from arrays
        unit.course_lessons = unit.course_lessons.filter(l => l.id !== lesson.id);
        this.flattenedLessons = this.flattenedLessons.filter(l => l.id !== lesson.id);
      }

      // Mark that we have changes
      this.hasStructureChanges = true;

      // Emit event for parent component
      this.structureChanged.emit({
        type: 'lesson',
        action: 'delete',
        data: lesson
      });
    }
  }

  // Select a lesson
  selectLesson(theme: CourseTheme, lesson: CourseLesson): void {
    // Clear any previously selected lessons
    this.courseThemes.forEach(t =>
      t.course_units.forEach(u =>
        u.course_lessons.forEach(l => l.isActive = false)
      )
    );

    // Set the clicked lesson as active
    lesson.isActive = true;

    // Make sure the parent theme is open and active
    theme.isOpen = true;
    theme.isActive = true;

    // Emit the selected lesson
    this.lessonSelected.emit(lesson);
  }

  // Collect changes for the API
  collectChanges(): TocChanges {
    const changes: TocChanges = {
      themes: {
        created: [],
        updated: [],
        deleted: this.deletedThemeIds
      },
      units: {
        created: [],
        updated: [],
        deleted: this.deletedUnitIds
      },
      lessons: {
        created: [],
        updated: [],
        deleted: this.deletedLessonIds
      }
    };

    // Process themes
    this.courseThemes.forEach(theme => {
      if (theme.isNew) {
        // New theme
        changes.themes.created.push({
          id: theme.id,
          title: theme.title,
          course_id: theme.course_id,
          display_order: theme.display_order
        });
      } else if (theme.isModified) {
        // Modified theme
        changes.themes.updated.push({
          id: theme.id,
          is_visible: theme.is_visible,
          title: theme.title,
          display_order: theme.display_order
        });
      }

      // Process units for this theme
      theme.course_units.forEach(unit => {
        if (unit.isNew) {
          // New unit
          changes.units.created.push({
            id: unit.id,
            title: unit.title,
            course_theme_id: unit.course_theme_id,
            display_order: unit.display_order
          });
        } else if (unit.isModified) {
          // Modified unit
          changes.units.updated.push({
            id: unit.id,
            is_visible: unit.is_visible,
            title: unit.title,
            display_order: unit.display_order
          });
        }

        // Process lessons for this unit
        unit.course_lessons.forEach(lesson => {
          if (lesson.isNew) {
            // New lesson
            changes.lessons.created.push({
              id: lesson.id,
              title: lesson.title,
              course_unit_id: lesson.course_unit_id,
              display_order: lesson.display_order,
              is_free: lesson.is_free
            });
          } else if (lesson.isModified) {
            // Modified lesson
            changes.lessons.updated.push({
              id: lesson.id,
              title: lesson.title,
              display_order: lesson.display_order,
              is_free: lesson.is_free
            });
          }
        });
      });
    });

    return changes;
  }

  // Check if there are any changes to save
  hasChanges(): boolean {
    // Check for deleted items
    if (
      this.deletedThemeIds.length > 0 ||
      this.deletedUnitIds.length > 0 ||
      this.deletedLessonIds.length > 0
    ) {
      return true;
    }

    // Check for new or modified items
    for (const theme of this.courseThemes) {
      if (theme.isNew || theme.isModified) return true;

      for (const unit of theme.course_units) {
        if (unit.isNew || unit.isModified) return true;

        for (const lesson of unit.course_lessons) {
          if (lesson.isNew || lesson.isModified) return true;
        }
      }
    }

    return false;
  }

  // Helper method to check if there are unsaved changes
  hasUnsavedChanges(): boolean {
    // Check explicit structure changes flag
    if (this.hasStructureChanges) {
      return true;
    }

    // Check if there are any changes
    return this.hasChanges();
  }

  // Save the entire course structure with granular change tracking
  saveEntireCourseStructure(): void {
    // Reset progress and set loading state
    this.isLoading = true;
    this.savingProgress = 0;

    // Validate the structure
    if (!this.validateCourseStructure()) {
      this.showErrorMessage('يرجى التأكد من صحة البيانات');
      this.isLoading = false;
      return;
    }

    // Check if there are any changes to save
    if (!this.hasChanges()) {
      this.showSuccessMessage('لا توجد تغييرات للحفظ');
      this.isLoading = false;
      return;
    }

    // Collect all changes
    const changes = this.collectChanges();
   // console.log('Changes to be saved:', changes);

    // Start progress simulation
    const progressInterval = setInterval(() => {
      if (this.savingProgress < 90) {
        this.savingProgress += 10;
      }
    }, 500);

    // Send to backend
    this.tamemService.saveTocChanges(this.courseData.id, changes).subscribe({
      next: (response) => {
        // Clear interval and complete progress
        clearInterval(progressInterval);
        this.savingProgress = 100;

        // Process response and update IDs
        this.processApiResponse(response);

        // Short delay to show full progress
        setTimeout(() => {
          // Reset loading state
          this.isLoading = false;
          this.savingProgress = 0;

          // Reset change tracking
          this.hasStructureChanges = false;
          this.markAllItemsAsSaved();

          // Handle successful save
          //    this.showSuccessMessage('تم الحفظ بنجاح');
        }, 500);
      },
      error: (error) => {
        // Clear interval
        clearInterval(progressInterval);

        // Reset loading state
        this.isLoading = false;
        this.savingProgress = 0;

        // Handle save error
        this.showErrorMessage('حدث خطأ أثناء الحفظ');
        // console.error('Save structure error', error);
      }
    });
  }

  // Validate the entire course structure
  private validateCourseStructure(): boolean {
    // More comprehensive validation
    if (this.courseThemes.length === 0) {
      this.showErrorMessage('يجب إضافة موضوع واحد على الأقل');
      return false;
    }

    for (const theme of this.courseThemes) {
      if (!theme.title || theme.title.trim().length < 3) {
        this.showErrorMessage('يجب أن يكون عنوان الموضوع أكثر من 3 أحرف');
        return false;
      }

      for (const unit of theme.course_units) {
        // if (!unit.title || unit.title.trim().length < 3) {
        //   this.showErrorMessage('يجب أن يكون عنوان الوحدة أكثر من 3 أحرف');
        //   return false;
        // }

        for (const lesson of unit.course_lessons) {
          if (!lesson.title || lesson.title.trim().length < 3) {
            this.showErrorMessage('يجب أن يكون عنوان الدرس أكثر من 3 أحرف');
            return false;
          }
        }
      }
    }

    return true;
  }

  // Mark all items as saved after successful save
  private markAllItemsAsSaved(): void {
    // Reset deletion tracking
    this.deletedThemeIds = [];
    this.deletedUnitIds = [];
    this.deletedLessonIds = [];

    // Mark all themes, units, and lessons as saved
    this.courseThemes.forEach(theme => {
      theme.isSaved = true;
      theme.isNew = false;
      theme.isModified = false;
      theme.deletedUnits = [];

      // Update originalData to current state
      theme.originalData = { ...theme };

      theme.course_units.forEach(unit => {
        unit.isSaved = true;
        unit.isNew = false;
        unit.isModified = false;
        unit.deletedLessons = [];

        // Update originalData to current state
        unit.originalData = { ...unit };

        unit.course_lessons.forEach(lesson => {
          lesson.isSaved = true;
          lesson.isNew = false;
          lesson.isModified = false;

          // Update originalData to current state
          lesson.originalData = { ...lesson };
        });
      });
    });
  }

  // Process API response and update local IDs
  processApiResponse(response: ChangeResponse): void {
   //  console.log('Processing API response:', response);

    // Update theme IDs for newly created themes
    if (response.themes) {
      response.themes.forEach(themeResult => {
        if (themeResult.status === 'created' && themeResult.new_id) {
          // Find the theme with the temporary ID
          const theme = this.courseThemes.find(t => t.id === themeResult.id);
          if (theme) {
            // Update the ID with the new one from the server
            theme.id = themeResult.new_id;
            theme.isNew = false;
            theme.isSaved = true;

            // Update course_theme_id for all units in this theme
            theme.course_units.forEach(unit => {
              unit.course_theme_id = themeResult.new_id!;
            });
          }
        }
      });
    }

    // Update unit IDs for newly created units
    if (response.units) {
      response.units.forEach(unitResult => {
        if (unitResult.status === 'created' && unitResult.new_id) {
          // Find the unit with the temporary ID across all themes
          let foundUnit: CourseUnit | undefined;
          let parentTheme: CourseTheme | undefined;

          for (const theme of this.courseThemes) {
            const unit = theme.course_units.find(u => u.id === unitResult.id);
            if (unit) {
              foundUnit = unit;
              parentTheme = theme;
              break;
            }
          }

          if (foundUnit && parentTheme) {
            // Update the ID with the new one from the server
            foundUnit.id = unitResult.new_id;
            foundUnit.isNew = false;
            foundUnit.isSaved = true;

            // Update course_unit_id for all lessons in this unit
            foundUnit.course_lessons.forEach(lesson => {
              lesson.course_unit_id = unitResult.new_id!;
            });
          }
        }
      });
    }

    // Update lesson IDs for newly created lessons
    if (response.lessons) {
      response.lessons.forEach(lessonResult => {
        if (lessonResult.status === 'created' && lessonResult.new_id) {
          // Find the lesson with the temporary ID across all units
          let foundLesson: CourseLesson | undefined;

          // Search in flattened lessons for efficiency
          foundLesson = this.flattenedLessons.find(l => l.id === lessonResult.id);

          if (foundLesson) {
            // Update the ID with the new one from the server
            foundLesson.id = lessonResult.new_id;
            foundLesson.isNew = false;
            foundLesson.isSaved = true;
          }
        }
      });
    }
  }


  // Add these methods to your RightSidebarComponent class

  /**
   * Display an error message to the user
   * @param message Error message text
   */
  showErrorMessage(message: string): void {
    // Implement toast or notification method
   //  console.error('Error:', message);
    alert(message); // Basic implementation for now
  }

  /**
   * Display a success message to the user
   * @param message Success message text
   */
  showSuccessMessage(message: string): void {
    // Implement toast or notification method
    // console.log('Success:', message);
    alert(message); // Basic implementation for now
  }


  toggleThemeVisibility(theme: CourseTheme, event?: Event): void {
    if (this.editMode) {
      // Explicitly toggle the visibility
      theme.is_visible = theme.is_visible === false ? true : false;
      // Mark the theme as modified
      theme.isModified = true;

      // Set a flag for unsaved changes
      this.hasStructureChanges = true;

    }
  }

  toggleUnitVisibility(unit: CourseUnit, event?: Event): void {
    if (this.editMode) {
     
   //   unit.is_visible = unit.is_visible === false ? true : false;
       // Toggle between 1 (visible) and 0 (hidden)
    unit.is_visible = unit.is_visible === 1 ? 0 : 1;

      // Mark the unit as modified
      unit.isModified = true;

      // Set a flag for unsaved changes
      this.hasStructureChanges = true;
    }
  }




}
