import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NewsService } from 'src/app/services/news.service';

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

@Component({
  selector: 'app-participants-page',
  templateUrl: './participants-page.component.html',
  styleUrls: ['./participants-page.component.scss'],
})
export class ParticipantsPageComponent implements OnInit {
  newsItemList: NewsItem[];

  constructor(private title: Title, private newsService: NewsService) {}

  ngOnInit() {
    this.title.setTitle('News - ESN Germany');
    this.getNews();
  }

  getNews(): void {
    this.newsService
      .fetchNewsList()
      .subscribe((newsItemList) => (this.newsItemList = newsItemList));
  }
}
