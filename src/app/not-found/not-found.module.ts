import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { path: '**', component: NotFoundComponent, data: {title: "Страница не найдена", descript: 'Страница не найдена. Попробуйте перейти на главную.'} }
]

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule { }
