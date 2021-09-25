import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Observable, Subject, combineLatest, interval } from 'rxjs';
import { map, retry, shareReplay, takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agenda-explorer',
  templateUrl: './agenda-explorer.component.html',
  styleUrls: ['./agenda-explorer.component.scss'],
})
export class AgendaExplorerComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  agenda: Observable<Slot[]>;
  timer: Observable<number>;
  currentItem: Observable<Slot>;
  nextItem: Observable<Slot>;
  secondNextItem: Observable<Slot>;

  longType(type: string) {
    switch (type) {
      case 'P':
        return 'Presentation';
      case 'V':
        return 'Voting';
      case 'Q&A':
        return 'Question & Answer';
      default:
        return type;
    }
  }

  longSpeaker(speaker: string) {
    switch (speaker) {
      case 'CT':
        return 'Chairing Team';
      case 'AB':
        return 'Auditorial Board';
      case 'NB':
        return 'National Board';
      default:
        return speaker;
    }
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const options = {
      params: new HttpParams().set(
        'key',
        'AIzaSyArbU67uqLrk6MIKkSbBJEGU8K9EYjxNro' //it@
      ),
    };
    const saturdayRequest = this.http
      .get<{ values: any[] }>(
        'https://sheets.googleapis.com/v4/spreadsheets/1QzgcKyVVCk6DVu0O3nu0RDnfremqNiDjUvaj3NAbmnU/values/Sunday!A2:I28?key=AIzaSyArbU67uqLrk6MIKkSbBJEGU8K9EYjxNro',
        options
      )
      .pipe(retry(5));
    const sundayRequest = this.http
      .get<{ values: any[] }>(
        'https://sheets.googleapis.com/v4/spreadsheets/1QzgcKyVVCk6DVu0O3nu0RDnfremqNiDjUvaj3NAbmnU/values/Sunday!A2:I28?key=AIzaSyArbU67uqLrk6MIKkSbBJEGU8K9EYjxNro',
        options
      )
      .pipe(retry(5));
    this.agenda = combineLatest([saturdayRequest, sundayRequest]).pipe(
      map((requests) => requests.map((request) => request.values.slice(1))),
      map((days) => {
        const slots = [];
        days.forEach((items, index) =>
          items.forEach((item) => {
            if (item[0]) {
              slots.push({
                start: moment('20.06.2021', 'DD.MM.YYYY')
                  .add(index, 'day')
                  .hour(item[0].split(':')[0])
                  .minute(item[0].split(':')[1]),
                end: moment('20.06.2021', 'DD.MM.YYYY')
                  .add(index, 'day')
                  .hour(item[1].split(':')[0])
                  .minute(item[1].split(':')[1]),
                topic: item[3],
                type: this.longType(item[6]),
                speaker: this.longSpeaker(item[7]),
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
      switchMap((_) => this.agenda),
      map((agenda) => agenda.find((slot) => slot.start > moment())),
      map((slot) => {
        if (!slot) {
          return null;
        }
        return Object.assign({}, slot, {
          // duration: moment.duration(slot.start.diff(moment())).humanize(true)
        });
      })
    );
    this.currentItem = this.timer.pipe(
      switchMap((_) => this.agenda),
      map((agenda) =>
        agenda.find((slot) => slot.start < moment() && slot.end > moment())
      ),
      map((slot) => {
        if (!slot) {
          return null;
        }
        return Object.assign({}, slot, {
          // progress: Math.round((moment().diff(slot.start) / slot.end.diff(slot.start)) * 100)
        });
      })
    );
    this.secondNextItem = this.timer.pipe(
      switchMap((_) => this.agenda),
      map((agenda) => agenda.filter((slot) => slot.start > moment())[1]),
      map((slot) => {
        if (!slot) {
          return null;
        }
        return Object.assign({}, slot, {
          // duration: moment.duration(slot.start.diff(moment())).humanize(true)
        });
      })
    );
  }
  ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
interface Slot {
  start: moment.Moment;
  end: moment.Moment;
  topic: string;
  speaker: string;
  type: string;
}
