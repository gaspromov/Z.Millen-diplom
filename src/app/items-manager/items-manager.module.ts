import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsManagerComponent } from './items-manager.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemFormComponent } from './components/item-form/item-form.component';



@NgModule({
  declarations: [
    ItemsManagerComponent,
    ItemCardComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ItemsManagerModule { }
