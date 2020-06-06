import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LivePageComponent } from './live-page/live-page.component';

const routes: Routes = [
  { path: '', data: { standalone: true, title: 'Home' }, component: HomePageComponent },
  { path: 'live', data: { standalone: true, title: 'Live' }, component: LivePageComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];


@NgModule({
  declarations: [
  ],
  entryComponents: [HomePageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }