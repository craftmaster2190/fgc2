import { Component, Input } from '@angular/core';
import { Session } from '../data/session';

@Component({
  selector: 'app-session-icon',
  templateUrl: './session-icon.component.html',
  styleUrls: ['./session-icon.component.scss'],
})
export class SessionIconComponent {
  @Input() public session: Session;

  public get sessionName(): keyof typeof Session {
    return Session[this.session] as keyof typeof Session;
  }
}
