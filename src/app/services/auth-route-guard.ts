import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import { Auth } from 'aws-amplify';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor( private router: Router ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return Auth.currentAuthenticatedUser().then((userSession) => {
      if (userSession) {
        return true;
      } else {
        this.router.navigate(['/tabs/tab1'], {
          queryParams: {
            returnUrl: state.url
          }
        });
        return false;
      }
     })
      .catch(() => {
        this.router.navigate(['/tabs/tab1'], {
          queryParams: {
            returnUrl: state.url
          }
        });
        return false;
      });
  }
}