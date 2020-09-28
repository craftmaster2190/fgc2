import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface SwipeInputItem {
  src: string;
  name?: string;
}

export type SwipeInputArray = Array<SwipeInputItem>;

@Component({
  selector: 'app-swipe-select',
  templateUrl: './swipe-select.component.html',
  styleUrls: ['./swipe-select.component.scss'],
})
export class SwipeSelectComponent implements OnInit {
  @Input() array: SwipeInputArray;
  @Input() selectedIndex: number;
  @Input() imageHeight: number;
  @Input() imageWidth: number;
  @Output() selectedIndexChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  updateSelectedIndex(value: number): void {
    this.selectedIndex = value;
    this.selectedIndexChange.emit(value);
  }

  onSwiperClick($event): void {
    const { clickedIndex } = $event.find((ev) => 'clickedIndex' in ev);
    console.log('onSwiperClick', clickedIndex, $event);
    if (clickedIndex != null) {
      this.updateSelectedIndex(clickedIndex);
    }
  }

  onIndexChange($event): void {
    console.log('onIndexChange', $event);
    this.updateSelectedIndex($event);
  }
}
