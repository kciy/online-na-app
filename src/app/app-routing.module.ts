import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LivePageComponent } from './pages/live-page/live-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { VotingPageComponent } from './pages/voting-page/voting-page.component';

const routes: Routes = [
  { path: 'live', component: LivePageComponent },
  { path: 'voting', component: VotingPageComponent },
  { path: '', pathMatch: 'full', component: HomePageComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'error' },
  { path: 'error', component: NotFoundPageComponent, data: { title: 'Error' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }