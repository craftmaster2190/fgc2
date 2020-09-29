import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSelectorComponent } from './session-selector.component';
import { MockComponent } from 'ng-mocks';
import { SessionIconComponent } from '../session-icon/session-icon.component';
import { SwiperModule } from 'ngx-swiper-wrapper';

describe('SessionSelectorComponent', () => {
  let component: SessionSelectorComponent;
  let fixture: ComponentFixture<SessionSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SessionSelectorComponent,
        MockComponent(SessionIconComponent),
      ],
      imports: [SwiperModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
