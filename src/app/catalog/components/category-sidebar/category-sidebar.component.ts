import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.scss']
})
export class CategorySidebarComponent implements OnInit {
  categories: Category[] = [
    // { title: 'SomeTitle', id: 1 }
  ];

  @Output() onNewCategory = new EventEmitter<{title: string, id?: number}>()

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories(){
    console.log(
      this.http.request( Requests['getCategories'] )
        .pipe(take(1))
        .subscribe(res => {
            this.categories = res
            let categoryId = this.activatedRoute.snapshot.params['category_id']
            this.onNewCategory.emit( categoryId == 'all' ? { title: 'Все товары' } : this.categories.find(c => c.id == Number(categoryId)) )
        })

    )
  }

}
