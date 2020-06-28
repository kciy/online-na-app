import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    var button = document.getElementById('toggleButton');
    var footer = document.getElementById('footer-img');

    if (button.innerHTML === 'Light Mode') {
      footer.setAttribute('src', '../assets/logo/DE_colour-white.png');
    }
  }
}
