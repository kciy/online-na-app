import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss'],
})
export class VotingPageComponent {
  results$: Observable<Result[]>;
  lastUpdate$: Observable<Date>;
  votes$: Observable<any[]>;

  constructor(http: HttpClient) {
    // const resultRequest = http
    //   .get<any[]>('https://vote.esn-germany.de/results')
    //   .pipe(
    //     map((res) =>
    //       res.map((result) => ({
    //         ...result,
    //         anonymized: result.anonymized === 'Y',
    //         active: result.active === 'Y',
    //         progress: (result.vote / result.total) * 100,
    //       }))
    //     )
    //   );
    // this.votes$ = http.get<any[]>('/assets/data/results.json').pipe(
    //   map((res) => res.filter((r) => r.results)),
    //   tap(console.log)
    // );
    // this.results$ = timer(0, 10000).pipe(
    //   switchMap(() => resultRequest),
    //   map((results) => {
    //     const extraResults = [
    //       ...results.filter(
    //         (res) => !res.name.toLowerCase().includes('overview')
    //       ),
    //     ];
    //     // extraResults.sort((a, b) => a.id - b.id);
    //     return extraResults;
    //   }),
    //   shareReplay(1)
    // );
    // this.lastUpdate$ = this.results$.pipe(map(() => new Date()));
  }

  trackById(index: number, item: Result) {
    return item.id ?? index;
  }
}

interface Result {
  id: number;
  anonymized: boolean;
  active: boolean;
  name: string;
  vote: number;
  total: number;
}
