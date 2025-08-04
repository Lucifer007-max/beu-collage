import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoLoginComponent } from './tpo-login.component';

describe('TpoLoginComponent', () => {
  let component: TpoLoginComponent;
  let fixture: ComponentFixture<TpoLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TpoLoginComponent]
    });
    fixture = TestBed.createComponent(TpoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
