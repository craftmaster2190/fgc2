import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import { Hymns } from '../data/hymns';
import * as Fuse from 'fuse.js';

@Component({
  selector: 'app-hymn-select',
  templateUrl: './hymn-select.component.html',
  styleUrls: ['./hymn-select.component.scss'],
})
export class HymnSelectComponent {

  private static readonly MAX_HYMNS = 10;
  public selectedHymnsSet = new Set<string>();
  public filterString: string;
  public readonly hymns = Array.from(new Set<string>(Hymns));
  private readonly fuse = new Fuse(this.hymns, { includeScore: true });

  @ViewChild('hymnInput') public input;

  @Input() public selectedHymns: Array<string>;
  @Output() public selectedHymnsChange = new EventEmitter<Array<string>>();
  @Input() public disabled: boolean;

  public isDisabled(): boolean {
    return this.selectedHymnsSet.size >= HymnSelectComponent.MAX_HYMNS;
  }

  public getFilteredHymns() {
    this.selectedHymns;
    return this.fuse.search(this.filterString).map(item => this.hymns[item.item]).slice(0, 10);
  }
}
