import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonBlockFormComponent } from './lesson-block-form.component';

describe('LessonBlockFormComponent', () => {
  let component: LessonBlockFormComponent;
  let fixture: ComponentFixture<LessonBlockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonBlockFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonBlockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
