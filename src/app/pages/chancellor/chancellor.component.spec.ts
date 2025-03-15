import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChancellorComponent } from './chancellor.component';

describe('ChancellorComponent', () => {
  let component: ChancellorComponent;
  let fixture: ComponentFixture<ChancellorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChancellorComponent]
    });
    fixture = TestBed.createComponent(ChancellorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
