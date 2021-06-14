import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsPageComponent } from './documents-page/documents-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ImprintPageComponent } from './imprint-page/imprint-page.component';
import { LivePageComponent } from './live-page/live-page.component';
import { LinksPageComponent } from './links-page/links-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { VotingPageComponent } from './voting-page/voting-page.component';

const routes: Routes = [
  { path: 'live', component: LivePageComponent },
  { path: 'links', component: LinksPageComponent },
  {
    path: 'voting',
    component: VotingPageComponent,
  },
  { path: 'documents', component: DocumentsPageComponent },
  { path: 'imprint', component: ImprintPageComponent },
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'error' },
  { path: 'error', component: NotFoundPageComponent, data: { title: 'Error' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
