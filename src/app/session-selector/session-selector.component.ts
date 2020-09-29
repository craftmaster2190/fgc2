import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Session, Sessions } from '../data/session';
import { indexOfOrUndefined } from '../../util/arrays';

@Component({
  selector: 'app-session-selector',
  templateUrl: './session-selector.component.html',
  styleUrls: ['./session-selector.component.scss'],
})
export class SessionSelectorComponent implements OnInit {
  @Input() public selectedSession: Session;
  @Output() public selectedSessionChange = new EventEmitter<Session>();

  public readonly sessions = Sessions;

  public constructor() {}

  public ngOnInit(): void {}

  public get selectedIndex(): number {
    return indexOfOrUndefined(this.sessions, this.selectedSession);
  }

  public updateSelectedIndex(value: number): void {
    this.selectedSession = this.sessions[value];
    this.selectedSessionChange.emit(this.selectedSession);
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
