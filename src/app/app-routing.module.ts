import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LivePageComponent } from './pages/live-page/live-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'live', component: LivePageComponent },
  { path: '', pathMatch: 'full', component: AppComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }