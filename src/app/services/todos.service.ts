import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

interface TodoItem {
  id: string;
  title: string;
  active: boolean;
  text: string;
  order: number;
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private url = 'https://strapi.esn-germany.de/na-todos?_sort=order';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  fetchTodoList(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.url).pipe(
      tap((_) => this.log('fetched Todos')),
      catchError(this.handleError<TodoItem[]>('fetchTodos'))
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
    this.messageService.add(`TodosService: ${message}`);
  }
}
