import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailsSelectorComponent } from './person-details-selector.component';
import { MockComponent } from 'ng-mocks';
import { SessionSelectorComponent } from '../session-selector/session-selector.component';
import { TieSelectComponent } from '../tie-select/tie-select.component';

describe('PersonDetailsSelectorComponent', () => {
  let component: PersonDetailsSelectorComponent;
  let fixture: ComponentFixture<PersonDetailsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonDetailsSelectorComponent,
        MockComponent(TieSelectComponent),
        MockComponent(SessionSelectorComponent),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
