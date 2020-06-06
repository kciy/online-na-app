import { Component, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatMenuModule, MatMenuTrigger, MatMenu } from '@angular/material/menu'; 
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'online-na-app';
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  
  trig() {
    this.trigger.openMenu();
  }
}
