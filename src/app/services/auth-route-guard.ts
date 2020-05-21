import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Hub } from 'aws-amplify';
@Injectable()
export class AuthGuardService implements CanActivate {

  signedIn: boolean = false;

  constructor(public router: Router) {

    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.signedIn = true;
          break;
        case "signOut":
          this.signedIn = false;
          break;
        case "customOAuthState":
          this.signedIn = false;
      }
    });
  }

  canActivate() {
    return this.signedIn;
  }
}