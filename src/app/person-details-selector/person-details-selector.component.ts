import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { TieColor } from '../data/tie-color';
import { Session } from '../data/session';

@Component({
  selector: 'app-person-details-selector',
  templateUrl: './person-details-selector.component.html',
  styleUrls: ['./person-details-selector.component.scss'],
})
export class PersonDetailsSelectorComponent {
  @Input() public src: string;
  @Input() public alt: string;
  @Input() public selectedTie: TieColor;
  @Output() public selectedTieChange = new EventEmitter<TieColor>();
  @Input() public selectedSession: Session;
  @Output() public selectedSessionChange = new EventEmitter<Session>();

  public constructor() {}

  public onSelectedTieChange(selectedTie: TieColor): void {
    this.selectedTie = selectedTie;
    this.selectedTieChange.emit(this.selectedTie);
  }

  public onSelectedSessionChange(selectedSession: Session): void {
    this.selectedSession = selectedSession;
    this.selectedSessionChange.emit(this.selectedSession);
  }
}
