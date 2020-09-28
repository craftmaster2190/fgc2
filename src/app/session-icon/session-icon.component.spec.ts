import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionIconComponent } from './session-icon.component';

describe('SessionIconComponent', () => {
  let component: SessionIconComponent;
  let fixture: ComponentFixture<SessionIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SessionIconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
