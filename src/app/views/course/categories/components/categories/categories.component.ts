import { Component, inject } from '@angular/core'
import { CategoryList } from '../../data'
import { Router } from '@angular/router';

@Component({
  selector: 'course-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styles: ``,
})
export class CourseCategoriesComponent {
  categories = CategoryList
  private router = inject(Router);


  goToCategory(category: string) {
  
   // const formattedCategory = category.toLowerCase().replace(/ /g, '-'); // Convert "Web Development" → "web-development"
    const formattedCategory = "detail" ; 
    this.router.navigate(['/course', formattedCategory]); // Navigate to "/courses/web-development"
  }



}
