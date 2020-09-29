import { Component, Input, OnInit } from '@angular/core';
import { SwipeInputArray } from '../swipe-select/swipe-select.component';

@Component({
  selector: 'app-person-details-selector',
  templateUrl: './person-details-selector.component.html',
  styleUrls: ['./person-details-selector.component.scss'],
})
export class PersonDetailsSelectorComponent implements OnInit {
  @Input() public src: string;
  @Input() public alt: string;

  public constructor() {}

  public ngOnInit(): void {}
}
