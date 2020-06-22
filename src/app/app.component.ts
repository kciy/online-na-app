import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'online-na-app';
  
  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.toggleTheme();
    this.toggleTheme();
    // this.toggleTheme();
  }

  ngOnDestroy(): void {}

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
    var button = document.getElementById("toggleButton");
    // var icon = document.createElement("mat-icon");
    // icon.classList.add("icon-right");
    // icon.innerHTML = "highlight";

    if (button.innerHTML === "Light Mode") {
      button.innerHTML = "Dark Mode";
      // button.appendChild(icon);
    } else {
      button.innerHTML = "Light Mode";
      // button.appendChild(icon);
    }

    var footer = document.getElementById("footer-img");
    if (footer.getAttribute('src') === "../assets/logo/DE_colour.png") {
      footer.setAttribute('src', "../assets/logo/DE_colour-white.png");
    } else {
      footer.setAttribute('src', "../assets/logo/DE_colour.png");
    }

    var img = document.getElementById("agenda-img");
    if (img.getAttribute('src') === "../../../assets/icons/calendar-month.png") {
      img.setAttribute('src', "../../../assets/icons/calendar-month-white.png");
    } else {
      img.setAttribute('src', "../../../assets/icons/calendar-month.png");
    }
  }
}
