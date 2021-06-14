import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TodosService } from '../services/todos.service';
import { MainInfoService } from '../services/main-information.service';

interface TodoItem {
  id: string;
  title: string;
  active: boolean;
  text: string;
  order: number;
}

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
  streamLink: string;
  agendaLink: string;
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

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  preserveWhitespaces: true,
})
export class HomePageComponent implements OnInit {
  todoItemList: TodoItem[];
  mainInfoItem: MainInfoItem;

  constructor(
    private title: Title,
    private todosService: TodosService,
    private mainInfoService: MainInfoService
  ) {}

  ngOnInit() {
    this.title.setTitle('ESN Germany - On Air');
    this.getTodos();
    this.getMainInfo();
  }

  getTodos(): void {
    this.todosService
      .fetchTodoList()
      .subscribe((todoItemList) => (this.todoItemList = todoItemList));
  }

  getMainInfo(): void {
    this.mainInfoService
      .fetchMainInfo()
      .subscribe((mainInfoItem) => (this.mainInfoItem = mainInfoItem));
  }
}
