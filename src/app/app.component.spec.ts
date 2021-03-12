import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng-mocks';
import { CountdownComponent } from './countdown/countdown.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { Amplify } from 'aws-amplify';
import { env } from '../environments/environment.getter';

const homeComponent = MockComponent(HomeComponent);
const gameComponent = MockComponent(GameComponent);

describe('AppComponent', () => {
  beforeEach(async(() => {
    Amplify.configure(env().cognitoSettings);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: homeComponent },
          { path: 'game', component: gameComponent },
        ]),
      ],
      declarations: [
        AppComponent,
        homeComponent,
        gameComponent,
        MockComponent(CountdownComponent),
        MockComponent(NavbarComponent),
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
