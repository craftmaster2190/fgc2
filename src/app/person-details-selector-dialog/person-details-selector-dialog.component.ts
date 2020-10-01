import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TieColor } from '../data/tie-color';
import { Session } from '../data/session';
import { capitalCase } from 'change-case';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

export interface PersonDetailsSelectorDialogResult {
  session: Session;
  tieColor: TieColor;
}

@UntilDestroy()
@Component({
  selector: 'app-person-details-selector-dialog',
  templateUrl: './person-details-selector-dialog.component.html',
  styleUrls: ['./person-details-selector-dialog.component.scss'],
})
export class PersonDetailsSelectorDialogComponent implements OnInit {
  public src: string;
  public alt: string;
  public session: Session;
  public tieColor: TieColor;

  public altName: string;
  public tieColorName: string;
  public sessionName: string;

  private readonly debouncedChangeUpdate = new Subject<null>();
  private readonly debouncedChangeUpdateSubscription = this.debouncedChangeUpdate
    .pipe(
      untilDestroyed(this),
      debounceTime(300),
      tap(() => {
        this.altName = capitalCase(this.alt ?? '');
        this.tieColorName = capitalCase(this.tieColor ?? '');
        this.sessionName = capitalCase(this.session ?? '');
      })
    )
    .subscribe();

  public constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private readonly matDialogRef: MatDialogRef<
      PersonDetailsSelectorDialogComponent
    >
  ) {
    Object.assign(this, data ?? {});
  }

  public ngOnInit(): void {
    this.triggerUpdateNames();
  }

  public triggerUpdateNames(): void {
    this.debouncedChangeUpdate.next(null);
  }

  public close(): void {
    this.matDialogRef.close({
      session: this.session,
      tieColor: this.tieColor,
    } as PersonDetailsSelectorDialogResult);
  }
}
