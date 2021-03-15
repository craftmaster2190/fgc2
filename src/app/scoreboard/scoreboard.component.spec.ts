import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ScoreboardComponent } from './scoreboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { GameDataService } from '../game/game-data.service';

fdescribe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreboardComponent],
      imports: [NoopAnimationsModule, MatTableModule, MatSortModule],
      providers: [{provide:GameDataService,useValue: {scores:[{score: 1, username: "test"}]}}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disappear', fakeAsync(() => {
    tick(3000);
    expect(component.displayScoreboard).toBeTruthy();
  }));
});
