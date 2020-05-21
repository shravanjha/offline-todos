import { Component, AfterContentInit } from '@angular/core';
//import { Events } from '@ionic/angular';
import {Subject} from 'rxjs';
import { AuthGuardService } from '../services/auth-route-guard'
import { AuthService } from '../services/auth.service'
import { Auth, Hub } from 'aws-amplify';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterContentInit{

  state = { user: null, customState: null };

  //private authState = new Subject<any>();
  // including AuthGuardService here so that it's available to listen to auth events

  constructor(){}

/*     this.authService.getAuth().subscribe((data)=> {
      console.log('Data received', data);
      this.authState = {loggedIn: false};
    }) */

  ngAfterContentInit(){
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.state.user = data;
          break;
        case "signOut":
          this.state.user = null;
          break;
        case "customOAuthState":
          this.state.customState = data;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => this.state.user = user)
      .catch(() => console.log("Not signed in"));
  }

/*   login() {
    this.authState.loggedIn = true;
    this.authService.setAuth({
      authState: this.authState
    });
  }

  logout() {
    this.authState.loggedIn = false;
    this.authService.setAuth({
      authState: this.authState
    });
  } */

}