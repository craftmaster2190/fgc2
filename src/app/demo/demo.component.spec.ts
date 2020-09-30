import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComponent } from './demo.component';
import { MockComponent } from 'ng-mocks';
import { TempleMapComponent } from '../temple-map/temple-map.component';
import { PersonSelectorComponent } from '../person-selector/person-selector.component';
import { ChoirSwipeSelectComponent } from '../choir-swipe-select/choir-swipe-select.component';
import { HymnSelectComponent } from '../hymn-select/hymn-select.component';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DemoComponent,
        MockComponent(PersonSelectorComponent),
        MockComponent(TempleMapComponent),
        MockComponent(HymnSelectComponent),
        MockComponent(ChoirSwipeSelectComponent),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
