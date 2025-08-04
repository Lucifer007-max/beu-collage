import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTpoComponent } from './about-tpo.component';

describe('AboutTpoComponent', () => {
  let component: AboutTpoComponent;
  let fixture: ComponentFixture<AboutTpoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutTpoComponent]
    });
    fixture = TestBed.createComponent(AboutTpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
