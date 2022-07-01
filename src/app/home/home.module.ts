import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Route, RouterModule } from '@angular/router';
import { CatalogCarouselComponent } from './components/catalog-carousel/catalog-carousel.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Route[] = [
  { path: '', component: HomeComponent, data: {title: 'Главная', descript: 'Главная страница Rentoo'}  }
]

@NgModule({
  declarations: [
    HomeComponent,
    CatalogCarouselComponent,
    AboutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
