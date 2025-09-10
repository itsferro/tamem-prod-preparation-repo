import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessOrderingComponent } from './process-ordering.component';

describe('ProcessOrderingComponent', () => {
  let component: ProcessOrderingComponent;
  let fixture: ComponentFixture<ProcessOrderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessOrderingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
