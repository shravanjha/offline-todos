import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Auth, Hub } from 'aws-amplify';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new Subject<any>();

  setAuth(data: any) {
      this.authState.next(data);
  }

  getAuth(): Subject<any> {
      return this.authState;
  }
}