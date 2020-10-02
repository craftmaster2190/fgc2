import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HymnSelectComponent } from './hymn-select.component';
import { AlphabetFilterModule } from 'alphabet-filter';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('HymnSelectComponent', () => {
  let component: HymnSelectComponent;
  let fixture: ComponentFixture<HymnSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HymnSelectComponent],
      imports: [AlphabetFilterModule, MatCheckboxModule, MatSnackBarModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HymnSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
