import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffilationComponent } from './affilation.component';

describe('AffilationComponent', () => {
  let component: AffilationComponent;
  let fixture: ComponentFixture<AffilationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffilationComponent]
    });
    fixture = TestBed.createComponent(AffilationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
