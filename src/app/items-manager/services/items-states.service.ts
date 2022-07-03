import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take, tap } from 'rxjs';
import { Category } from 'src/app/catalog/interfaces/category';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsStatesService {
  categories: Category[] = [];

  constructor(
    private http: HttpService
  ) { }

  getCategories(): Observable<Category[]>{
    let subj = new Subject<Category[]>();
    
    if ( this.categories.length > 0 )
      return new BehaviorSubject(this.categories).asObservable();

    this.http.request(Requests['getCategories'])
      .pipe(take(1), tap(d => this.categories = d))
      .subscribe(
        res => subj.next(this.categories)
      )

    return subj.asObservable()
  }
}
