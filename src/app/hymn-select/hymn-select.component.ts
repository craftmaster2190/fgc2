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

@Component({
  selector: 'app-hymn-select',
  templateUrl: './hymn-select.component.html',
  styleUrls: ['./hymn-select.component.scss'],
})
export class HymnSelectComponent implements OnChanges, AfterViewInit {
  private static readonly MAX_HYMNS = 5;
  public selectedHymnsSet = new Set<string>();
  @Input() public selectedHymns: Array<string>;
  @Output() public selectedHymnsChange = new EventEmitter<Array<string>>();

  public readonly hymns = Array.from(new Set<string>(Hymns))
    .sort()
    .map((hymn) => ({ name: hymn }));

  public constructor(private readonly elementRef: ElementRef) {}

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

  public onCheckBox(event: MatCheckboxChange, hymn: { name: string }): void {
    if (event.checked) {
      this.selectedHymnsSet.add(hymn.name);
    } else {
      this.selectedHymnsSet.delete(hymn.name);
    }

    this.selectedHymns = Array.from(this.selectedHymnsSet);
    this.selectedHymnsChange.emit(this.selectedHymns);
  }
}
