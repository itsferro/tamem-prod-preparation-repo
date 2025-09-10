import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface WordNote {
  wordIndex: number;
  word: string;
  note: string;
  issue: 'forget' | 'similarity' | 'doubt' | null;
}

@Component({
  selector: 'journey-challenge-quran',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './challenge-quran.component.html',
  styleUrl: './challenge-quran.component.scss'
})
export class ChallengeQuranComponent implements AfterViewChecked {
  
  @Input() currentStep!: any; 
  @Input() challengeData: any;
  
  @Output() subChallengeResponse = new EventEmitter<any>();
  
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
  wordIssue: 'forget' | 'similarity' | 'doubt' | null = null;
  
  // Store notes for words
  wordNotesMap: Map<number, WordNote> = new Map();

  ngOnInit() {
    // Parse the HTML content to extract words
    if (this.challengeData && this.challengeData.block_content) {
      // Remove HTML tags and split by spaces
      const text = this.challengeData.block_content.replace(/<[^>]*>/g, '');
      this.words = text.split(' ').filter((word: string) => word.trim().length > 0);
    }
  }

  ngAfterViewChecked() {
    this.checkLinePosition();
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
    if (this.currentWordIndex < this.words.length) {
      // Get current and next word
      const currentWord = this.words[this.currentWordIndex];
      const nextWord = this.currentWordIndex + 1 < this.words.length ? 
                      this.words[this.currentWordIndex + 1] : '';
      
      // Check if the next word contains brackets
      const hasBrackets = nextWord.includes('(') && nextWord.includes(')');
      
      // Add current word to visible words
      this.visibleWords.push(currentWord);
      
      // Increment the counter
      this.currentWordIndex++;
      
      // If next word has brackets, automatically move to the next word
      if (hasBrackets && this.currentWordIndex < this.words.length) {
        this.nextWord(); // Immediately move to next word
      }
    }
    
    this.subChallengeResponse.emit({
      action: 'nextWord',
      currentWordIndex: this.currentWordIndex
    });
  }
  
  selectWord(index: number) {
    this.selectedWordIndex = index;
    this.showPanel = true;
    this.loadWordContext(index);
    
    // Load existing note if available
    const globalIndex = this.getGlobalWordIndex(index);
    const existingNote = this.wordNotesMap.get(globalIndex);
    
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
    // Calculate the global index in the words array by finding which word from the full array
    // corresponds to the visibleWords[visibleIndex]
    const visibleWord = this.visibleWords[visibleIndex];
    // Find first occurrence of the visible word after the previous words
    // This is a simplification - it might not be perfect for repeated words
    return this.words.indexOf(visibleWord);
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
      this.wordNotesMap.set(globalIndex, noteInfo);
      
      // Emit event to notify parent
      this.subChallengeResponse.emit({
        action: 'wordNote',
        noteInfo: noteInfo
      });
      
      // Close the panel
      this.closePanel();
    }
  }
  
  closePanel() {
    this.showPanel = false;
    this.selectedWordIndex = null;
  }
}