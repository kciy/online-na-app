import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

interface DocumentsItem {
  id: string;
  category: string;
  Title: string;
  contentText: string;
  contentFile: {
    url: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private url = 'https://strapi.esn-germany.de/na-documents?_sort=category';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchDocumentsList(): Observable<DocumentsItem[]> {
    return this.http.get<DocumentsItem[]>(this.url).pipe(
      tap((_) => this.log('fetched Documents')),
      catchError(this.handleError<DocumentsItem[]>('fetchDocuments'))
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
    this.messageService.add(`DocumentsService: ${message}`);
  }
}
