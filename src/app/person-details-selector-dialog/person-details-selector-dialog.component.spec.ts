import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailsSelectorDialogComponent } from './person-details-selector-dialog.component';

describe('PersonDetailsSelectorDialogComponent', () => {
  let component: PersonDetailsSelectorDialogComponent;
  let fixture: ComponentFixture<PersonDetailsSelectorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonDetailsSelectorDialogComponent],
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
