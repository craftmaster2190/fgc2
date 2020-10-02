import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempleMapComponent } from './temple-map.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('TempleMapComponent', () => {
  let component: TempleMapComponent;
  let fixture: ComponentFixture<TempleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TempleMapComponent],
      imports: [MatSnackBarModule],
    }).compileComponents();

    (await import('jvectormap-next')).default(jQuery);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(jQuery).toBeTruthy('jQuery was falsy');
    expect((jQuery.fn as any).vectorMap).toBeTruthy('vectorMap was falsy');
    expect(component).toBeTruthy('component was falsy');
  });
});
