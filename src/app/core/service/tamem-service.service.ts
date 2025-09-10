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
    //private cookieService: CookieService
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

  // Add this method to your TamemService class

  /**
   * Save/update block content by patching the block with new content
   * @param blockId - The ID of the block to update
   * @param content - The content to save
   * @returns Observable of the API response
   */
  patchBlockContent(blockId: number, content: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/block/${blockId}`, {
      content
    });
  }



  
  getBlockContent(blockId:  number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/block_content/${blockId}`)
  }

  getInsightFrames(insightId:  number , blockId:  number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/insight_frames/block/${blockId}/insight/${insightId}`)
  }



  postInsightFrames(insightId:  number , blockId:  number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insight_frames/generate`, {
      blockId,
      insightId
    })
  }



  /**
   * Save insight frames to the backend
   * @param insightId - The insight ID
   * @param blockId - The block ID  
   * @param frames - Array of frame objects to save
   * @returns Observable with save response
   */
  saveInsightFrames(insightId: number, blockId: number, frames: any[]): Observable<any> {
    console.log('Saving frames to backend:', {
      insightId,
      blockId,
      frameCount: frames.length
    });

    const payload = {
      insight_id: insightId,
      block_id: blockId,
      frames: frames
    };

    return this.http.post<any>(`${this.apiUrl}/insight_frames/save`, payload).pipe(
      tap((response) => {
        console.log('Frames saved successfully:', response);
      }),
      catchError(error => {
        console.error('Error saving frames:', error);
        
        let errorMessage = 'Failed to save frames.';

        if (error.status === 422) {
          // Validation errors
          const validationErrors = error.error.errors || {};
          const errorMessages = Object.values(validationErrors).flat();
          errorMessage = 'Validation failed: ' + errorMessages.join(', ');
        } else if (error.status === 404) {
          errorMessage = 'Insight or block not found.';
        } else if (error.status === 500) {
          errorMessage = error.error?.message || 'Server error occurred while saving frames.';
        } else if (error.status === 0) {
          errorMessage = 'Network error - please check your connection.';
        }

        return throwError(() => ({
          error: true,
          message: errorMessage,
          statusCode: error.status,
          originalError: error.error,
          timestamp: new Date().toISOString()
        }));
      })
    );
  }




  


  


  postFrameSkecthHtmlCode(frameId: number, reactCode: any, editorCssCode: string, editorJsCode: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate-frame-sketch`, {
      frameId: frameId,
      reactCode: reactCode,

    });
  }


  navigateFramesSketchHtmlCode(currentFrameId:  number , direction:  string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/react_frame_code/frame/${currentFrameId}/direction/${direction}`)
  }


 
   // GET /frame/{frameId}/get-frame-html-code  -> { htmlCode: string }
   getFrameHtml(frameId: number) {
    const url = `${this.apiUrl}/frame/${frameId}/get-frame-html-code`;
    return this.http.get<any>(url).pipe(
      map(resp => ({
        // normalize common shapes safely
        htmlCode: resp?.html_code ?? resp?.data?.html_code ?? ''
      }))
    );
  }



  getFrameHtmlCombined(frameId: number) {
    // returns { combinedCode: string }  // full HTML doc with embedded CSS/JS
    return this.http.get<{ combinedCode: string }>(`/api/frames/${frameId}/combined`);
  }

  saveFrameHtml(frameId: number, htmlCode: string) {
    // saves the single-file combined doc
    return this.http.post(`/api/frames/${frameId}/save-htnl-code`, { htmlCode });
  }



  // ============================================
  // FRAME HTML CODE API METHODS
  // ============================================

  /**
   * Get all HTML versions for a specific frame
   * @param frameId Frame ID
   * @returns Observable with all versions
   */
  getFrameHtmlVersions(frameId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/frames/${frameId}/html-versions`).pipe(
      tap((response) => console.log('Frame HTML versions loaded:', response)),
      catchError(error => {
        console.error('Error loading frame HTML versions:', error)
        return throwError(() => new Error('Failed to load frame HTML versions'))
      })
    )
  }

  /**
   * Get the default HTML version for a frame
   * @param frameId Frame ID
   * @returns Observable with default version
   */
  getFrameHtmlDefault(frameId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/frame/${frameId}/html-default`).pipe(
      tap((response) => console.log('Default frame HTML loaded:', response)),
      catchError(error => {
        console.error('Error loading default frame HTML:', error)
        return throwError(() => new Error('Failed to load default frame HTML'))
      })
    )
  }

  /**
   * Save new HTML code for a frame (creates new version)
   * @param frameId Frame ID
   * @param htmlCode HTML code content
   * @returns Observable with created version
   */
  saveFrameHtmlCode(frameId: number, htmlCode: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/frame/html-code`, {
      frame_id: frameId,
      html_code: htmlCode
    }).pipe(
      tap((response) => console.log('Frame HTML code saved:', response)),
      catchError(error => {
        console.error('Error saving frame HTML code:', error)
        return throwError(() => new Error('Failed to save frame HTML code'))
      })
    )
  }

  /**
   * Update existing HTML code version
   * @param versionId Version ID to update
   * @param htmlCode New HTML code content
   * @returns Observable with updated version
   */
  updateFrameHtmlCode(versionId: number, htmlCode: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/frame/html-code/${versionId}`, {
      html_code: htmlCode
    }).pipe(
      tap((response) => console.log('Frame HTML code updated:', response)),
      catchError(error => {
        console.error('Error updating frame HTML code:', error)
        return throwError(() => new Error('Failed to update frame HTML code'))
      })
    )
  }

  /**
   * Delete a specific HTML code version
   * @param versionId Version ID to delete
   * @returns Observable with deletion result
   */
  deleteFrameHtmlCode(versionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/frame/html-code/${versionId}`).pipe(
      tap((response) => console.log('Frame HTML code deleted:', response)),
      catchError(error => {
        console.error('Error deleting frame HTML code:', error)
        return throwError(() => new Error('Failed to delete frame HTML code'))
      })
    )
  }

  /**
   * Set a specific version as default
   * @param versionId Version ID to set as default
   * @returns Observable with result
   */
  setFrameHtmlDefault(versionId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/frame/html-code/${versionId}/set-default`, {}).pipe(
      tap((response) => console.log('Frame HTML default set:', response)),
      catchError(error => {
        console.error('Error setting frame HTML default:', error)
        return throwError(() => new Error('Failed to set frame HTML as default'))
      })
    )
  }

  //Created by Feras *********************START**************************
  /**
   * Get blocks structure for sprint management
   * @returns Observable with blocks data including insights and frames
   */
  getSprintBlocks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sprint/blocks`).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  /**
   * Get assignments (individual records that need grouping by batch_id)
   * @param date Optional date filter (YYYY-MM-DD format)
   * @returns Observable with assignment records
   */
  getSprintAssignments(date?: string): Observable<any> {
    let params = new HttpParams()
    if (date) {
      params = params.set('date', date)
    }
    return this.http.get(`${this.apiUrl}/sprint/assignments`, { params }).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  /**
   * Create a new sprint assignment
   * @param assignmentData Assignment data with new structure
   * @returns Observable with created assignment response
   */
  createSprintAssignment(assignmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sprint/assignments`, assignmentData).pipe(
      tap((response) => console.log('Sprint assignment created:', response)),
      catchError(this.handleError.bind(this))
    )
  }

  /**
   * Mark a frame or step as completed
   * @param frameId Frame/Step ID to mark as completed
   * @param completedAt Optional completion timestamp
   * @returns Observable with completion response
   */
  completeSprintFrame(frameId: number, completedAt?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sprint/complete_frame`, {
      frameId,
      completedAt
    }).pipe(
      tap((response) => console.log('Sprint item completed:', response)),
      catchError(this.handleError.bind(this))
    )
  }

  /**
   * Delete a sprint assignment
   * @param groupId Group ID of the assignment to delete
   * @returns Observable with deletion result
   */
  deleteSprintAssignment(groupId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/sprint/assignments/${groupId}`).pipe(
      tap((response) => console.log('Sprint assignment deleted:', response)),
      catchError(this.handleError.bind(this))
    )
  }

  /**
   * Get all insight frames for a specific block
   * @param blockId Block ID
   * @returns Observable with all frames grouped by insights
   */
  getAllBlockInsightFrames(blockId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/block/${blockId}/block-storyboard`).pipe(
      tap((response) => console.log('Block insight frames loaded:', response)),
      catchError(error => {
        console.error('Error loading block insight frames:', error)
        return throwError(() => new Error('Failed to load block insight frames'))
      })
    )
  }

  /**
   * Update a specific insight frame
   * @param frameId Frame ID to update
   * @param updateData Data to update
   * @returns Observable with updated frame
   */
  updateInsightFrame(frameId: number, updateData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/insight-frames/${frameId}`, updateData).pipe(
      tap((response) => console.log('Insight frame updated:', response)),
      catchError(error => {
        console.error('Error updating insight frame:', error)
        return throwError(() => new Error('Failed to update insight frame'))
      })
    )
  }

  /**
   * Delete a specific insight frame
   * @param frameId Frame ID to delete
   * @returns Observable with deletion result
   */
  deleteInsightFrame(frameId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/insight-frames/${frameId}`).pipe(
      tap((response) => console.log('Insight frame deleted:', response)),
      catchError(error => {
        console.error('Error deleting insight frame:', error)
        return throwError(() => new Error('Failed to delete insight frame'))
      })
    )
  }

  /**
   * Create a new insight frame
   * @param frameData Frame creation data
   * @returns Observable with created frame
   */
  createInsightFrame(frameData: {
    reference_frame_id: number,
    direction: 'before' | 'after',
    title?: string,
    description?: string,
    voiceOver?: string,
    duration?: string,
    sceneId?: number,
    imageUrl?: string,
    notes?: string,
    extraReq?: string
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insight-frames`, frameData).pipe(
      tap((response) => console.log('Insight frame created:', response)),
      catchError(error => {
        console.error('Error creating insight frame:', error)
        return throwError(() => new Error('Failed to create insight frame'))
      })
    )
  }
  //Created by Feras *********************END**************************
}