import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { RegistrationComponent } from './screens/registration/registration.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, data: {title: 'Авторизация', descript: 'Страница авторизация в сервисе Rentoo'} },
    { path: 'registration', component: RegistrationComponent, data: {title: 'Регистрация', descript: 'Страница регистрации в сервисе Rentoo'} },
    { path: '**', redirectTo: 'login' }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
