import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailsSelectorDialogComponent } from './person-details-selector-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockComponent } from 'ng-mocks';
import { PersonDetailsSelectorComponent } from '../person-details-selector/person-details-selector.component';

describe('PersonDetailsSelectorDialogComponent', () => {
  let component: PersonDetailsSelectorDialogComponent;
  let fixture: ComponentFixture<PersonDetailsSelectorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonDetailsSelectorDialogComponent,
        MockComponent(PersonDetailsSelectorComponent),
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailsSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
