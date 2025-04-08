import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPublicationComponent } from './admin-publication.component';

describe('AdminPublicationComponent', () => {
  let component: AdminPublicationComponent;
  let fixture: ComponentFixture<AdminPublicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPublicationComponent]
    });
    fixture = TestBed.createComponent(AdminPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
