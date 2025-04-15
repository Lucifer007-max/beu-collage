import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSyllabusComponent } from './add-syllabus.component';

describe('AddSyllabusComponent', () => {
  let component: AddSyllabusComponent;
  let fixture: ComponentFixture<AddSyllabusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSyllabusComponent]
    });
    fixture = TestBed.createComponent(AddSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
