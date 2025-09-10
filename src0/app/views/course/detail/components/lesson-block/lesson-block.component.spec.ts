import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonBlockComponent } from './lesson-block.component';

describe('LessonBlockComponent', () => {
  let component: LessonBlockComponent;
  let fixture: ComponentFixture<LessonBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
