import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-person-details-selector-dialog',
  templateUrl: './person-details-selector-dialog.component.html',
  styleUrls: ['./person-details-selector-dialog.component.scss'],
})
export class PersonDetailsSelectorDialogComponent implements OnInit {
  public src: string;
  public alt: string;

  public constructor(@Inject(MAT_DIALOG_DATA) data) {
    Object.assign(this, data ?? {});
  }

  public ngOnInit(): void {}
}
