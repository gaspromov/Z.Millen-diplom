import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './screens/profile/profile.component';
import { Route, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Route[] = [
  { path: '', component: ProfileComponent },
  { path: '**', redirectTo: '/account' }
]

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule
  ]
})
export class AccountModule { }
