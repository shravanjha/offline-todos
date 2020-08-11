import { Injectable } from '@angular/core';
import { Observable, of, from as fromPromise, BehaviorSubject } from 'rxjs';

import { map, tap, catchError } from 'rxjs/operators';
import { Auth, Hub } from 'aws-amplify';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: BehaviorSubject<boolean>;

  /** get authenticat state */
  public isAuthenticated(): Observable<boolean> {
    return fromPromise(Auth.currentAuthenticatedUser())
      .pipe(
        map(result => {
          this.loggedIn.next(true);
          return true;
        }),
        catchError(error => {
          this.loggedIn.next(false);
          return of(false);
        })
      );
  }
}