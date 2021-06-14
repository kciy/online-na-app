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
  // destroyed$ = new Subject();
  // agenda: Observable<Slot[]>;
  // timer: Observable<number>;
  // currentItem: Observable<Slot>;
  // nextItem: Observable<Slot>;
  // secondNextItem: Observable<Slot>;

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
//     const options = {
//       params: new HttpParams().set(
//         'key',
//         'AIzaSyDR1_FerVTHSQBz4VB-Bai0AU0qyvaSERE'
//       ),
//     };
//     const saturdayRequest = this.http
//       .get<{ values: any[] }>(
//         // 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAsDONyWjAlNILjudHnE73Itpt4iOB2IC4iaD0zptylxBVXPzZ3KibFXq0F90hhSpyDgTHCJ81RUA4/pub?gid=1221187808',
//         'https://sheets.googleapis.com/v4/spreadsheets/2PACX-1vTAsDONyWjAlNILjudHnE73Itpt4iOB2IC4iaD0zptylxBVXPzZ3KibFXq0F90hhSpyDgTHCJ81RUA4/values/Saturday!A2:I28',
//         // 'https://sheets.googleapis.com/v4/spreadsheets/2PACX-1vTYDFCByReAUj10QxIO7I0bAeDkiMmE7cmFk57aQSkFyLaQFvRx85L6B7g1XJT_jYSEakGqi9Zt_s6k/values/Saturday!D2:K36',
//         // 'https://sheets.googleapis.com/v4/spreadsheets/1FdwFeTNmr-47KpY4hMvKBNqDMfgg88eEk9zb-crCDt0/values/Saturday!D2:K36',
//         // 'https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vTYDFCByReAUj10QxIO7I0bAeDkiMmE7cmFk57aQSkFyLaQFvRx85L6B7g1XJT_jYSEakGqi9Zt_s6k/pubhtml?urp=gmail_link&gxids=7628',
//         options
//       )
//       .pipe(retry(5));
//     const sundayRequest = this.http
//       .get<{ values: any[] }>(
//         'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAsDONyWjAlNILjudHnE73Itpt4iOB2IC4iaD0zptylxBVXPzZ3KibFXq0F90hhSpyDgTHCJ81RUA4/pubhtml?gid=296047704',
//         options
//       )
//       .pipe(retry(5));
//     this.agenda = combineLatest([saturdayRequest, sundayRequest]).pipe(
//       map((requests) => requests.map((request) => request.values.slice(1))),
//       map((days) => {
//         const slots = [];
//         days.forEach((items, index) =>
//           items.forEach((item) => {
//             if (item[0]) {
//               slots.push({
//                 start: moment('14.06.2021', 'DD.MM.YYYY')
//                   .add(index, 'day')
//                   .hour(item[0].split(':')[0])
//                   .minute(item[0].split(':')[1]),
//                 end: moment('20.06.2021', 'DD.MM.YYYY')
//                   .add(index, 'day')
//                   .hour(item[1].split(':')[0])
//                   .minute(item[1].split(':')[1]),
//                 topic: item[3],
//                 type: this.longType(item[6]),
//                 speaker: this.longSpeaker(item[7]),
//               });
//             }
//           })
//         );
//         return slots;
//       }),
//       shareReplay(1)
//     );
//     this.timer = interval(1000).pipe(takeUntil(this.destroyed$));
//     this.nextItem = this.timer.pipe(
//       switchMap((_) => this.agenda),
//       map((agenda) => agenda.find((slot) => slot.start > moment())),
//       map((slot) => {
//         if (!slot) {
//           return null;
//         }
//         return Object.assign({}, slot, {
//           // duration: moment.duration(slot.start.diff(moment())).humanize(true)
//         });
//       })
//     );
//     this.currentItem = this.timer.pipe(
//       switchMap((_) => this.agenda),
//       map((agenda) =>
//         agenda.find((slot) => slot.start < moment() && slot.end > moment())
//       ),
//       map((slot) => {
//         if (!slot) {
//           return null;
//         }
//         return Object.assign({}, slot, {
//           // progress: Math.round((moment().diff(slot.start) / slot.end.diff(slot.start)) * 100)
//         });
//       })
//     );
//     this.secondNextItem = this.timer.pipe(
//       switchMap((_) => this.agenda),
//       map((agenda) => agenda.filter((slot) => slot.start > moment())[1]),
//       map((slot) => {
//         if (!slot) {
//           return null;
//         }
//         return Object.assign({}, slot, {
//           // duration: moment.duration(slot.start.diff(moment())).humanize(true)
//         });
//       })
//     );
//   }
//   ngOnDestroy(): void {
//     this.destroyed$.complete();
//   }
// }
// interface Slot {
//   start: moment.Moment;
//   end: moment.Moment;
//   topic: string;
//   speaker: string;
//   type: string;
// }
