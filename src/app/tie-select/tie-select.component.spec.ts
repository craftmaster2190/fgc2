import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieSelectComponent } from './tie-select.component';

describe('TieSelectComponent', () => {
  let component: TieSelectComponent;
  let fixture: ComponentFixture<TieSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TieSelectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
