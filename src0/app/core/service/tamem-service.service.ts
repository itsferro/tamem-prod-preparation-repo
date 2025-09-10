import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, map, Observable, of, tap, throwError } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'
import type { User } from '../helpers/user'
import { ChangeResponse, TocChanges } from '@/app/views/course/detail/components/right-sidebar/toc.interface'
import { delay } from 'rxjs/operators'

// mock data functions 
import { getBlockJourneySteps_mock } from '@/app/views/course/learning-journey/mock-journey-data'
import { getMcqChallengeData_mock } from '../../views/course/learning-journey/mock-journey-data'

@Injectable({
  providedIn: 'root',
})
export class TamemService {
  user: User | null = null

  public readonly authSessionKey = 'EDUPORT_AUTH_SESSION_KEY_'

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  private apiUrl = 'https://api.tamem.com.ly/api' // 🔹 Change this to your API URL

  ///block/{blockId}/tasks

  getAvailableCourses(): Observable<any> {
    const url = `${this.apiUrl}/admin/courses`
    return this.http.get<any>(url)
  }

  getCourseBlocksMonitor(courseId: number): Observable<any> {
    const url = `${this.apiUrl}/admin/${courseId}/monitor`
    return this.http.get<any>(url)
  }
 
  getDevelopmentTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/devolpment_tasks`)
  }

  postBlockTasks(blockId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/block/${blockId}/tasks`, {
      blockId: blockId,
    })
  }

  deleteBlockTasks(blockId: number): Observable<any> {
    // /block/{blockId}/tasks
    return this.http.delete(`${this.apiUrl}/block/${blockId}/tasks`)
  }

  submitTaskAction(taskId: number, actionData: any): Observable<any> {
    const url = `${this.apiUrl}/task/${taskId}/actions/submit`  // /task/{taskId}/actions/submit
    return this.http.post<any>(url, actionData)
  }

  getTaskActions(taskId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/task/${taskId}/actions`)
  }

  /**
   * Get team members for assignment
   * @returns Observable with team members data
   */
  getTeamMembers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/team_members`)
  }

  getTaskLogHistory(taskId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/task_log_history/${taskId}`)
  }

  getTaskStatusFlow(taskId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/task_status_flow/${taskId}`)
  }

  getBlockTasks(blockId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/block/${blockId}/tasks`)
  }

  getCourseTasks(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/course/${courseId}/tasks`)
  }

  getCurrentUserTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current_user_tasks`)
  }

  generateKeyInsights(blockId: any, extendInsights: boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/block_insights`, {
      blockId: blockId,
      extendInsights: extendInsights
    })
  }

  getKeyInsights(blockId: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/block_insights/${blockId}`)
  }

  getMcqChallengeData(challengeId: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/challenge_data_ai`, {
      blockId: challengeId
    })
  }

  getBlockJourneySteps(blockId: string | number): Observable<any> {
    // Convert numeric IDs to strings if needed
    const blockIdStr = typeof blockId === 'number' ? blockId.toString() : blockId
    const journeyData = getBlockJourneySteps_mock(blockIdStr)
    return of(journeyData).pipe(delay(300))
  }

  updateLessonBlockActions(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/lesson-block/update`, formData)
  }

  /**
   * Saves storyboard data and images to the server
   * @param formData FormData containing storyboard JSON and image files
   * @returns Observable with API response
   */
  saveStoryboard(formData: FormData): Observable<any> {
    // Log the FormData contents for debugging
    console.log('FormData keys being sent:', Array.from((formData as any).keys()))

    return this.http.post<any>(`${this.apiUrl}/save-story-board`, formData)
      .pipe(
        tap(response => console.log('Storyboard saved successfully:', response)),
        catchError(error => {
          console.error('Error saving storyboard:', error)
          return throwError(() => new Error('Failed to save storyboard'))
        })
      )
  }

  getStoryboardFrames(lessonBlockId: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/storyboard-frames/${lessonBlockId}`).pipe(
      tap((response) => console.log('Storyboard frames loaded successfully:', response)),
      catchError(error => {
        console.error('Error loading storyboard frames:', error)
        return throwError(() => new Error('Failed to load storyboard frames. Please try again later.'))
      })
    )
  }

  generateImagePrompts(content: any, style: any, layout: any,): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/image-prompts/generate`, {
      content,
      style,
      layout
    })
  }

  generateStoryboard(textContent: string, prompt: string, blockId: number, insights: any, mode: any) {
    return this.http.post<any>(`${this.apiUrl}/storyboard/generate`, {
      content: textContent,
      prompt: prompt,
      blockId: blockId,
      insights: JSON.stringify(insights),
      mode: mode
    }).pipe(
      catchError((error) => {
        console.error('Error generating storyboard:', error)

        // Prepare a user-friendly error message
        let errorMessage = 'Failed to generate storyboard.'

        if (error.status === 0) {
          errorMessage = 'Network error - please check your connection.'
        } else if (error.status === 500) {
          errorMessage = error.error?.message || 'Server error occurred during storyboard generation.'
        } else if (error.status === 413) {
          errorMessage = 'The content is too large for processing.'
        } else if (error.status === 400) {
          errorMessage = error.error?.message || 'Invalid request parameters.'
        } else if (error.status === 429) {
          errorMessage = 'Too many requests - please try again later.'
        } else if (error.status === 401) {
          errorMessage = 'Authentication error - please log in again.'
        }

        // Return a throwable with a formatted error object
        return throwError(() => ({
          error: true,
          message: errorMessage,
          statusCode: error.status,
          originalError: error.error
        }))
      })
    )
  }

  // In tamem-service.service.ts
  deleteLessonBlock(blockId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lesson-block/${blockId}`)
  }

  getLessonBlock(blockId: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lesson-block/${blockId}`)
  }

  getLessonBlocks(lessonId: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lesson-blocks?lesson_id=${lessonId}`)
  }

  // Add these methods to your existing TamemService
  createLessonBlock(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/lesson-block`, formData)
  }

  updateLessonBlock(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/lesson-block/update`, formData)
  }

  // Endpoint to save entire course structure
  saveCourseStructure(structureData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/courses/structure`, structureData)
  }

  /**
   * Save TOC changes with granular tracking (create/update/delete)
   * @param courseId Course ID
   * @param changes Object containing all changes to apply
   * @returns Observable with change response
   */
  saveTocChanges(courseId: number, changes: TocChanges): Observable<ChangeResponse> {
    const url = `${this.apiUrl}/courses/${courseId}/structure/changes`

    // Log the changes being sent
    console.log('Sending TOC changes to API:', changes)

    return this.http.post<ChangeResponse>(url, changes).pipe(
      tap((response: any) => console.log('TOC changes saved successfully:', response)),
      catchError(error => {
        console.error('Error saving TOC changes:', error)
        return throwError(() => new Error('Failed to save TOC changes'))
      })
    )
  }

  getCourses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses`)
      .pipe(
        catchError(error => {
          console.error('Error fetching courses:', error)
          return throwError(() => new Error('Failed to load courses. Please try again later.'))
        })
      )
  }

  getCourseData(courseId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses/${courseId}`).pipe(
      map(response => {
        if (!response || !response.data) {
          throw new Error('Invalid API response')
        }

        // Return the full course data directly
        // No need to restructure it since we'll use the backend schema directly
        return response.data
      }),
      catchError(error => {
        console.error('❌ API Error:', error)
        return throwError(() => new Error('Error fetching course data'))
      })
    )
  }

  /**
   * Handle API errors
   */
  private handleError(error: any) {
    console.error('❌ API Error:', error)

    switch (error.status) {
      case 401:
        console.warn('🚨 Unauthorized: Redirecting to login...')
        break
      case 404:
        console.warn('❌ Resource not found.')
        break
      case 500:
        console.warn('⚠️ Server error - try again later.')
        break
      default:
        console.warn('⚠️ An unexpected error occurred.')
    }

    return throwError(() => error) // ✅ Re-throw error for the component to handle
  }

  saveUploadedImages(images: { url: string; name: string }[]): Observable<any> {
    const formData = new FormData()
    images.forEach((image, index) => {
      formData.append(`image_${index}`, image.url)
      formData.append(`name_${index}`, image.name)
    })

    return this.http.post<any>(`${this.apiUrl}/upload-images`, formData).pipe(
      tap((response) => console.log('Images uploaded successfully:', response)),
      catchError(error => {
        console.error('Error uploading images:', error)
        return throwError(() => new Error('Failed to upload images. Please try again later.'))
      })
    )
  }

  /**
   * Send AI API request through backend proxy
   * @param apiRequest The AI API request object (JSON format)
   * @returns Observable with AI API response
   */
  sendAiApiRequest(apiRequest: any): Observable<any> {
    const url = `${this.apiUrl}/ai-api-proxy`
    
    return this.http.post<any>(url, {
      apiRequest: apiRequest,
      timestamp: new Date().toISOString()
    }).pipe(
      tap((response) => console.log('AI API request sent successfully:', response)),
      catchError(error => {
        console.error('Error sending AI API request:', error)
        
        // Prepare detailed error response
        let errorMessage = 'Failed to send AI API request.'

        if (error.status === 0) {
          errorMessage = 'Network error - please check your connection.'
        } else if (error.status === 400) {
          errorMessage = error.error?.message || 'Invalid API request format.'
        } else if (error.status === 401) {
          errorMessage = 'Authentication failed - please check API credentials.'
        } else if (error.status === 403) {
          errorMessage = 'Access forbidden - insufficient permissions.'
        } else if (error.status === 429) {
          errorMessage = 'Rate limit exceeded - please try again later.'
        } else if (error.status === 500) {
          errorMessage = error.error?.message || 'Server error occurred while processing AI API request.'
        } else if (error.status === 502) {
          errorMessage = 'AI API service temporarily unavailable.'
        } else if (error.status === 503) {
          errorMessage = 'AI API service overloaded - please try again later.'
        } else if (error.status === 504) {
          errorMessage = 'AI API request timeout - the request took too long to process.'
        }

        // Return formatted error for the component
        return throwError(() => ({
          error: true,
          message: errorMessage,
          statusCode: error.status,
          originalError: error.error,
          timestamp: new Date().toISOString()
        }))
      })
    )
  }

  // ============================================
  // ATTACHMENTS API METHODS (Updated & Fixed)
  // ============================================

  /**
   * Save block images using the new attachments API
   * @param blockId number
   * @param files File[]
   * @returns Observable<any>
   */
  saveBlockImages(blockId: number, files: File[]): Observable<any> {
    const formData = new FormData()
    
    // Add reference information
    formData.append('reference_type', 'App\\Models\\CourseLessonBlock')
    formData.append('reference_id', blockId.toString())
    formData.append('file_type', 'image')
    formData.append('storage_driver', 'local') // or your preferred storage driver
    
    // Add files
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    return this.http.post(`${this.apiUrl}/attachments`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / (event.total || 1))
            return { status: 'progress', progress }
          case HttpEventType.Response:
            return { status: 'complete', data: event.body }
          default:
            return { status: 'uploading' }
        }
      }),
      catchError(this.handleError.bind(this))
    )
  }

  /**
   * Get block images from attachments API
   * @param blockId number
   * @returns Observable<any>
   */
  getBlockImages(blockId: number): Observable<any> {
    const params = new HttpParams()
      .set('reference_type', 'App\\Models\\CourseLessonBlock')
      .set('reference_id', blockId.toString())
      .set('file_type', 'image')
      
    return this.http.get(`${this.apiUrl}/attachments`, { params }).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  /**
   * Delete a specific attachment
   * @param attachmentId string
   * @returns Observable<any>
   */
  deleteAttachment(attachmentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/attachments/${attachmentId}`).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  /**
   * Get all attachments for a block (images, videos, documents)
   * @param blockId number
   * @param fileType string (optional filter)
   * @returns Observable<any>
   */
  getBlockAttachments(blockId: number, fileType?: string): Observable<any> {
    let params = new HttpParams()
      .set('reference_type', 'App\\Models\\CourseLessonBlock')
      .set('reference_id', blockId.toString())
      
    if (fileType) {
      params = params.set('file_type', fileType)
    }
      
    return this.http.get(`${this.apiUrl}/attachments`, { params }).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  /**
   * Upload any file type to a block
   * @param blockId number
   * @param files File[]
   * @param fileType string
   * @param storageDriver string (optional)
   * @returns Observable<any>
   */
  saveBlockFiles(blockId: number, files: File[], fileType: string, storageDriver: string = 'local'): Observable<any> {
    const formData = new FormData()
    
    formData.append('reference_type', 'App\\Models\\CourseLessonBlock')
    formData.append('reference_id', blockId.toString())
    formData.append('file_type', fileType)
    formData.append('storage_driver', storageDriver)
    
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    return this.http.post(`${this.apiUrl}/attachments`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / (event.total || 1))
            return { status: 'progress', progress }
          case HttpEventType.Response:
            return { status: 'complete', data: event.body }
          default:
            return { status: 'uploading' }
        }
      }),
      catchError(this.handleError.bind(this))
    )
  }

  /**
   * Upload files for any entity type (User, Course, etc.)
   * @param referenceType string (e.g., 'App\\Models\\User')
   * @param referenceId number
   * @param files File[]
   * @param fileType string
   * @param storageDriver string (optional)
   * @returns Observable<any>
   */
  saveAttachments(referenceType: string, referenceId: number, files: File[], fileType: string, storageDriver: string = 'local'): Observable<any> {
    const formData = new FormData()
    
    formData.append('reference_type', referenceType)
    formData.append('reference_id', referenceId.toString())
    formData.append('file_type', fileType)
    formData.append('storage_driver', storageDriver)
    
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    return this.http.post(`${this.apiUrl}/attachments`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / (event.total || 1))
            return { status: 'progress', progress }
          case HttpEventType.Response:
            return { status: 'complete', data: event.body }
          default:
            return { status: 'uploading' }
        }
      }),
      catchError(this.handleError.bind(this))
    )
  }



// Add this method to your TamemService

/**
 * Generate key insights from block images using AI
 * @param blockId number
 * @returns Observable<any>
 */
generateInsightsFromBlockImages(blockId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/generate-insights-from-images`, {
    blockId: blockId
  }).pipe(
    tap((response) => console.log('Insights generated successfully:', response)),
    catchError(error => {
      console.error('Error generating insights from images:', error)
      
      let errorMessage = 'Failed to generate insights from images.'

      if (error.status === 404) {
        errorMessage = 'No images found for this block. Please upload images first.'
      } else if (error.status === 400) {
        errorMessage = error.error?.error || 'Invalid request parameters.'
      } else if (error.status === 500) {
        errorMessage = error.error?.error || 'Server error occurred while generating insights.'
      } else if (error.status === 429) {
        errorMessage = 'Rate limit exceeded - please try again later.'
      }

      return throwError(() => ({
        error: true,
        message: errorMessage,
        statusCode: error.status,
        originalError: error.error
      }))
    })
  )
}



 

/**
 * Generate storyboard content from block images using AI
 * @param blockId number
 * @returns Observable<any>
 */
generateContentFromBlockImages(blockId: number): Observable<any> {
  console.log('Service: Sending request for blockId:', blockId);
  
  return this.http.post(`${this.apiUrl}/generate-content-from-images`, {
    blockId: blockId
  }).pipe(
    tap((response) => {
      console.log('Service: Raw response received:', response);
      console.log('Service: Storyboard generated successfully');
    }),
    catchError(error => {
      console.error('Service: Error generating storyboard from images:', error);
      
      let errorMessage = 'Failed to generate storyboard from images.';

      if (error.status === 404) {
        errorMessage = 'No images found for this block. Please upload images first.';
      } else if (error.status === 400) {
        errorMessage = error.error?.error || 'Invalid request parameters.';
      } else if (error.status === 500) {
        errorMessage = error.error?.error || 'Server error occurred while generating storyboard.';
      } else if (error.status === 429) {
        errorMessage = 'Rate limit exceeded - please try again later.';
      } else if (error.status === 0) {
        errorMessage = 'Network error - please check your connection.';
      }

      console.error('Service: Throwing error:', errorMessage);

      return throwError(() => ({
        error: true,
        message: errorMessage,
        statusCode: error.status,
        originalError: error.error
      }));
    })
  );
}



}