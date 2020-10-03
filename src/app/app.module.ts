import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatDialogModule } from '@angular/material/dialog';
import { PersonDetailsSelectorDialogComponent } from './person-details-selector-dialog/person-details-selector-dialog.component';
import { TempleMapComponent } from './temple-map/temple-map.component';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TieDisplayComponent } from './tie-display/tie-display.component';
import { AlphabetFilterModule } from 'alphabet-filter';
import { HymnSelectComponent } from './hymn-select/hymn-select.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CountdownComponent } from './countdown/countdown.component';
import { GameComponent } from './game/game.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PersonSelectorContainerComponent } from './person-selector-container/person-selector-container.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { AuthGuard } from './websocket/auth-guard';
import { HttpInterceptorProviders } from './websocket/interceptor-providers';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AdminGuard } from './websocket/admin-guard';

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
    SwipeSelectComponent,
    ChoirSwipeSelectComponent,
    SessionIconComponent,
    PersonSelectorComponent,
    SessionSelectorComponent,
    PersonDetailsSelectorComponent,
    TieSelectComponent,
    PersonDetailsSelectorDialogComponent,
    TempleMapComponent,
    HomeComponent,
    TieDisplayComponent,
    HymnSelectComponent,
    CountdownComponent,
    GameComponent,
    PersonSelectorContainerComponent,
    NavbarComponent,
    AdminViewComponent,
  ],
  imports: [
    AmplifyAngularModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SwiperModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    AlphabetFilterModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [
    AmplifyService,
    AuthGuard,
    AdminGuard,
    ...HttpInterceptorProviders,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
