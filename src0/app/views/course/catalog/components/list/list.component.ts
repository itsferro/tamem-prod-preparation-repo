import { Component, inject, OnInit } from '@angular/core';
import { TamemService } from '@/app/core/service/tamem-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'catalog-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  private tamemService = inject(TamemService);
  private router = inject(Router);

  goToCourse(courseId: string) {
    this.router.navigate(['/course', 'detail', courseId]);
  }

  courses: any = { data: [] };
  isLoading = true;
  errorMessage: string | null = null;

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.isLoading = true;
    this.errorMessage = null;

    this.tamemService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}
