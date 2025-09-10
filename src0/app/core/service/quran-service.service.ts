import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, map, Observable, of, tap, throwError } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'
import type { User } from '../helpers/user'
import { ChangeResponse, TocChanges } from '@/app/views/course/detail/components/right-sidebar/toc.interface'
import { delay } from 'rxjs/operators'; // Add this import
import { Surah, QuranPage,   QURAN_PAGES } from '../../views/course/quran-board/quran-data' 

// mock data functions 
import { getBlockJourneySteps_mock } from '@/app/views/course/learning-journey/mock-journey-data'
import { getMcqChallengeData_mock } from '../../views/course/learning-journey/mock-journey-data';



@Injectable({
  providedIn: 'root',
})
export class QuranService {
  user: User | null = null

  public readonly authSessionKey = 'EDUPORT_AUTH_SESSION_KEY_'

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  private apiUrl = 'https://api.tamem.com.ly/api'; // 🔹 Change this to your API URL
 


  // Add this to your quran-service.service.ts
  updateScores(pageData: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/update-scores`, pageData).pipe(
    tap(response => console.log('Synced page progress successfully')),
    catchError(error => {
      console.error('Error syncing page progress:', error);
      return throwError(() => new Error('Failed to sync page progress'));
    })
  );
}


  getAllSurahs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/surahs`).pipe(
      tap(surahs => console.log(`Retrieved ${surahs.length} surahs`)),
      catchError(error => {
        console.error('Error fetching surahs:', error);
        return throwError(() => new Error('Failed to load surahs. Please try again later.'));
      })
    );
  }


getSurahPages(suraNo: number): Observable<number[]> {
  return this.http.get<number[]>(`${this.apiUrl}/surahs/${suraNo}/pages`).pipe(
    tap(pages => console.log(`Retrieved ${pages.length} pages for surah ${suraNo}`)),
    catchError(error => {
      console.error('Error fetching surah pages:', error);
      return throwError(() => new Error('Failed to load surah pages. Please try again later.'));
    })
  );
}

getPageAyatText(pageNumber: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/pages/${pageNumber}/ayat`).pipe(
    tap(ayat => console.log(`Retrieved ${ayat.length} ayat from page ${pageNumber}`)),
    catchError(error => {
      console.error('Error fetching page ayat:', error);
      return throwError(() => new Error('Failed to load ayat text. Please try again later.'));
    })
  );
}




  // Add this method to your QuranService to fetch page content

/**
 * Get the content for a specific page
 */
getPageContent(pageNumber: number): Observable<string> {
  // In a real application, this would fetch the actual page content
  // For now, we'll return sample text for demonstration
  
  // Sample Quran text (just for demo purposes)
  const sampleText = `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ الرَّحْمَٰنِ الرَّحِيمِ مَالِكِ يَوْمِ الدِّينِ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ`;
  
  return of(sampleText);
}


  
     
   
  
    /**
     * Get all pages for a specific Surah
     */
    getPagesForSurah(surahId: number): Observable<QuranPage[]> {
      const pages = QURAN_PAGES.filter(p => p.surahId === surahId);
      return of(pages);
    }
  
    
   
    

  
 
 



}
