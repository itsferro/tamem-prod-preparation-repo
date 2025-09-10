import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewChecked, OnInit, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuranService } from '@/app/core/service/quran-service.service';
import { QuranPage } from '../quran-data';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';



interface WordNote {
  wordIndex: number;
  word: string;
  note: string;
  issue: 'forget' | 'similarity' | 'doubt' | 'connection' | null;
}

interface WordFlag {
  wordPosition: string;  // Format: "page_123_pos_45"
  flagType: 'forget' | 'similarity' | 'doubt' | 'connection' | 'none';
  timestamp: string;     // ISO date string
  attemptNumber: number; // Which attempt this was flagged in
}

interface FlagChange {
  wordPosition: string;
  previousFlag: string | null;
  newFlag: string | null;
  timestamp: string;
  attemptNumber: number;
}



@Component({
  selector: 'quran-board-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss'
})
export class ViewerComponent implements AfterViewChecked {

   
 
  @Input() currentPageNO:  number = 1 ; 
  @Input() surahName: string = '';
  @Output() backToPages = new EventEmitter<any>();
  @Output() refreshRequired = new EventEmitter<boolean>();

  @ViewChild('quranTextContainer') quranTextContainer!: ElementRef;

  words: string[] = [];
  visibleWords: string[] = [];
  currentWordIndex: number = 0;
  maxHeight: number = 400; // Updated to match the new CSS height

  // Add a property to track current line
  private lineThreshold: number = 500; // Slightly less than maxHeight to preemptively clear
  private lastLineYPosition: number = 0;
  private lineHeight: number = 0;

  // Word selection and panel
  selectedWordIndex: number | null = null;
  showPanel: boolean = false;
  contextWords: string[] = [];
  contextSelectedIndex: number = 0;
  wordNotes: string = '';
  wordIssue: 'forget' | 'similarity' | 'doubt' | 'connection' | null = null;

  activeFilter: 'forget' | 'similarity' | 'doubt' | 'none' | 'connection' | null = null;
filteredMode: boolean = false;

nextWordFlag: 'forget' | 'similarity' | 'doubt' | 'connection' | 'none' | null = null;

viewMode: 'word' | 'full' = 'word'; // Default to word-by-word mode

private hintTimeout: any = null;

currentAttemptNumber: number = 1;
wordFlags: Map<string, WordFlag> = new Map();
flagHistory: FlagChange[] = [];

 

  showPageNavigation: boolean = false;
  showCompletionMessage: boolean = false;

  pageAyat:any ; 

  private tamemService = inject(TamemService);
  private quranService = inject(QuranService);
  private cookieService = inject(CookieService);

// Add these properties to your component
fontSize: number = 20; // Default font size in pixels
minFontSize: number = 16; // Minimum font size
maxFontSize: number = 36; // Maximum font size


toggleViewMode(): void {
  // Toggle the view mode
  this.viewMode = this.viewMode === 'word' ? 'full' : 'word';
  
  if (this.viewMode === 'full') {
    // Show all words at once
    this.showFullText();
  } else {
    // Reset to word-by-word mode
    this.resetToWordByWord();
  }
}


showFullText(): void {
  // Show all words
  this.visibleWords = [...this.words];
  this.currentWordIndex = this.words.length;
  
  // Scroll to top to show the beginning of the text
  setTimeout(() => {
    if (this.quranTextContainer) {
      this.quranTextContainer.nativeElement.scrollTop = 0;
    }
  }, 0);
  
  // If we're at the end, show the page navigation options
  if (this.currentWordIndex >= this.words.length) {
    this.showPageNavigation = true;
  }
}

 // Method to reset to word-by-word mode
resetToWordByWord(): void {
  // Reset to show no words
  this.visibleWords = [];
  this.currentWordIndex = 0;
  
  // Hide navigation panel since we're starting fresh
  this.showPageNavigation = false;
  
  // Reset any flag hints
  this.nextWordFlag = null;
}


// Add these methods to your component
increaseFontSize(): void {
  if (this.fontSize < this.maxFontSize) {
    this.fontSize += 2;
    this.updateFontSize();
  }
}

decreaseFontSize(): void {
  if (this.fontSize > this.minFontSize) {
    this.fontSize -= 2;
    this.updateFontSize();
  }
}

private updateFontSize(): void {
  // Get the quran text container
  const textContainer = this.quranTextContainer?.nativeElement;
  if (textContainer) {
    textContainer.style.fontSize = `${this.fontSize}px`;
    
    // Save the user's preference (optional)
    localStorage.setItem('quranFontSize', this.fontSize.toString());
  }
}


  ngOnInit() {
      // Load saved font size preference if available
  const savedFontSize = localStorage.getItem('quranFontSize');
  if (savedFontSize) {
    this.fontSize = parseInt(savedFontSize, 10);
  }
  
  // Apply the font size after view is initialized
  setTimeout(() => this.updateFontSize(), 0);


   // this.loadBlockData(128);
    this.loadPageAyat(this.currentPageNO);
  }

  ngAfterViewChecked() {
    this.checkLinePosition();
  }


  // Add this method to your viewer.component.ts
syncWithBackend(): void {
  // Create the data object to send
  const progressData = {
    page_number: this.currentPageNO,
    score: this.calculatePageScore(),
    flag_counts: this.countFlagsByType(),
    word_flags: Object.fromEntries(this.wordIssueMap),
    timestamp: new Date().toISOString()
  };
  
  // Call your service to send the data
  this.quranService.updateScores(progressData).subscribe({
    next: (response) => {
      console.log('Page progress synced with backend', response);
    //  this.clearLocalStorageForCurrentPage(); // *** New line ***
    },
    error: (err) => {
      console.error('Failed to sync with backend:', err);
    }
  });
}

// *** New method to add ***
clearLocalStorageForCurrentPage(): void {
  // List of all localStorage keys related to the current page
  const keysToRemove = [
    `quran_flags_page_${this.currentPageNO}`,
    `quran_flag_history_page_${this.currentPageNO}`,
    `quran_issues_page_${this.currentPageNO}`,
    `quran_scores_page_${this.currentPageNO}`
  ];
  
  // Remove each key from localStorage
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log(`Removed ${key} from localStorage`);
  });
  
  // Also remove from cookies if you were storing there
  keysToRemove.forEach(key => {
    if (this.cookieService.check(key)) {
      this.cookieService.delete(key);
      console.log(`Removed ${key} from cookies`);
    }
  });
  
  // Reset in-memory maps
  this.wordFlags = new Map();
  this.wordIssueMap = new Map();
  this.wordNotesMap = new Map();
  this.flagHistory = [];
  
  console.log(`Cleared all local storage for page ${this.currentPageNO}`);
}




// Update your markWordIssue method to handle undefined previous flag
markWordIssue(issueType: 'forget' | 'similarity' | 'doubt' | 'none' | 'connection'): void {
  if (this.selectedWordIndex !== null) {
    // Generate position-based key
    const positionKey = `page_${this.currentPageNO}_pos_${this.getGlobalWordIndex(this.selectedWordIndex)}`;
    
    // Get previous flag value if any (could be undefined)
    const previousFlag = this.wordIssueMap.get(positionKey) || null;
    
    // Store the flag type in the map
    this.wordIssueMap.set(positionKey, issueType);
    
    // Create a WordFlag object with metadata
    const flagData: WordFlag = {
      wordPosition: positionKey,
      flagType: issueType,
      timestamp: new Date().toISOString(),
      attemptNumber: this.currentAttemptNumber
    };
    
    // Save the complete flag data
    this.wordFlags.set(positionKey, flagData);
    
    // Record the change in history
    this.recordFlagChange(positionKey, previousFlag, issueType);
    
    // Save to localStorage
    this.saveWordFlags();
    
    // Close the panel
    this.closePanel();
  }
}


  recordFlagChange(wordPosition: string, previousFlag: string | null, newFlag: string): void {
    const flagChange: FlagChange = {
      wordPosition,
      previousFlag,
      newFlag,
      timestamp: new Date().toISOString(),
      attemptNumber: this.currentAttemptNumber
    };
    
    this.flagHistory.push(flagChange);
    this.saveFlagHistory();
  }
 
  saveWordFlags(): void {
    const flagsObj: Record<string, WordFlag> = {};
    
    this.wordFlags.forEach((value, key) => {
      flagsObj[key] = value;
    });
    
    localStorage.setItem(`quran_flags_page_${this.currentPageNO}`, JSON.stringify(flagsObj));
  }


  saveFlagHistory(): void {
    const historyKey = `quran_flag_history_page_${this.currentPageNO}`;
    
    // Get existing history
    let existingHistory: FlagChange[] = [];
    try {
      const storedHistory = localStorage.getItem(historyKey);
      if (storedHistory) {
        existingHistory = JSON.parse(storedHistory);
      }
    } catch (error) {
      console.error('Error loading flag history:', error);
    }
    
    // Add new changes and save
    const updatedHistory = [...existingHistory, ...this.flagHistory];
    localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
    
    // Clear local history after saving
    this.flagHistory = [];
  }

  loadPageAyat(pageNo: number): void {
    // Reset filter mode when loading a new page
    this.activeFilter = null;
    this.filteredMode = false;
  
    this.quranService.getPageAyatText(pageNo).subscribe({
      next: (ayat) => {
        // Clear any previous content again just to be sure
        this.visibleWords = [];
        this.currentWordIndex = 0;
        
        // Process the new data
        this.pageAyat = ayat;
        
        // Update surah name if available from the API response
        if (ayat && ayat.length > 0 && ayat[0].sura_name_ar) {
          this.surahName = ayat[0].sura_name_ar;
        }
        
        // Combine all ayat text
        const ayatText = this.combineAyatText(ayat);
     
        if (ayatText) {
          // Remove HTML tags and split by spaces
          const text = ayatText.replace(/<[^>]*>/g, '');
          this.words = text.split(' ').filter((word: string) => word.trim().length > 0);
          
          // Load any saved word issues for this page using your existing method
          this.loadWordIssues();
          
          // Load the new position-based flags if needed
          this.loadPositionBasedFlags();
        }
        
        // Turn off loading indicator
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading page ayat:', err);
        this.isLoading = false;
        // Handle error (e.g., show error message to user)
      }
    });
  }
 
 // Load position-based flags from localStorage
loadPositionBasedFlags(): void {
  const flagsKey = `quran_flags_page_${this.currentPageNO}`;
  const storedFlags = localStorage.getItem(flagsKey);
  
  if (storedFlags) {
    try {
      const flagsObj = JSON.parse(storedFlags);
      
      // Load the position-based flags into wordIssueMap
      Object.keys(flagsObj).forEach(key => {
        const flagData = flagsObj[key];
        this.wordIssueMap.set(key, flagData.flagType);
      });
      
      console.log(`Loaded ${Object.keys(flagsObj).length} position-based flags`);
    } catch (error) {
      console.error('Error parsing stored position flags:', error);
    }
  }
}



  combineAyatText(ayat: any[]): string {
    if (!ayat || !ayat.length) return '';
    return ayat.map(aya => aya.aya_text).join(' ');
  }

loadPageContent(pageNumber: number): void {
  this.quranService.getPageAyatText(pageNumber).subscribe({
    next: (ayat) => {
      // Store the ayat data in your component
      this.pageAyat = this.combineAyatText(ayat);
      
      // Process the ayat to extract just the text if needed
      this.words = this.processAyatToWords(ayat);
      
      // Reset word display state
      this.visibleWords = [];
      this.currentWordIndex = 0;
      
      console.log(`Loaded ${ayat.length} ayat from page ${pageNumber}`);
    },
    error: (err) => {
      console.error('Error loading page content:', err);
      // Handle error (e.g., show error message to user)
    }
  });
}


private processAyatToWords(ayat: any[]): string[] {
  // Join all ayat text with spaces
  const fullText = ayat.map(a => a.aya_text).join(' ');
  // Split the text into words
  return fullText.split(' ').filter(word => word.trim().length > 0);
}


  checkLinePosition() {
    if (this.quranTextContainer && this.quranTextContainer.nativeElement) {
      const element = this.quranTextContainer.nativeElement;

      // Find the last word element
      if (this.visibleWords.length > 0) {
        const wordElements = element.querySelectorAll('.word.visible');
        if (wordElements.length > 0) {
          const lastWordElement = wordElements[wordElements.length - 1];
          const rect = lastWordElement.getBoundingClientRect();
          const containerRect = element.getBoundingClientRect();

          // Calculate positions relative to container
          const relativeYPosition = rect.bottom - containerRect.top;

          // Calculate line height only once
          if (this.lineHeight === 0 && wordElements.length > 1) {
            const firstWordElement = wordElements[0];
            const firstRect = firstWordElement.getBoundingClientRect();
            // Estimate line height based on element height + margins
            this.lineHeight = rect.height + 20; // Adding a bit extra for margin
          }

          // Check if we've moved to a new line by comparing Y positions
          const isNewLine = Math.abs(relativeYPosition - this.lastLineYPosition) > (this.lineHeight / 2);

          // If we're near the threshold and on a new line, clear text
          if (relativeYPosition >= this.lineThreshold && isNewLine) {
            // Clear the visible words array and start fresh with the latest word
            this.visibleWords = [this.words[this.currentWordIndex - 1]];

            // Reset selected word index if it's no longer in the visible range
            if (this.selectedWordIndex !== null && this.selectedWordIndex >= this.visibleWords.length) {
              this.selectedWordIndex = null;
            }
          }

          // Update the last Y position
          if (isNewLine) {
            this.lastLineYPosition = relativeYPosition;
          }
        }
      }
    }
  }

  nextWord() {
    // If we're in full text mode or filtered mode, don't process next word
    if (this.viewMode === 'full' || this.filteredMode) {
      return;
    }
    
    if (this.currentWordIndex < this.words.length) {
      // Get current word
      const currentWord = this.words[this.currentWordIndex];
      
      // Add current word to visible words
      this.visibleWords.push(currentWord);
      
      // Increment the counter
      this.currentWordIndex++;
      
      // After showing current word, check the next one for flags
      this.checkNextWordFlag();
      
      // Handle automatic next word for bracketed words
      const nextWord = this.currentWordIndex < this.words.length ?
        this.words[this.currentWordIndex] : '';
      const hasBrackets = nextWord.includes('(') && nextWord.includes(')');
      
      if (hasBrackets && this.currentWordIndex < this.words.length) {
        this.nextWord(); // Immediately move to next word
      }
      
      // Scroll to the latest word
      setTimeout(() => {
        this.scrollToLatestWord();
      }, 0);
      
      // Check if we've reached the end of the words
      if (this.currentWordIndex >= this.words.length) {
        this.nextWordFlag = null; // Clear hint at end
        this.showCompletionMessage = true;
        
        setTimeout(() => {
          this.showCompletionMessage = false;
          this.showPageNavigation = true;
        }, 1500);
      }
    }
  }

  private scrollToLatestWord(): void {
    if (this.quranTextContainer && this.visibleWords.length > 0) {
      const container = this.quranTextContainer.nativeElement;
      const wordElements = container.querySelectorAll('.word.visible');
      
      if (wordElements.length > 0) {
        // Get the last word element
        const lastWord = wordElements[wordElements.length - 1];
        
        // Scroll the container to make the latest word visible
        // Add some extra space for readability
        const scrollPosition = lastWord.offsetTop - container.clientHeight + lastWord.clientHeight + 100;
        
        // Smooth scroll to the position
        container.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: 'smooth'
        });
      }
    }
  }

selectWord(index: number) {
  this.selectedWordIndex = index;
  this.showPanel = true;
  this.loadWordContext(index);

  // Load existing note if available using position key
  const positionKey = this.getWordPositionKey(index);
  const existingNote = this.wordNotesMap.get(positionKey);

  if (existingNote) {
    this.wordNotes = existingNote.note;
    this.wordIssue = existingNote.issue;
  } else {
    this.wordNotes = '';
    this.wordIssue = null;
  }
}
 

  loadWordContext(index: number) {
    // Get 5 words before and all visible words after the selected word
    const startIndex = Math.max(0, index - 5);
    const contextBefore = this.visibleWords.slice(startIndex, index);
    const contextAfter = this.visibleWords.slice(index + 1);

    // Combine with the selected word
    this.contextWords = [...contextBefore, this.visibleWords[index], ...contextAfter];
    this.contextSelectedIndex = contextBefore.length; // Index of the selected word in the context
  }

  getGlobalWordIndex(visibleIndex: number): number {
    if (visibleIndex < 0 || visibleIndex >= this.visibleWords.length) {
      return -1;
    }
    
    // Use the visible words array to determine the actual index in the full array
    // Start from the currentWordIndex and count back
    const visiblesCount = this.visibleWords.length;
    const startIndex = this.currentWordIndex - visiblesCount;
    
    return startIndex + visibleIndex;
  }

  getWordPositionKey(index: number): string {
    // For filtered view, we're showing all words, so index is the direct index in the words array
    let globalIndex = index;
    
    // If we're in normal view, adjust the index based on visible words
    if (!this.filteredMode && index < this.visibleWords.length) {
      // For normal reading, calculate global index from visible words
      const startIndex = Math.max(0, this.currentWordIndex - this.visibleWords.length);
      globalIndex = startIndex + index;
    }
    
    // Create a unique key using page number and position
    return `page_${this.currentPageNO}_pos_${globalIndex}`;
  }


  saveWordNote() {
    if (this.selectedWordIndex !== null) {
      const globalIndex = this.getGlobalWordIndex(this.selectedWordIndex);

      const noteInfo: WordNote = {
        wordIndex: globalIndex,
        word: this.visibleWords[this.selectedWordIndex],
        note: this.wordNotes,
        issue: this.wordIssue
      };

      // Save to the map
      // this.wordNotesMap.set(globalIndex, noteInfo);
      this.wordNotesMap.set(globalIndex.toString(), noteInfo);


      // Close the panel
      this.closePanel();
    }
  }

  closePanel() {
    this.showPanel = false;
    this.selectedWordIndex = null;
  }


  goBackToPages(): void {

    this.syncWithBackend();

    // Emit the backToPages event
    this.backToPages.emit();
    
    // Optionally, you can also reset the component state
    this.visibleWords = [];
    this.currentWordIndex = 0;
    this.selectedWordIndex = null;

    this.refreshRequired.emit(true);

  }


// Add this to your component class properties
wordNotesMap: Map<string, WordNote> = new Map();
wordIssueMap: Map<string, string> = new Map();


// Create a unique key for a word based on its context
getWordContextKey(index: number): string {
  const word = this.visibleWords[index];
  const prevWord = index > 0 ? this.visibleWords[index - 1] : '';
  const nextWord = index < this.visibleWords.length - 1 ? this.visibleWords[index + 1] : '';
  
  return `${prevWord}_${word}_${nextWord}`;
}

getWordIssueClass(index: number): string {
  // Get the position key for this word
  const positionKey = `page_${this.currentPageNO}_pos_${this.getGlobalWordIndex(index)}`;
  
  // Get issue using the position key
  const issueType = this.wordIssueMap.get(positionKey);
  
  if (!issueType) return '';
  
  switch (issueType) {
    case 'forget': return 'highlight-forget';
    case 'similarity': return 'highlight-similarity';
    case 'doubt': return 'highlight-doubt';
    case 'none': return 'highlight-none';
    case 'connection': return 'highlight-connection';
    default: return '';
  }
}
 


loadNextPage(): void {


  this.viewMode = 'word';



  this.savePageScore();
  this.syncWithBackend();

  

  this.activeFilter = null;
  this.filteredMode = false;
  // Clear all content first
  this.visibleWords = [];
  this.words = [];
  this.wordIssueMap = new Map();
  this.wordNotesMap = new Map();
  this.currentWordIndex = 0;
  this.selectedWordIndex = null;
  this.showPageNavigation = false;
  this.showCompletionMessage = false;
  
  // Show loading indicator (optional)
  this.isLoading = true;
  
  // Only after clearing, increment page and load new content
  setTimeout(() => {
    this.currentPageNO++;
    this.loadPageAyat(this.currentPageNO);
  }, 100);
}

loadPreviousPage(): void {

  if (this.currentPageNO > 1) {

    this.viewMode = 'word';

    this.savePageScore();
    this.syncWithBackend();

    // Clear all content first
    this.visibleWords = [];
    this.words = [];
    this.wordIssueMap = new Map();
    this.wordNotesMap = new Map();
    this.currentWordIndex = 0;
    this.selectedWordIndex = null;
    this.showPageNavigation = false;
    this.showCompletionMessage = false;
    
    // Show loading indicator (optional)
    this.isLoading = true;
    
    // Only after clearing, decrement page and load new content
    setTimeout(() => {
      this.currentPageNO--;
      this.loadPageAyat(this.currentPageNO);
    }, 100);
  }
}

retryCurrentPage(): void {

  this.viewMode = 'word';

  this.syncWithBackend();


  this.activeFilter = null;
  this.filteredMode = false;
  // Clear all content first
  this.visibleWords = [];
  this.words = [];
  this.wordIssueMap = new Map();
  this.wordNotesMap = new Map();
  this.currentWordIndex = 0;
  this.selectedWordIndex = null;
  this.showPageNavigation = false;
  this.showCompletionMessage = false;
  
  // Show loading indicator (optional)
  this.isLoading = true;
  
  // Only after clearing, reload the current page
  setTimeout(() => {
    this.loadPageAyat(this.currentPageNO);
  }, 100);
}

// Add loading state
isLoading: boolean = false;

// Update your load/retry methods to hide these elements
private resetPageState(): void {
  // Reset word display state
  this.visibleWords = [];
  this.currentWordIndex = 0;
  this.selectedWordIndex = null;
  this.showPageNavigation = false;
  this.showCompletionMessage = false;
  this.wordNotesMap = new Map();
  this.wordIssueMap = new Map();
}



 

// Add a new method to save the word issues to storage
private saveWordIssues(): void {
  // Create a serializable object from the Map
  const wordIssuesObj: Record<string, string> = {};
  this.wordIssueMap.forEach((value, key) => {
    wordIssuesObj[key] = value;
  });
  
  // Create a storage key based on current page
  const storageKey = `quran_issues_page_${this.currentPageNO}`;
  
  // Save to localStorage
  localStorage.setItem(storageKey, JSON.stringify(wordIssuesObj));
  
  // Optionally also save to cookies with expiration
  this.cookieService.set(
    storageKey,
    JSON.stringify(wordIssuesObj),
    30 // expires in 30 days
  );
}

 // Update the loadWordIssues method to work with position-based keys
private loadWordIssues(): void {
  // Reset the current map
  this.wordIssueMap = new Map();
  this.wordNotesMap = new Map();
  
  // Create a storage key based on current page
  const storageKey = `quran_issues_page_${this.currentPageNO}`;
  
  // Try to get from localStorage first
  let storedIssues = localStorage.getItem(storageKey);
  
  // If not in localStorage, try cookies
  if (!storedIssues) {
    storedIssues = this.cookieService.get(storageKey);
  }
  
  // If we found stored issues, parse and load them
  if (storedIssues) {
    try {
      const issuesObj = JSON.parse(storedIssues);
      
      // Convert back to Map
      Object.keys(issuesObj).forEach(key => {
        this.wordIssueMap.set(key, issuesObj[key]);
      });
      
      console.log(`Loaded ${this.wordIssueMap.size} saved word issues for page ${this.currentPageNO}`);
    } catch (error) {
      console.error('Error parsing stored word issues:', error);
    }
  }
}


 


resetWordIssue(): void {
  if (this.selectedWordIndex !== null) {
    // Get the position key for this word
    const positionKey = this.getWordPositionKey(this.selectedWordIndex);
    
    // Remove the issue from the map
    this.wordIssueMap.delete(positionKey);
    
    // Remove the note as well
    this.wordNotesMap.delete(positionKey);
    
    // Save changes to storage
    this.saveWordIssues();
    
    // Close the panel
    this.closePanel();
  }
}


 




// Update the getIssueCount method to handle the new issue type
getIssueCount(issueType: 'forget' | 'similarity' | 'doubt' | 'none' | 'connection'): number {
  let count = 0;
  
  // Count all instances of this issue type in the wordIssueMap
  this.wordIssueMap.forEach((value) => {
    if (value === issueType) {
      count++;
    }
  });
  
  return count;
}



toggleFlaggedWords(flagType: 'forget' | 'similarity' | 'doubt' | 'none' | 'connection'): void {
  // If we click the same filter type again, toggle it off
  if (this.activeFilter === flagType) {
    this.activeFilter = null;
    this.filteredMode = false;
    this.resetWordVisibility();
    return;
  }
  
  // Otherwise, set the new filter type
  this.activeFilter = flagType;
  this.filteredMode = true;
  
  // Show all words but make non-filtered ones transparent
  this.applyWordFilter(flagType);
}


resetWordVisibility(): void {
  // Reset all styles and classes
  if (this.quranTextContainer) {
    const elements = this.quranTextContainer.nativeElement.querySelectorAll('.word');
    
    elements.forEach((element: HTMLElement) => {
      // Remove inline styles
      element.style.color = '';
      element.style.backgroundColor = '';
      element.style.borderBottom = '';
      element.style.opacity = '';
      
      // Remove classes
      element.classList.remove('filtered-hidden', 'filtered-visible');
    });
  }
  
  // Reset to normal view with only visible words shown
  this.visibleWords = this.visibleWords.slice(0, this.currentWordIndex);
}

private filterTimeout: any = null;


applyWordFilter(flagType: 'forget' | 'similarity' | 'doubt' | 'none' | 'connection'): void {
  // First, show all words
  this.visibleWords = [...this.words];
  
  // Clear any existing timeouts to prevent race conditions
  if (this.filterTimeout) {
    clearTimeout(this.filterTimeout);
  }
  
  // Use a longer timeout for mobile devices
  this.filterTimeout = setTimeout(() => {
    try {
      // Get all word elements
      const elements = this.quranTextContainer.nativeElement.querySelectorAll('.word');
      
      if (!elements || elements.length === 0) {
        console.error('No word elements found');
        return;
      }
      
      console.log(`Applying filter: ${flagType} to ${elements.length} elements`);
      
      // First pass: hide all words
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        // Force styles to be applied immediately
        element.style.color = 'transparent';
        element.style.backgroundColor = 'transparent';
        element.style.borderBottom = 'none';
        // Also add classes for redundancy
        element.classList.add('filtered-hidden');
        element.classList.remove('filtered-visible');
      }
      
      // Second pass: only show flagged words
      let visibleCount = 0;
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        const positionKey = this.getWordPositionKey(i);
        const wordIssue = this.wordIssueMap.get(positionKey);
        
        if (wordIssue === flagType) {
          // Force styles to be applied immediately
          element.style.color = '#333333';
          // Let the highlight class handle background
          element.style.backgroundColor = '';
          element.style.borderBottom = '';
          
          element.classList.remove('filtered-hidden');
          element.classList.add('filtered-visible');
          visibleCount++;
        }
      }
      
      console.log(`Made ${visibleCount} words visible with ${flagType} flag`);
    } catch (error) {
      console.error('Error applying word filter:', error);
    }
  }, 300); // Use a longer timeout for mobile devices
}


getFlagLabel(flag: string | null): string {
  switch(flag) {
    case 'forget': return 'نسيان';
    case 'similarity': return 'تشابه';
    case 'doubt': return 'شك';
    case 'connection': return 'رابط';
    case 'none': return 'بدون مشكلة';
    default: return '';
  }
}



checkNextWordFlag(): void {
  if (this.currentWordIndex < this.words.length) {
    // Get the global position of the next word
    const nextWordPosition = `page_${this.currentPageNO}_pos_${this.currentWordIndex}`;
    
    // Check if this word has any flag
    const flag = this.wordIssueMap.get(nextWordPosition);
    
    // Update the hint flag with type checking
    if (flag === 'forget' || flag === 'similarity' || flag === 'doubt' || 
        flag === 'connection' || flag === 'none') {
      // Briefly show the flag and then clear it (after animation completes)
      this.nextWordFlag = flag;
      
      // Clear the flag after animation finishes
      setTimeout(() => {
        this.nextWordFlag = null;
      }, 2000); // Match animation duration
    } else {
      this.nextWordFlag = null;
    }
  } else {
    this.nextWordFlag = null;
  }
}



// Load word flags from localStorage when a page is opened
loadWordFlags(): void {
  // Clear existing flags first
  this.wordFlags = new Map();
  this.wordIssueMap = new Map();
  
  // Get flags from localStorage
  const flagsKey = `quran_flags_page_${this.currentPageNO}`;
  const storedFlags = localStorage.getItem(flagsKey);
  
  if (storedFlags) {
    try {
      const flagsObj = JSON.parse(storedFlags);
      
      // Populate the maps with the saved flags
      Object.keys(flagsObj).forEach(key => {
        const flagData = flagsObj[key];
        
        // Update the wordFlags map with complete data
        this.wordFlags.set(key, flagData);
        
        // Update the wordIssueMap with just the flag type (for highlighting)
        this.wordIssueMap.set(key, flagData.flagType);
      });
      
      console.log(`Loaded ${this.wordFlags.size} flags for page ${this.currentPageNO}`);
    } catch (error) {
      console.error('Error parsing stored flags:', error);
    }
  }
  
  // Also load flag history if needed
  this.loadFlagHistory();
}

// Load flag history from localStorage
loadFlagHistory(): void {
  const historyKey = `quran_flag_history_page_${this.currentPageNO}`;
  const storedHistory = localStorage.getItem(historyKey);
  
  if (storedHistory) {
    try {
      const history = JSON.parse(storedHistory);
      console.log(`Loaded ${history.length} flag changes for page ${this.currentPageNO}`);
      // You might want to use this history data for statistics later
    } catch (error) {
      console.error('Error parsing flag history:', error);
    }
  }
}


// Add this method to your viewer component
calculatePageScore(): number {
  // Get counts of each flag type
  const flagCounts = this.countFlagsByType();
  
  // Start with base score of 100
  let score = 100;
  
  // Apply deductions for each flag type - access using bracket notation
  score -= (flagCounts['forget'] || 0) * 10;     // Major issues (-3 each)
  score -= (flagCounts['similarity'] || 0) * 0; // Moderate issues (-2 each)
  score -= (flagCounts['doubt'] || 0) * 0;      // Minor issues (-1 each)
  // Connection flags don't affect score
  score += (flagCounts['none'] || 0) * 0;     // Well-memorized words (+0.5 each)
  
  // Cap between 0-100
  return Math.max(0, Math.min(100, score));
}

// Helper method to count flags by type
// Helper method to count flags by type
countFlagsByType(): Record<string, number> {
  const counts = {
    forget: 0,
    similarity: 0,
    doubt: 0,
    connection: 0,
    none: 0
  };
  
  // Define the valid flag types
  type FlagType = 'forget' | 'similarity' | 'doubt' | 'connection' | 'none';
  
  this.wordIssueMap.forEach((flagType) => {
    // Check if flagType is one of the valid keys
    if (flagType && (flagType as FlagType) in counts) {
      counts[flagType as FlagType]++;
    }
  });
  
  return counts;
}


// Add this method to save the score when leaving the page
savePageScore(): void {
  const score = this.calculatePageScore();
  const scoreData = {
    pageNumber: this.currentPageNO,
    score: score,
    timestamp: new Date().toISOString(),
    flagCounts: this.countFlagsByType()
  };
  
  // Store in localStorage
  const scoresKey = `quran_scores_page_${this.currentPageNO}`;
  const existingScoresJSON = localStorage.getItem(scoresKey);
  let existingScores = [];
  
  if (existingScoresJSON) {
    try {
      existingScores = JSON.parse(existingScoresJSON);
    } catch (error) {
      console.error('Error parsing stored scores:', error);
    }
  }
  
  // Add new score to history
  existingScores.push(scoreData);
  
  // Save updated scores
  localStorage.setItem(scoresKey, JSON.stringify(existingScores));
  
  console.log(`Saved score ${score} for page ${this.currentPageNO}`);
}



}