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
  }

  ngOnDestroy(): void { }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
    var button = document.getElementById("toggleButton");

    if (button.innerHTML === "Light Mode") {
      button.innerHTML = "Dark Mode";
    } else {
      button.innerHTML = "Light Mode";
    }

    var footer = document.getElementById("footer-img");
    if (footer != null) {
      if (footer.getAttribute('src') === "../assets/logo/DE_colour.png") {
        footer.setAttribute('src', "../assets/logo/DE_colour-white.png");
      } else {
        footer.setAttribute('src', "../assets/logo/DE_colour.png");
      }
    }

    var img = document.getElementById("agenda-img");
    if (img != null) {
      if (img.getAttribute('src') === "../../../assets/icons/calendar-month.png") {
        img.setAttribute('src', "../../../assets/icons/calendar-month-white.png");
      } else {
        img.setAttribute('src', "../../../assets/icons/calendar-month.png");
      }
    }
  }
}
