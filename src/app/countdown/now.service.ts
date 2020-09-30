import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class NowService {
  public now(): moment.Moment {
    return moment();
  }
}
