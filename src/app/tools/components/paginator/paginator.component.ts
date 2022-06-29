import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit , OnChanges {
  // общее количество айтемов
  @Input('length') itemsCount!: number
  
  // количество айтемов на странице
  @Input('pageSize') countOnPage!: number

  @Input() showFirstLastBtns: boolean = false;
  @Input() disable: boolean = false;

  currentPage: number = 1;
  pageCount: number = 1;
  pageNums: number[] = [];

  @Output() onChangePage = new EventEmitter<number>()


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    // получаем номер страницы
    let queryDataPage = this.activatedRoute.snapshot.queryParams['page']
    this.currentPage = Number(queryDataPage) || 1

    // если страница не установлена - устанавливаем сами
    if ( !queryDataPage || !Number(queryDataPage) )
        this.setPage(1)
  }

  ngOnInit(): void {
    if ( this.currentPage != 1 )
      this.onChangePage.emit()
    
    this.pageCount = this.getCountOfPages();
    if ( this.currentPage > this.pageCount )
      this.setPage(this.pageCount)

    this.onChangePage.emit(this.currentPage)
  }

  // слушаем изменения количества айтемов
  ngOnChanges( e: SimpleChanges ){
    if ( e['itemsCount'] && !e['itemsCount'].firstChange ){
      this.pageCount = this.getCountOfPages();
      if ( this.currentPage > this.pageCount )
        this.setPage(this.pageCount)
    }
  }


  // устанавливаем текущую страницу
  setPage( pageNum: number ){
    this.currentPage = pageNum;
    this.onChangePage.emit( this.currentPage )
    this.router.navigate([], { queryParams: { ...this.activatedRoute.snapshot.queryParams, page: this.currentPage } })
  }

  // считаем количество страниц
  getCountOfPages(){
    let pageCount = Math.ceil( this.itemsCount/this.countOnPage )
    this.pageNums = [];
    while ( pageCount != 0 ){
      this.pageNums.unshift( pageCount )
      pageCount--;
    }

    return Math.ceil( this.itemsCount/this.countOnPage )
  }

  moveToNextPage(){
    if ( this.currentPage + 1 > this.pageCount ) return;
    this.setPage(this.currentPage + 1);
  }

  moveToPrevPage(){
    if ( this.currentPage - 1 < 1 ) return;
    this.setPage( this.currentPage - 1 );
  }

  moveToFirstPage(){
    if ( this.currentPage == 1 ) return;
    this.setPage(1)
  }

  moveToLastPage(){
    if ( this.currentPage == this.pageCount ) return;
    this.setPage( this.pageCount )
  }
}
