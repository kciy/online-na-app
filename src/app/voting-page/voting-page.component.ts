import { Component, OnInit } from '@angular/core';
declare function voting(): any;

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.scss']
})
export class VotingPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    voting();
  }
}