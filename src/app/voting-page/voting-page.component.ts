import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss']
})
export class VotingPageComponent {
  results$: Observable<Result[]>;
  lastUpdate$: Observable<Date>;

  constructor(http: HttpClient) {
    const resultRequest = http.get<any[]>('https://vote.esn-germany.de/results').pipe(map(res => res.map(result => ({
      ...result,
      anonymized: result.anonymized === 'Y',
      active: result.active === 'Y',
      progress: (result.total / result.vote) * 100
    }))));
    this.results$ = timer(0, 10000).pipe(switchMap(() => resultRequest));
    this.lastUpdate$ = this.results$.pipe(map(() => new Date()));
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
