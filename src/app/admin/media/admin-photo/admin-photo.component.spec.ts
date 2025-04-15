import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPhotoComponent } from './admin-photo.component';

describe('AdminPhotoComponent', () => {
  let component: AdminPhotoComponent;
  let fixture: ComponentFixture<AdminPhotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPhotoComponent]
    });
    fixture = TestBed.createComponent(AdminPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
