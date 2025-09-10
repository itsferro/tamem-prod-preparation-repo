import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermMatchingComponent } from './term-matching.component';

describe('TermMatchingComponent', () => {
  let component: TermMatchingComponent;
  let fixture: ComponentFixture<TermMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermMatchingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
