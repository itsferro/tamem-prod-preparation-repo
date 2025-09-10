import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuranBoardComponent } from './quran-board.component';

describe('QuranBoardComponent', () => {
  let component: QuranBoardComponent;
  let fixture: ComponentFixture<QuranBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuranBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuranBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
