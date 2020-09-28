import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonDetailsSelectorDialogComponent } from '../person-details-selector-dialog/person-details-selector-dialog.component';

@Component({
  selector: 'app-person-selector',
  templateUrl: './person-selector.component.html',
  styleUrls: ['./person-selector.component.scss'],
})
export class PersonSelectorComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;

  constructor(private readonly matDialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.matDialog.open(PersonDetailsSelectorDialogComponent, {
      data: {
        src: this.src,
        alt: this.alt,
      },
      width: '500px',
    });
  }
}
