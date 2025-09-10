import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Surah } from '../quran-data';

@Component({
  selector: 'quran-board-surah',
  standalone: true,
  imports: [],
  templateUrl: './surah.component.html',
  styleUrl: './surah.component.scss'
})
export class SurahComponent implements OnInit {
  @Input() surah!: any;
  @Output() selected = new EventEmitter<number>();

  ngOnInit(): void {
    
    

  

  }


  onSelect() {
    this.selected.emit(this.surah.sura_no);
  }

  getProgressColor(): string {
    const percentage = this.surah.memorizationStats?.masteryPercentage || 0;
    
    if (percentage >= 80) {
      return '#4caf50'; // Green
    } else if (percentage >= 50) {
      return '#8bc34a'; // Light green
    } else if (percentage >= 30) {
      return '#ffc107'; // Amber
    } else if (percentage > 0) {
      return '#ff9800'; // Orange
    } else {
      return '#e0e0e0'; // Gray
    }
  }

  getScoreColor(): string {
    const score = this.surah.memorizationStats?.totalScore || 0;
    
    if (score >= 90) {
      return '#4caf50'; // Green
    } else if (score >= 80) {
      return '#8bc34a'; // Light green
    } else if (score >= 70) {
      return '#ffc107'; // Amber
    } else if (score > 0) {
      return '#ff9800'; // Orange
    } else {
      return '#e0e0e0'; // Gray
    }
  }
}