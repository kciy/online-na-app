import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LivePageComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    const stream = document.getElementById("youtube-link");
    if (moment().isAfter('2020-06-28', 'day')) {
      stream.setAttribute("src", "https://www.youtube.com/embed/3YjLgjJIZ6o");
    }
  }

}
