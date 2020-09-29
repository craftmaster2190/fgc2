import { Component, OnInit } from '@angular/core';
import { Session } from '../data/session';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  public constructor() {}

  public selectedPerson = 0;
  public selectedTieColor = { 0: 0, 1: 0, 2: 0 };
  public selectedSession = { 0: 0, 1: 0, 2: 0 };

  public persons = ['russell', 'dallin', 'henry'].map((person) => ({
    src: 'assets/people/' + person + '.jpg',
  }));
  public onePerson: 1;

  public ngOnInit(): void {}
}
