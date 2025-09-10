import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SurahComponent } from './surah/surah.component';
import { ViewerComponent } from './viewer/viewer.component';
import { QuranService } from '@/app/core/service/quran-service.service';
import { Surah, QuranPage } from './quran-data';

@Component({
  selector: 'app-quran-board',
  standalone: true,
  imports: [CommonModule, FormsModule, SurahComponent, ViewerComponent],
  templateUrl: './quran-board.component.html',
  styleUrl: './quran-board.component.scss'
})
export class QuranBoardComponent implements OnInit {
  surahs: Surah[] = [];
  filteredSurahs: Surah[] = [];
  searchText: string = '';
  
  // State management
  view: 'board' | 'pages' | 'viewer' = 'board';
  selectedSurah: Surah | null = null;
  // surahPages: QuranPage[] = [];
  selectedPage: QuranPage | null = null;
  
  // Sorting
  sortBy: 'page' | 'score' = 'page'; // Default sort by page

  surahPages:any ; 
  currentPageNO:any ;
  isLoading:boolean = false; 

  private quranService = inject(QuranService);

  ngOnInit(): void {
   
    this.quranService.getAllSurahs().subscribe(surahs => {
      this.surahs = surahs;
      //  this.filteredSurahs = [...surahs];
    });

  

  }



  /**
 * Load all pages of a specific surah
 * @param surahId The ID of the surah to load pages for
 */
loadSurahPages(surahId: number): void {
  this.isLoading = true;

  this.quranService.getSurahPages(surahId).subscribe({
    next: (pages) => {
      // Store the pages in your component property
      this.surahPages = pages;
      console.log(pages);
 
      this.isLoading = false;

    },
    error: (err) => {
      console.error('Error loading surah pages:', err);
      // Handle error (e.g., show error message to user)
      this.isLoading = false;

    }
  });
}



  filterSurahs(): void {
    if (!this.searchText.trim()) {
      this.filteredSurahs = [...this.surahs];
      return;
    }

    this.filteredSurahs = this.surahs.filter(surah => 
      surah.name_ar.includes(this.searchText) || 
      surah.name_en.toLowerCase().includes(this.searchText.toLowerCase()) ||
      surah.id.toString() === this.searchText
    );
  }

 
  onSurahSelected(surahId: any): void {
    // Find the surah object from the ID
    const id = typeof surahId === 'number' ? surahId : Number(surahId);
    const surah = this.surahs.find(s => s.sura_no === id);
    
    // Set the selectedSurah (important for refresh)
    if (surah) {
      this.selectedSurah = surah;
    }
    
    // Load the pages and change view
    this.loadSurahPages(id); 
    this.view = 'pages';
  }

  onPageSelected(page: QuranPage): void {
    this.selectedPage = page;
    this.view = 'viewer';
    this.currentPageNO = page.page ; 

  }

  closePanel(): void {
    this.selectedSurah = null;
    this.surahPages = [];
    this.view = 'board';
  }

  closeViewer(): void {
    this.selectedPage = null;
    this.view = 'board';
  }

  backToPages(): void {
    this.selectedPage = null;
    this.view = 'pages';
  }

  // THIS IS THE MISSING METHOD
  onWordNoteAdded(event: any): void {
    // console.log('Word note added:', event);
    // this.quranService.updatePageMemorizationStats(
    //   event.pageNumber,
    //   {
    //     attempts: (this.selectedPage?.memorizationStats?.attempts || 0) + 1,
    //     errors: (this.selectedPage?.memorizationStats?.errors || 0) + (event.issueType ? 1 : 0),
    //     score: this.calculateNewScore(
    //       this.selectedPage?.memorizationStats?.score || 100, 
    //       event.issueType ? 1 : 0
    //     )
    //   }
    // ).subscribe(() => {
    //   console.log('Page stats updated');
    // });
  }







// In your quran-board.component.ts or equivalent page listing component
getScoreColorClass(score: number): string {
  if (score >= 90) return 'score-excellent';
  if (score >= 70) return 'score-good';
  if (score >= 50) return 'score-medium';
  if (score >= 30) return 'score-low';
  if (score > 0) return 'score-poor';
  return 'score-none';
}

getMasteryClass(level: number): string {
  switch(level) {
    case 4: return 'mastery-expert';
    case 3: return 'mastery-advanced';
    case 2: return 'mastery-intermediate';
    case 1: return 'mastery-beginner';
    default: return 'mastery-none';
  }
}

getMasteryLabel(level: number): string {
  switch(level) {
    case 4: return 'متقن';
    case 3: return 'جيد';
    case 2: return 'قيد الحفظ';
    case 1: return 'مبتدئ';
    default: return 'جديد';
  }
}


refreshPageData(): void {
  // If we have the current page's surah ID, use that directly
  if (this.currentPageNO && this.surahPages && this.surahPages.length > 0) {
    const surahId = this.surahPages[0].sura_no;
    this.loadSurahPages(surahId);
    return;
  }
  
  // Fallback to using selectedSurah if available
  if (this.selectedSurah) {
    this.loadSurahPages(this.selectedSurah.sura_no);
  }
}


}