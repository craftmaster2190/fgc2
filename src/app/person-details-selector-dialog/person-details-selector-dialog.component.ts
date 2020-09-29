import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TieColor } from '../data/tie-color';
import { Session } from '../data/session';

export interface PersonDetailsSelectorDialogResult {
  session: Session;
  tieColor: TieColor;
}

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

  public constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private readonly matDialogRef: MatDialogRef<
      PersonDetailsSelectorDialogComponent
    >
  ) {
    Object.assign(this, data ?? {});
  }

  public ngOnInit(): void {}

  public close(): void {
    this.matDialogRef.close({
      session: this.session,
      tieColor: this.tieColor,
    } as PersonDetailsSelectorDialogResult);
  }
}
