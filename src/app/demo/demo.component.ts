import { Component, OnInit } from '@angular/core';
import { Session } from '../data/session';
import { TieColor } from '../data/tie-color';
import { ChoirColor } from '../data/choir-color';
import { CountryNames } from '../data/countries';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  public constructor() {}

  public person = 'Russel M. Nelson';
  public session: Session = Session.PriesthoodSession;
  public tieColor: TieColor = TieColor.green;
  public choirColor: ChoirColor = ChoirColor.redMauve;
  public temples: Array<string> = CountryNames.slice(0, 3);

  public ngOnInit(): void {}
}
