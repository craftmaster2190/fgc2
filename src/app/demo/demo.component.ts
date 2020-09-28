import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  constructor() {}
  selectedPerson = 0;
  selectedTieColor = { 0: 0, 1: 0, 2: 0 };
  selectedSession = { 0: 0, 1: 0, 2: 0 };

  persons = ['russell', 'dallin', 'henry'].map((person) => ({
    src: 'assets/people/' + person + '.jpg',
  }));
  onePerson: 1;

  ngOnInit(): void {}

  click(val): void {
    console.log('click', val);
  }
}
