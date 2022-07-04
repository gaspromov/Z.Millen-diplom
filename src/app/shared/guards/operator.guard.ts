import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class OperatorGuard implements CanActivate {
  constructor(
    private user: UserService,
    private router: Router
  ){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.user.user.pipe(take(1), map(u => u?.group == 2), tap(b => b ? null : this.router.navigate(['/catalog'])))
  }
  
}
