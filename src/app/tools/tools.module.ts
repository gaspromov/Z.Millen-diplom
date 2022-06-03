import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLoaderComponent } from './form-components/btn-loader/btn-loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PasswordControlComponent } from './form-components/password-control/password-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BtnLoaderComponent,
    PasswordControlComponent
  ],
  exports: [
    BtnLoaderComponent,
    PasswordControlComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ToolsModule { }
