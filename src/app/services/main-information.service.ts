import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

interface MainInfoItem {
  id: string;
  naTitle: string;
  welcomeMessage: string;
  date: string;
  frontImage: {
    id: string;
    alternativeText: string;
    formats: {
      medium: {
        url: string;
      };
    };
  };
  mainChairName: string;
  mainChairSection: string;
  mainChairText: string;
  mainChairImg: {
    id: string;
    alternativeText: string;
    formats: {
      medium: {
        url: string;
      };
    };
  };
  viceChairName: string;
  viceChairSection: string;
  viceChairText: string;
  viceChairImg: {
    id: string;
    alternativeText: string;
    formats: {
      medium: {
        url: string;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class MainInfoService {
  private url = 'https://strapi.esn-germany.de/na-main-information';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchMainInfo(): Observable<MainInfoItem> {
    return this.http.get<MainInfoItem>(this.url).pipe(
      tap((_) => this.log('fetched MainInfos')),
      catchError(this.handleError<MainInfoItem>('fetchMainInfo'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`MainInfoService: ${message}`);
  }
}
