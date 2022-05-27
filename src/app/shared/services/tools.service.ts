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




}
