import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './screens/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolsModule } from '../tools/tools.module';
import { RegistrationComponent } from './screens/registration/registration.component';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToolsModule,
    NgxMaskModule.forRoot()
  ]
})
export class AuthModule { }
