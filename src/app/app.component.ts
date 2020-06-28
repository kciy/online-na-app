import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from './theme/theme.service';
import {SwUpdate} from '@angular/service-worker';
import {interval} from 'rxjs';
import {environment} from '../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'online-na-app';

  constructor(
      private themeService: ThemeService,
      updates: SwUpdate,
      snackBar: MatSnackBar,
      @Inject(DOCUMENT) document: Document
  ) {
    const updateCheckTimer$ = interval(0.5 * 2 * 60 * 1000);
    if (environment.production) {
      updateCheckTimer$.subscribe(() => updates.checkForUpdate());
    }
    updates.available.subscribe((event) => {
      snackBar
          .open('A new version of this app is available!', 'Activate', {
            duration: 0,
          })
          .onAction()
          .subscribe(() =>
              updates.activateUpdate().then(() => document.location.reload())
          );
    });
  }

  ngOnInit() {
    this.toggleTheme();
    this.toggleTheme();
  }

  ngOnDestroy(): void {
  }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
    const button = document.getElementById('toggleButton');

    if (button.innerHTML === 'Light Mode') {
      button.innerHTML = 'Dark Mode';
    } else {
      button.innerHTML = 'Light Mode';
    }

    const footer = document.getElementById('footer-img');
    if (footer != null) {
      if (footer.getAttribute('src') === '../assets/logo/DE_colour.png') {
        footer.setAttribute('src', '../assets/logo/DE_colour-white.png');
      } else {
        footer.setAttribute('src', '../assets/logo/DE_colour.png');
      }
    }

    const img = document.getElementById('agenda-img');
    if (img != null) {
      if (img.getAttribute('src') === '../../../assets/icons/calendar-month.png') {
        img.setAttribute('src', '../../../assets/icons/calendar-month-white.png');
      } else {
        img.setAttribute('src', '../../../assets/icons/calendar-month.png');
      }
    }
  }
}
