import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoirSwipeSelectComponent } from './choir-swipe-select.component';

describe('ChoirSwipeSelectComponent', () => {
  let component: ChoirSwipeSelectComponent;
  let fixture: ComponentFixture<ChoirSwipeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChoirSwipeSelectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoirSwipeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
