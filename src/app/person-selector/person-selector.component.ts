import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  PersonDetailsSelectorDialogComponent,
  PersonDetailsSelectorDialogResult,
} from '../person-details-selector-dialog/person-details-selector-dialog.component';
import { Session } from '../data/session';
import { TieColor } from '../data/tie-color';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-person-selector',
  templateUrl: './person-selector.component.html',
  styleUrls: ['./person-selector.component.scss'],
})
export class PersonSelectorComponent implements OnInit {
  @Input() public src: string;
  @Input() public alt: string;
  @Input() public tieColor: TieColor;
  @Output() public tieColorChange = new EventEmitter<TieColor>();
  @Input() public session: Session;
  @Output() public sessionChange = new EventEmitter<Session>();
  @Input() public disabled: boolean;

  public constructor(private readonly matDialog: MatDialog) {}

  public ngOnInit(): void {}

  public openDialog(): void {
    if (this.disabled) {
      return;
    }
    this.matDialog
      .open(PersonDetailsSelectorDialogComponent, {
        data: {
          src: this.src,
          alt: this.alt,
          session: this.session,
          tieColor: this.tieColor,
        },
        width: '500px',
      })
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        filter((result) => !!result),
        tap((result: PersonDetailsSelectorDialogResult) => {
          this.session = result.session;
          this.sessionChange.emit(this.session);
          this.tieColor = result.tieColor;
          this.tieColorChange.emit(this.tieColor);
        })
      )
      .subscribe();
  }
}
