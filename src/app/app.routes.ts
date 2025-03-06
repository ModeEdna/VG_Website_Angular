import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AnalyticsComponent } from './components/pages/analytics/analytics.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LearnComponent } from './components/pages/learn/learn.component';
import { PoliciesAndProceduresComponent } from './components/pages/policies-and-procedures/policies-and-procedures.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Add this default route
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'policies', component: PoliciesAndProceduresComponent }, // Changed to match your navigation link
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
