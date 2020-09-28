import { Component, Input, OnInit } from '@angular/core';
import { SwipeInputArray } from '../swipe-select/swipe-select.component';

@Component({
  selector: 'app-person-details-selector',
  templateUrl: './person-details-selector.component.html',
  styleUrls: ['./person-details-selector.component.scss'],
})
export class PersonDetailsSelectorComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;

  constructor() {}

  ngOnInit(): void {}
}
