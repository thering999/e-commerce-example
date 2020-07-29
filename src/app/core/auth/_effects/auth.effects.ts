// Angular
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
// RxJS
import { filter, mergeMap, tap, withLatestFrom } from "rxjs/operators";
import { defer, Observable, of } from "rxjs";
// NGRX
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";

import {
  Login,
  UserRequested,
  AuthActionTypes,
  Logout,
  UserLoaded,
} from "../_actions/auth.actions";
import { AuthService } from "../_service/auth.service";
import { AppState } from "../../reducers";
import { isUserLoaded } from "../_selectors/auth.selectors";



@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    tap((action) => {
      localStorage.setItem("token", action.payload.authToken);
      this.store.dispatch(new UserRequested())
      // this.router.navigate(['/cart'], {queryParams: {returnUrl: this.returnUrl}});
    })
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
      ofType<Logout>(AuthActionTypes.Logout),
      tap(() => {
          localStorage.removeItem("token");
          this.router.navigate([''], {queryParams: {returnUrl: this.returnUrl}});
      })
  );


  @Effect({dispatch: false})
  loadUser$ = this.actions$.pipe(
    ofType<UserRequested>(AuthActionTypes.UserRequested),
    withLatestFrom(this.store.pipe(select(isUserLoaded))),
    filter(([action, _isUserLoaded]) => !_isUserLoaded),
    mergeMap(([action, _isUserLoaded]) => this.auth.getUserByToken()),
    tap((_user) => {
      if (_user) {
        this.store.dispatch(new UserLoaded({ user: _user }));
      } else {
        this.store.dispatch(new Logout());
      }
    })
  );

  @Effect()
  init$: Observable<Action> = defer(() => {
    const userToken = localStorage.getItem("token");
    let observableResult = of({ type: "NO_ACTION" });
    if (userToken) {
      observableResult = of(new UserRequested());
    }
    return observableResult;
  });

  private returnUrl: string;

  constructor(
    private actions$: Actions,
    private router: Router,
    private auth: AuthService,
    private store: Store<AppState>
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
      }
    });
  }
}
