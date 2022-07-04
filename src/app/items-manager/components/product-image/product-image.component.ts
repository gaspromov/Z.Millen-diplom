import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { Requests } from 'src/app/requests';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit, AfterViewInit {
   @Input('control') imgPathControl!: FormControl | AbstractControl

   apiUrl = environment.apiUrl;

   loading: boolean = false;

  constructor(
    private tools: ToolsService,
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private renderer: Renderer2,
    private eRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.updateBgImage();
  }

  onAddFile(e: any){
    let file = this.tools.getFormData( e )
    
    this.loading = true;
    this.spinner.show();

    this.http.request( Requests['uploadFile'], file )
      .pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.spinner.hide();
        })
      )
      .subscribe(
        res => {
          this.imgPathControl.setValue('/media/' + res.name)
          this.updateBgImage();
        }
      )
  }

  updateBgImage(){
    if ( !this.imgPathControl.value ) return
    let imgEl: HTMLElement = this.eRef.nativeElement.querySelector('.image')
    this.renderer.setStyle(imgEl, 'background-image', `url(${this.apiUrl + this.imgPathControl.value})`)
  }

}
