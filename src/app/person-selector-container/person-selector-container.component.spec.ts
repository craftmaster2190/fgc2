import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSelectorContainerComponent } from './person-selector-container.component';

describe('PersonSelectorContainerComponent', () => {
  let component: PersonSelectorContainerComponent;
  let fixture: ComponentFixture<PersonSelectorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonSelectorContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSelectorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
