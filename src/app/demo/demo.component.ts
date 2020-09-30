import { Component, OnInit } from '@angular/core';
import { Session } from '../data/session';
import { TieColor } from '../data/tie-color';
import { ChoirColor } from '../data/choir-color';
import { CountryNames } from '../data/countries';
import { Hymns } from '../data/hymns';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  public person = 'Russel M. Nelson';
  public session: Session = Session.PriesthoodSession;
  public tieColor: TieColor = TieColor.green;
  public choirColor: ChoirColor = ChoirColor.redMauve;
  public temples: Array<string> = CountryNames.slice(0, 3);
  public hymns: Array<string> = Hymns.slice().sort().slice(0, 3);

  public constructor() {}

  public ngOnInit(): void {}
}
