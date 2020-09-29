import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempleMapComponent } from './temple-map.component';

describe('TempleMapComponent', () => {
  let component: TempleMapComponent;
  let fixture: ComponentFixture<TempleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TempleMapComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
