import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Observable, Subject, combineLatest, interval } from 'rxjs';
import { map, retry, shareReplay, takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agenda-explorer',
  templateUrl: './agenda-explorer.component.html',
  styleUrls: ['./agenda-explorer.component.scss']
})
export class AgendaExplorerComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  agenda: Observable<Slot[]>;
  timer: Observable<number>;
  currentItem: Observable<Slot>;
  nextItem: Observable<Slot>;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const options = { params: new HttpParams().set('key', ' AIzaSyC5Ntl3HEpQSuiiNfz4i3R-CnvKK25eqAg ')};
    const saturdayRequest = this.http
      .get<{ values: any[]}>(
        'https://docs.google.com/spreadsheets/d/1j7_Y8NRuIQz_8qB53evqqEN_G_rr0rbWiS80LnvK4dU/edit#gid=1221187808&range=A3:H29',
        options
        )
        .pipe(retry(5));
        const sundayRequest = this.http
        .get<{ values: any[]}>(
        'https://docs.google.com/spreadsheets/d/1j7_Y8NRuIQz_8qB53evqqEN_G_rr0rbWiS80LnvK4dU/edit#gid=296047704&range=A3:H18',
        options
      )
      .pipe(retry(5));

      this.agenda = combineLatest([saturdayRequest, sundayRequest]).pipe(
        map(requests => requests.map(request => request.values.slice(2))),
        map(days => {
          const slots = [];
          days.forEach((items, index) =>
          items.forEach(item => {
            if (item[0]) {
              slots.push({
                start: moment('27.06.2020', 'DD.MM.YYYY')
                .add(index, 'day')
                .hour(item[0].split(':')[0])
                .minute(item[0].split(':')[1]),
                end: moment('27.06.2020', 'DD.MM.YYYY')
                .add(index, 'day')
                .hour(item[1].split(':')[0])
                .minute(item[1].split(':')[1]),
                topic: item[2],
                speaker: item[3]
              });
            } else {
              slots[slots.length - 1].items.push({
                topic: item[2],
                speaker: item[3]
              });
            }
          })
          );
          return slots;
        }),
        shareReplay(1)
      );
      this.timer = interval(1000).pipe(takeUntil(this.destroyed$));
      this.nextItem = this.timer.pipe(
        switchMap(_ => this.agenda),
        map(agenda => agenda.find(slot => slot.start > moment())),
        map(slot => {
          if (!slot) {
            return null;
          }
          return Object.assign({}, slot, {
            duration: moment.duration(slot.start.diff(moment())).humanize(true)
          });
        })
      );
      this.currentItem = this.timer.pipe(
        switchMap(_ => this.agenda),
        map(agenda => agenda.find(slot => slot.start < moment() && slot.end > moment())),
        map(slot => {
          if (!slot) {
            return null;
          }
          return Object.assign({}, slot, {
            progress: Math.round((moment().diff(slot.start) / slot.end.diff(slot.start)) * 100)
          });
        })
      );
  }
  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  trackByTopic(index, item) {
    return item.topic;
  }
}

interface Slot {
  start: moment.Moment;
  end: moment.Moment;
  progress?: number;
  duration?: string;
  topic: string;
  speaker: string;
}
