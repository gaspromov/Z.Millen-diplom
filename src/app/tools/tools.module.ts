import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLoaderComponent } from './form-components/btn-loader/btn-loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    BtnLoaderComponent
  ],
  exports: [
    BtnLoaderComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ]
})
export class ToolsModule { }
