import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component, inject, OnInit, HostListener } from '@angular/core'
import { IntroComponent } from './components/intro/intro.component'
import { OverviewComponent } from './components/overview/overview.component'
import { CurriculumComponent } from './components/curriculum/curriculum.component'
import { InstructorComponent } from './components/instructor/instructor.component'
import { ReviewsComponent } from './components/reviews/reviews.component'
import { FaqsComponent } from './components/faqs/faqs.component'
import { CommentComponent } from './components/comment/comment.component'
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component'
import { TopListedCourseComponent } from './components/top-listed-course/top-listed-course.component'
import { NgbActiveModal, NgbActiveOffcanvas, NgbNavModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { VideoComponent } from './components/video/video.component'
import { TopicsComponent } from './components/topics/topics.component'
import { QuizComponent } from './components/quiz/quiz.component'
import { TamemService } from '@/app/core/service/tamem-service.service'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { KnowledgeCheckComponent } from './components/knowledge-check/knowledge-check.component'
import { TermMatchingComponent } from './components/term-matching/term-matching.component'
import { ProcessOrderingComponent } from './components/process-ordering/process-ordering.component'
import { PartsIdentificationComponent } from './components/parts-identification/parts-identification.component'
import { ApplicationSenarioComponent } from './components/application-senario/application-senario.component'
import { ConceptMapComponent } from './components/concept-map/concept-map.component'
import { ChallangesBoxComponent } from './components/challanges-box/challanges-box.component'
import { StepperComponent } from './components/stepper/stepper.component'
import { BannerComponent } from './components/banner/banner.component'
import { CourseIntroComponent } from './components/course-intro/course-intro.component'
import { LessonStatisticsComponent } from './components/lesson-statistics/lesson-statistics.component'
import { LessonViewComponent } from './components/lesson-view/lesson-view.component'
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component'
import { ActivatedRoute } from '@angular/router'
import { LessonBlockComponent } from './components/lesson-block/lesson-block.component'
import { ManageBlocksComponent } from './components/manage-blocks/manage-blocks.component'
import { LearningJourneyComponent } from './components/learning-journey/learning-journey.component'

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    AppMenuComponent,
    NgbNavModule,
    FooterComponent,
    LessonViewComponent,
    ManageBlocksComponent,
    RightSidebarComponent,
    BannerComponent,

    /*
        IntroComponent,
        OverviewComponent,
        CurriculumComponent,
        InstructorComponent,
        ReviewsComponent,
        FaqsComponent,
        CommentComponent,
       
        TopListedCourseComponent,
        VideoComponent,
        TopicsComponent,
        QuizComponent,
        DashboardComponent,
        KnowledgeCheckComponent,
        TermMatchingComponent,
        ProcessOrderingComponent,
        PartsIdentificationComponent,
        ApplicationSenarioComponent,
        ConceptMapComponent,
        ChallangesBoxComponent,
        StepperComponent,
     
        CourseIntroComponent,
        LessonStatisticsComponent,
       */
    LearningJourneyComponent


  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  providers: [NgbActiveOffcanvas,NgbActiveModal],
})
export class DetailComponent implements OnInit {
  public offcanvasService = inject(NgbOffcanvas)
  private tamemService = inject(TamemService)
  private route = inject(ActivatedRoute)

  courseId: number = 0; // Initialize with a default value
  isLoading = true
  errorMessage: string | null = null
  courseData: any = null
  totalSteps: number = 20
  currentStep: number = 16
  selectedLesson: any = null
  showSidebar: boolean = true;  // Default to showing the sidebar
  sidebarEditMode: boolean = false;
  viewMode: 'lesson' | 'blocks' = 'lesson';
  isLessonViewVisible: boolean = true; // Default to showing the lesson view

  selectedBlock: any = null;
  isJourneyActive: boolean = false;

  // Add this method to handle the startJourney event
  onStartJourney(block: any): void {
    this.selectedBlock = block;
    this.isJourneyActive = true;
    console.log('Starting journey for block:', block);
  }

  // Also add this method to return to lesson view when journey is complete
  onReturnToLesson(): void {
    this.isJourneyActive = false;
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  // Check screen size and set sidebar visibility
  checkScreenSize() {
    this.showSidebar = window.innerWidth >= 1200 || this.isSidebarManuallyOpened;
  }

  // Flag to track if sidebar was manually opened on mobile
  isSidebarManuallyOpened: boolean = false;

  ngOnInit() {
   

    // Initial check for screen size
    this.checkScreenSize();

    // Get course ID from route params if available
    this.route.params.subscribe(params => {
      if (params['courseId']) {
        this.courseId = +params['courseId']; // Convert to number
      } else {
        // Fallback to default course ID if not in URL
        this.courseId = 1;
      }

      // Check for edit mode query parameter
      this.route.queryParams.subscribe(queryParams => {
        this.sidebarEditMode = queryParams['edit'] === 'true';
      });

      this.fetchCourseData();

       

    });
  }

  /**
   * Fetch course data from API
   */
  fetchCourseData() {
    this.isLoading = true;
    this.errorMessage = null;

    if (!this.courseId) {
      this.errorMessage = 'معرف المقرر غير متوفر';
      this.isLoading = false;
      return;
    }

    this.tamemService.getCourseData(this.courseId).subscribe({
      next: (data) => {
        this.courseData = data;

        // Check if response has the expected structure
        if (!data || !data.id || !data.title) {
          this.errorMessage = 'تنسيق البيانات غير صالح';
        }

        // Select the first lesson by default if available
        this.selectDefaultLesson();
      },
      error: (error) => {
        console.error('API Error:', error);
        this.errorMessage = 'حدث خطأ أثناء تحميل البيانات. حاول مرة أخرى.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Select the first available lesson by default
   */
  selectDefaultLesson() {
    if (this.courseData && this.courseData.course_themes && this.courseData.course_themes.length > 0) {
      const firstTheme = this.courseData.course_themes[0];
      if (firstTheme.course_units && firstTheme.course_units.length > 0) {
        const firstUnit = firstTheme.course_units[0];
        if (firstUnit.course_lessons && firstUnit.course_lessons.length > 0) {
          this.selectedLesson = firstUnit.course_lessons[0];
        }
      }
    }
  }

  /**
   * Handle lesson selection from sidebar
   */
  onLessonSelected(lesson: any) {
    this.selectedLesson = lesson;

    // If on mobile, hide the sidebar after selection
    if (window.innerWidth < 1200) {
      this.showSidebar = false;
      this.isSidebarManuallyOpened = false;
    }

    console.log('Selected lesson:', lesson);
  }

  /**
   * Toggle sidebar visibility for mobile view
   */
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.isSidebarManuallyOpened = this.showSidebar;
  }

  /**
   * Toggle sidebar edit mode
   */
  toggleSidebarEditMode() {
    this.sidebarEditMode = !this.sidebarEditMode;
  }

  showLessonView() {
    this.isLessonViewVisible = true;
  }

  showManageBlocks() {
    this.isLessonViewVisible = false;
  }

  /**
   * Set the current view mode (lesson or blocks)
   */
  setViewMode(mode: 'lesson' | 'blocks') {
    this.viewMode = mode;
    this.isLessonViewVisible = mode === 'lesson';
  }
}