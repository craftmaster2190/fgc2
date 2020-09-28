import { Component, OnInit } from '@angular/core';
import { Session } from '../session-icon/session-icon.component';

@Component({
  selector: 'app-session-selector',
  templateUrl: './session-selector.component.html',
  styleUrls: ['./session-selector.component.scss'],
})
export class SessionSelectorComponent implements OnInit {
  sessions = [
    Session.SaturdayMorningSession,
    Session.SaturdayAfternoonSession,
    Session.PriesthoodSession,
    Session.SundayMorningSession,
    Session.SundayAfternoonSession,
  ];

  constructor() {}

  ngOnInit(): void {}
}
