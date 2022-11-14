import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { PolicyComponent } from './components/policy/policy.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'privacy-policy-TOS', component: PolicyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
