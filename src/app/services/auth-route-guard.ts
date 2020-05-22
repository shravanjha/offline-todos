import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Hub, Auth } from 'aws-amplify';
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
    //return (this.signedIn && this.hasActiveSession());
    return (this.signedIn);
  }

/*   hasActiveSession():boolean{
    try{
      Auth.currentAuthenticatedUser().then((userSession) => {
      if (userSession) {
        console.log('Active Session: '+ userSession)
        return true;
      } else {
        this.router.navigate(['/tabs/tab1'], {
          queryParams: {
            returnUrl: state.url
          }
        });
        return false;
      }
    });
  }
  catch(error){
    console.log('AuthGuardError: '+ error)
    this.router.navigate(['/tabs/tab1'], {
      queryParams: {
        returnUrl: state.url
      }
    });
    return false;
  }
  } */
}