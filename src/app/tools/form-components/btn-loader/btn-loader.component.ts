import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-btn-loader',
  templateUrl: './btn-loader.component.html',
  styleUrls: ['./btn-loader.component.scss']
})
export class BtnLoaderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() text: string = '';
  @Input() loading: boolean = false;

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnChanges(){
    if ( this.loading )
      this.spinner.show();
    else this.spinner.hide()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.spinner.hide();
  }


}
