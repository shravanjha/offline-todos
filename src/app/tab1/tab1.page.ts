import { Component, AfterContentInit } from '@angular/core';
//import { Events } from '@ionic/angular';
import {Subject} from 'rxjs';
import { AuthGuardService } from '../services/auth-route-guard'
import { AuthService } from '../services/auth.service'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterContentInit{

  authState: any;
  //private authState = new Subject<any>();
  // including AuthGuardService here so that it's available to listen to auth events

  constructor(public authService: AuthService, public guard: AuthGuardService) {
    this.authService.getAuth().subscribe((data)=> {
      console.log('Data received', data);
      this.authState = {loggedIn: false};
    })
  }

  ngAfterContentInit(){
    this.authService.setAuth({
      authState: this.authState
    });
  }

  login() {
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
  }

}