import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RelatedBlogComponent } from './related-blog.component'

describe('RelatedBlogComponent', () => {
  let component: RelatedBlogComponent
  let fixture: ComponentFixture<RelatedBlogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedBlogComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RelatedBlogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
