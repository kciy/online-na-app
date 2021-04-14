import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LivePageComponent } from './live-page/live-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { VotingPageComponent } from './voting-page/voting-page.component';
import { DocumentsPageComponent } from './documents-page/documents-page.component';
import { MemShipFeeCalcComponent } from './home-page/mem-ship-fee-calc/mem-ship-fee-calc.component';
import { ImprintPageComponent } from './imprint-page/imprint-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AgendaExplorerComponent } from './live-page/agenda-explorer/agenda-explorer.component';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import {
  AngularFireAnalyticsModule,
  ScreenTrackingService,
} from '@angular/fire/analytics';
import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LinksPageComponent } from './links-page/links-page.component';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    SharedModule,
    FlexLayoutModule,
    FormsModule,
    MarkdownModule.forRoot(),
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    LivePageComponent,
    NotFoundPageComponent,
    VotingPageComponent,
    DocumentsPageComponent,
    ImprintPageComponent,
    AgendaExplorerComponent,
    FooterComponent,
    MemShipFeeCalcComponent,
    LinksPageComponent,
  ],
  providers: [ScreenTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
