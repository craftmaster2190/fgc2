import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Hymns } from '../data/hymns';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hymn-select',
  templateUrl: './hymn-select.component.html',
  styleUrls: ['./hymn-select.component.scss'],
})
export class HymnSelectComponent implements OnChanges, AfterViewInit {
  private static readonly MAX_HYMNS = 10;
  public selectedHymnsSet = new Set<string>();
  @Input() public selectedHymns: Array<string>;
  @Output() public selectedHymnsChange = new EventEmitter<Array<string>>();

  public readonly hymns = Array.from(new Set<string>(Hymns))
    .sort()
    .map((hymn) => ({ name: hymn }));

  public constructor(
    private readonly elementRef: ElementRef,
    private readonly snackBar: MatSnackBar
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedHymns) {
      this.selectedHymnsSet = new Set<string>(
        this.selectedHymns ?? changes.selectedHymns.currentValue ?? []
      );
    }
  }

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.querySelector(
      '.alpha-search-input input'
    ).disabled = true;
  }

  public isDisabled(): boolean {
    return this.selectedHymnsSet.size >= HymnSelectComponent.MAX_HYMNS;
  }

  public onCheckBox(event: MatCheckboxChange, hymn: { name: string }): void {
    if (event.checked && this.isDisabled()) {
      event.source.checked = false;
      this.snackBar.open(
        `Max of ${HymnSelectComponent.MAX_HYMNS} Hymns!`,
        undefined,
        {
          duration: 2000,
        }
      );
      return;
    }

    if (event.checked) {
      this.selectedHymnsSet.add(hymn.name);
    } else {
      this.selectedHymnsSet.delete(hymn.name);
    }

    this.selectedHymns = Array.from(this.selectedHymnsSet);
    this.selectedHymnsChange.emit(this.selectedHymns);
  }
}
