import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieDisplayComponent } from './tie-display.component';

describe('TieDisplayComponent', () => {
  let component: TieDisplayComponent;
  let fixture: ComponentFixture<TieDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TieDisplayComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
