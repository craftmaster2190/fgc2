import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoComponent } from './demo/demo.component';
import {
  SWIPER_CONFIG,
  SwiperConfigInterface,
  SwiperModule,
} from 'ngx-swiper-wrapper';
import { SwipeSelectComponent } from './swipe-select/swipe-select.component';
import { ChoirSwipeSelectComponent } from './choir-swipe-select/choir-swipe-select.component';
import { SessionIconComponent } from './session-icon/session-icon.component';
import { PersonSelectorComponent } from './person-selector/person-selector.component';
import { SessionSelectorComponent } from './session-selector/session-selector.component';
import { PersonDetailsSelectorComponent } from './person-details-selector/person-details-selector.component';
import { TieSelectComponent } from './tie-select/tie-select.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 10,
    depth: 100,
    modifier: 0.7,
    slideShadows: false,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    SwipeSelectComponent,
    ChoirSwipeSelectComponent,
    SessionIconComponent,
    PersonSelectorComponent,
    SessionSelectorComponent,
    PersonDetailsSelectorComponent,
    TieSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SwiperModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
