import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSelectorContainerComponent } from './person-selector-container.component';
import { MockComponent } from 'ng-mocks';
import { PersonSelectorComponent } from '../person-selector/person-selector.component';

describe('PersonSelectorContainerComponent', () => {
  let component: PersonSelectorContainerComponent;
  let fixture: ComponentFixture<PersonSelectorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonSelectorContainerComponent,
        MockComponent(PersonSelectorComponent),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSelectorContainerComponent);
    component = fixture.componentInstance;
    component.person = {} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
