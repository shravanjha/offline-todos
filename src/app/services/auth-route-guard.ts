import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service'
@Injectable()
export class AuthGuardService implements CanActivate {

  signedIn: boolean = false;

  constructor(public router: Router, public authService: AuthService) {
    this.authService.getAuth().subscribe((data)=> {
        console.log('Auth GuardData received', data);
        if (data.authState && data.authState.loggedIn){
            this.signedIn = true;
          } else {
            this.signedIn =false
          }
      })
  }

  canActivate() {
    return this.signedIn;
  }
}