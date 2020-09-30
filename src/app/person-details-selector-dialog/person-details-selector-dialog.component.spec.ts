import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailsSelectorDialogComponent } from './person-details-selector-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MockComponent } from 'ng-mocks';
import { PersonDetailsSelectorComponent } from '../person-details-selector/person-details-selector.component';
import { MatIconModule } from '@angular/material/icon';

describe('PersonDetailsSelectorDialogComponent', () => {
  let component: PersonDetailsSelectorDialogComponent;
  let fixture: ComponentFixture<PersonDetailsSelectorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonDetailsSelectorDialogComponent,
        MockComponent(PersonDetailsSelectorComponent),
      ],
      imports: [MatDialogModule, MatIconModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: () => void 0 } },
      ],
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
