import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLoaderComponent } from './form-components/btn-loader/btn-loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PasswordControlComponent } from './form-components/password-control/password-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';



@NgModule({
  declarations: [
    BtnLoaderComponent,
    PasswordControlComponent,
    PaginatorComponent
  ],
  exports: [
    BtnLoaderComponent,
    PasswordControlComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ToolsModule { }
