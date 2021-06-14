import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MainInfoService } from '../services/main-information.service';

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
  selector: 'app-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.scss'],
  preserveWhitespaces: true,
})
export class LivePageComponent implements OnInit {
  mainInfoItem: MainInfoItem;

  constructor(private title: Title, private mainInfoService: MainInfoService) {}

  ngOnInit() {
    this.title.setTitle('ESN Germany - On Air');
    this.getMainInfo();
  }

  getMainInfo(): void {
    this.mainInfoService
      .fetchMainInfo()
      .subscribe((mainInfoItem) => (this.mainInfoItem = mainInfoItem));
  }
}
