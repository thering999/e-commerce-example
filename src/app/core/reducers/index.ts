import { MetaReducer, ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment'; // Angular CLI environment
import { AuthState, authReducer } from '../auth/_reducers/auth.reducers';




export interface AppState {
  // reducer interfaces
  auth: AuthState;
  // user: UsersState
}

export const reducers: ActionReducerMap<AppState> = {
  // reducers
  auth: authReducer,
  // user: userReducer
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze]: [];
