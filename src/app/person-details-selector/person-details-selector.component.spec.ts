import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailsSelectorComponent } from './person-details-selector.component';

describe('PersonDetailsSelectorComponent', () => {
  let component: PersonDetailsSelectorComponent;
  let fixture: ComponentFixture<PersonDetailsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonDetailsSelectorComponent],
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
