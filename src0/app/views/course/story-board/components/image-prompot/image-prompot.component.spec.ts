import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePrompotComponent } from './image-prompot.component';

describe('ImagePrompotComponent', () => {
  let component: ImagePrompotComponent;
  let fixture: ComponentFixture<ImagePrompotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagePrompotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagePrompotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
