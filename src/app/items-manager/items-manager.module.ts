import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsManagerComponent } from './items-manager.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { Route, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ToolsModule } from '../tools/tools.module';


const routes: Route[] = [
  { path: '', component: ItemsManagerComponent },
  { path: '**', redirectTo: '/items-manager' }
]

@NgModule({
  declarations: [
    ItemsManagerComponent,
    ItemCardComponent,
    ItemFormComponent,
    SearchPipe,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    ToolsModule
  ]
})
export class ItemsManagerModule { }
