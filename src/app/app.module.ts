import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import {HomePageComponent} from './home-page/home-page.component';
import {LivePageComponent} from './live-page/live-page.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {VotingPageComponent} from './voting-page/voting-page.component';
import {DocumentsPageComponent} from './documents-page/documents-page.component';
import {HttpClientModule} from '@angular/common/http';
import {AgendaExplorerComponent} from './live-page/agenda-explorer/agenda-explorer.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    SharedModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    LivePageComponent,
    NotFoundPageComponent,
    VotingPageComponent,
    DocumentsPageComponent,
    AgendaExplorerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
