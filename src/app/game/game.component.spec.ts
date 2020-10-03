import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MockComponent } from 'ng-mocks';
import { PersonSelectorContainerComponent } from '../person-selector-container/person-selector-container.component';
import { ChoirSwipeSelectComponent } from '../choir-swipe-select/choir-swipe-select.component';
import { HymnSelectComponent } from '../hymn-select/hymn-select.component';
import { TempleMapComponent } from '../temple-map/temple-map.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerBusService } from '../websocket/server-bus.service';
import { of } from 'rxjs';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        MockComponent(PersonSelectorContainerComponent),
        MockComponent(ChoirSwipeSelectComponent),
        MockComponent(HymnSelectComponent),
        MockComponent(TempleMapComponent),
        MockComponent(ScoreboardComponent),
      ],
      providers: [
        {
          provide: ServerBusService,
          useValue: {
            connect: () => of(),
            send: () => void 0,
            disconnect: () => void 0,
          },
        },
      ],
      imports: [MatExpansionModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
