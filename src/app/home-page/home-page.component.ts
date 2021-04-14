import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TodosService } from '../services/todos.service';

interface TodoItem {
  id: string;
  title: string;
  active: boolean;
  text: string;
  order: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  preserveWhitespaces: true,
})
export class HomePageComponent implements OnInit {
  todoItemList: TodoItem[];

  constructor(private title: Title, private todosService: TodosService) {}

  ngOnInit() {
    this.title.setTitle('ESN Germany - On Air');
    this.getTodos();
  }

  getTodos(): void {
    this.todosService
      .fetchTodoList()
      .subscribe((todoItemList) => (this.todoItemList = todoItemList));
  }
}
