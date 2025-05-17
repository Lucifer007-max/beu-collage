import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantlinkComponent } from './importantlink.component';

describe('ImportantlinkComponent', () => {
  let component: ImportantlinkComponent;
  let fixture: ComponentFixture<ImportantlinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportantlinkComponent]
    });
    fixture = TestBed.createComponent(ImportantlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
