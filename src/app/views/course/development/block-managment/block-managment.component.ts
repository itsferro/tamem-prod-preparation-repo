import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlockManagmentDashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'development-block-managment',
  standalone: true,
  imports: [CommonModule, FormsModule,BlockManagmentDashboardComponent],
  templateUrl: './block-managment.component.html',
  styleUrl: './block-managment.component.scss'
})
export class BlockManagmentComponent implements OnInit {


  // Input from parent component
  @Input() selectedCourseId: number | null = null;

   
  ngOnInit(): void {
     
  }

   
}