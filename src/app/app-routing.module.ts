import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppComponent } from './app.component';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';
import { MasterService } from './master.service';

export const AuthGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const service = inject(MasterService);
  service.isProgress = state.url.includes('sentiment-analysis');
  return true;
}

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'sentiment-analysis',
    component: SentimentAnalysisComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
