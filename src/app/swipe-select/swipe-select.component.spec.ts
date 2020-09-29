import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeSelectComponent } from './swipe-select.component';
import { SwiperModule } from 'ngx-swiper-wrapper';

describe('SwipeSelectComponent', () => {
  let component: SwipeSelectComponent;
  let fixture: ComponentFixture<SwipeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwipeSelectComponent],
      imports: [SwiperModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
