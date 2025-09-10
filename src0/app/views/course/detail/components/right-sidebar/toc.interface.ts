// Define interfaces for the save response
export interface SavedLesson {
    id: number;
    title: string;
  }
  
  export interface SavedUnit {
    id: number;
    title: string;
    lessons: SavedLesson[];
  }
  
  export interface SavedTheme {
    id: number;
    title: string;
    units: SavedUnit[];
  }
  
  export interface CourseStructureSaveResponse {
    themes?: SavedTheme[];
    data?: SavedTheme[];
    [key: string]: any; // Allow for additional properties
  }
  
  // Base Item interface for common properties
  export interface BaseItem {
    id: number;
    title: string;
    isNew?: boolean;
    isDeleted?: boolean;
    isModified?: boolean;
    originalData?: any; // For tracking changes
    isSaved: boolean;
  }
  
  // Interfaces with management capabilities
  export interface CourseLesson extends BaseItem {
    description?: string;
    video_url?: string;
    cover_image?: string;
    duration?: string;
    is_free: boolean;
    display_order?: number;
    page_number?: number;
    course_unit_id: number;
    status?: string;
    isActive?: boolean;
    isEditing?: boolean;
    managementOptions?: {
      canEdit?: boolean;
      canDelete?: boolean;
      canAdd?: boolean;
    };
  }
  
  export interface CourseUnit extends BaseItem {
    slug?: string;
    description?: string;
    display_order?: number;
    course_theme_id: number;
    course_lessons: CourseLesson[];
    isEditing?: boolean;
    isExpanded?: boolean;
    is_visible?: boolean | number;
    deletedLessons?: number[]; // Track deleted lesson IDs
    managementOptions?: {
      canEdit?: boolean;
      canDelete?: boolean;
      canAddLesson?: boolean;
    };
  }
  
  export interface CourseTheme extends BaseItem {
    slug?: string;
    description?: string;
    display_order?: number;
    course_id: number;
    course_units: CourseUnit[];
    isOpen?: boolean;
    isActive?: boolean;
    isEditing?: boolean;
    isExpanded?: boolean; // Add this to control theme visibility
    is_visible?: boolean; // Add this to control overall theme visibility
    deletedUnits?: number[]; // Track deleted unit IDs
    managementOptions?: {
      canEdit?: boolean;
      canDelete?: boolean;
      canAddUnit?: boolean;
    };
  }
  
  // API response interfaces
  export interface ChangeResponse {
    themes?: {
      id: number;
      new_id?: number;
      status: 'created' | 'updated' | 'deleted' | 'error';
    }[];
    units?: {
      id: number;
      new_id?: number;
      status: 'created' | 'updated' | 'deleted' | 'error';
    }[];
    lessons?: {
      id: number;
      new_id?: number;
      status: 'created' | 'updated' | 'deleted' | 'error';
    }[];
  }
  
  // Change tracking for API request
  export interface TocChanges {
    themes: {
      created: Partial<CourseTheme>[];
      updated: Partial<CourseTheme>[];
      deleted: number[];
    };
    units: {
      created: Partial<CourseUnit>[];
      updated: Partial<CourseUnit>[];
      deleted: number[];
    };
    lessons: {
      created: Partial<CourseLesson>[];
      updated: Partial<CourseLesson>[];
      deleted: number[];
    };
  }