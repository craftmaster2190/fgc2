import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonDetailsSelectorDialogComponent } from '../person-details-selector-dialog/person-details-selector-dialog.component';

@Component({
  selector: 'app-person-selector',
  templateUrl: './person-selector.component.html',
  styleUrls: ['./person-selector.component.scss'],
})
export class PersonSelectorComponent implements OnInit {
  @Input() public src: string;
  @Input() public alt: string;

  public constructor(private readonly matDialog: MatDialog) {}

  public ngOnInit(): void {}

  public openDialog(): void {
    this.matDialog.open(PersonDetailsSelectorDialogComponent, {
      data: {
        src: this.src,
        alt: this.alt,
      },
      width: '500px',
    });
  }
}
