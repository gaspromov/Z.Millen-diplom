import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsManagerComponent } from './items-manager.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { Route, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';


const routes: Route[] = [
  { path: '', component: ItemsManagerComponent },
  { path: '**', redirectTo: '/items-manager' }
]

@NgModule({
  declarations: [
    ItemsManagerComponent,
    ItemCardComponent,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ScrollingModule
  ]
})
export class ItemsManagerModule { }
