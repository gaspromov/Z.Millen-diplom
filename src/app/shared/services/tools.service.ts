import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  
  generateNotification( message: string, isError: boolean, height: boolean = false ){
    let wrapper = document.createElement('div')

    wrapper.innerText = message;
    wrapper.classList.add('notification');
    wrapper.classList.add( isError ? 'error' : 'success' )
    height ? wrapper.classList.add('publish-height') : {}

    let notifBlock = document.querySelector('#notifications-block');

    notifBlock?.appendChild( wrapper );
    setTimeout(() => {
      wrapper.classList.add('show')
    }, 100);

    setTimeout(() => {
      wrapper.classList.remove('show')
    }, 5100);

    setTimeout(() => {
      wrapper.remove();
    }, 5600);
  }

  removeNotifications(){
    document.querySelectorAll('#acc-selector-block .notification').forEach( n => n.remove())
  }


  getFormData( event: any, file?: File ): FormData | null{
    if ( event ){
      let target = event.target || event.srcElement;
      if ( !target?.files[0] )
        return null;
      file = target.files[0];
    }
    
    let formData: FormData = new FormData();

    if ( file )
      formData.set('uploadedFile', file, file?.name ? this.getValidFileName(file.name) : 'name' );

    return file ? 
    formData : null;
  }


  getValidFileName(name: string){
    return name.split(' ').join('').split('(').join('').split(')').join('');
  }

}
