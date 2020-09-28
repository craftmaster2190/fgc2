import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-swipe-select',
  templateUrl: './swipe-select.component.html',
  styleUrls: ['./swipe-select.component.scss'],
})
export class SwipeSelectComponent implements OnInit {
  @Input() array: Array<{ src: string }>;
  @Input() selectedIndex: number;
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
