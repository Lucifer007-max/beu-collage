import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoNavBarComponent } from './tpo-nav-bar.component';

describe('TpoNavBarComponent', () => {
  let component: TpoNavBarComponent;
  let fixture: ComponentFixture<TpoNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TpoNavBarComponent]
    });
    fixture = TestBed.createComponent(TpoNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
