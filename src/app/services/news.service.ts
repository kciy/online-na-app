import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

interface NewsItem {
  id: string;
  Text: string;
  Title: string;
  Image: {
    id: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      medium: {
        url: string;
      };
    };
  };
  Attachment: {
    name: string;
    url: string;
  };
  updated_at: Date;
  order_on_page: number;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private url =
    'https://strapi.esn-germany.de/na-for-participants-news?_sort=Order_on_page';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchNewsList(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(this.url).pipe(
      tap((_) => this.log('fetched news')),
      catchError(this.handleError<NewsItem[]>('fetchNewsList', []))
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
    this.messageService.add(`NewsService: ${message}`);
  }
}
