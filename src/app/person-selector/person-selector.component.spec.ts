import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSelectorComponent } from './person-selector.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MockComponent } from 'ng-mocks';
import { SessionIconComponent } from '../session-icon/session-icon.component';
import { TieDisplayComponent } from '../tie-display/tie-display.component';

describe('PersonSelectorComponent', () => {
  let component: PersonSelectorComponent;
  let fixture: ComponentFixture<PersonSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonSelectorComponent,
        MockComponent(SessionIconComponent),
        MockComponent(TieDisplayComponent),
      ],
      imports: [MatDialogModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
