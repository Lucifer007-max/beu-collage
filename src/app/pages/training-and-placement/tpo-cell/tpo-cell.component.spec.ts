import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoCellComponent } from './tpo-cell.component';

describe('TpoCellComponent', () => {
  let component: TpoCellComponent;
  let fixture: ComponentFixture<TpoCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TpoCellComponent]
    });
    fixture = TestBed.createComponent(TpoCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
