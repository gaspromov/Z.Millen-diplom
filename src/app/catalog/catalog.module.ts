import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySidebarComponent } from './components/category-sidebar/category-sidebar.component';
import { Route, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { SearchPipe } from './pipes/search.pipe';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SortPipe } from './pipes/sort.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToolsModule } from '../tools/tools.module';


const routes: Route[] = [
  { path: ':category_id', component: CatalogComponent },
  { path: '', redirectTo: 'all' }
]


@NgModule({
  declarations: [
    CategorySidebarComponent,
    CatalogComponent,
    SearchPipe,
    ProductCardComponent,
    SortPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToolsModule
  ]
})
export class CatalogModule { }
