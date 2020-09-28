import { Component, Input } from '@angular/core';

export enum Session {
  SaturdayMorningSession,
  SaturdayAfternoonSession,
  PriesthoodSession,
  SundayMorningSession,
  SundayAfternoonSession,
}

@Component({
  selector: 'app-session-icon',
  templateUrl: './session-icon.component.html',
  styleUrls: ['./session-icon.component.scss'],
})
export class SessionIconComponent {
  @Input() session: Session;

  get sessionName(): keyof typeof Session {
    return Session[this.session] as keyof typeof Session;
  }
}
