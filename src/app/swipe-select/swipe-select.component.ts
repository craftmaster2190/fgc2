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
  @Input() public array: SwipeInputArray;
  @Input() public imageHeight: number;
  @Input() public imageWidth: number;
  @Input() public selectedIndex: number;
  @Output() public selectedIndexChange = new EventEmitter<number>();
  @Input() public disabled: boolean;

  public constructor() {}

  public ngOnInit(): void {}

  public updateSelectedIndex(value: number): void {
    this.selectedIndex = value;
    this.selectedIndexChange.emit(value);
  }

  public onSwiperClick($event): void {
    const { clickedIndex } = $event.find((ev) => 'clickedIndex' in ev);
    if (clickedIndex != null) {
      this.updateSelectedIndex(clickedIndex);
    }
  }

  public onIndexChange($event): void {
    this.updateSelectedIndex($event);
  }
}
