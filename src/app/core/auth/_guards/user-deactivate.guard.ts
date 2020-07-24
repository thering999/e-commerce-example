
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { tap } from 'rxjs/internal/operators/tap';
import { isUserLoaded } from '../_selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class UserDeactivateGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
        return this.store
            .pipe(
                select(isUserLoaded),
                tap(isUserLoaded => {
                    if (isUserLoaded) {
                        this.router.navigateByUrl('/');
                        return false;

                    }
                })
            );
    }
}
