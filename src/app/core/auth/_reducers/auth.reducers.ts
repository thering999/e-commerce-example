import { User } from '../_models/user.model';
import { AuthActionTypes, AuthActions } from '../_actions/auth.actions'


export interface AuthState {
    loggedIn: boolean;
    authToken: string;
    user: User;
    isUserLoaded: boolean;
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    authToken: undefined,
    user: undefined,
    isUserLoaded: false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login: {
            const _token: string = action.payload.authToken;
            const _user: User = action.payload.user;
            return {
                loggedIn: true,
                authToken: _token,
                user: _user,
                isUserLoaded: true
            };
        }

        case AuthActionTypes.Register: {
            return {
                loggedIn: true,
                authToken: undefined,
                user: undefined,
                isUserLoaded: false
            };
        }

        case AuthActionTypes.Logout:
            return initialAuthState;

        case AuthActionTypes.UserLoaded: {
            const _user: User = action.payload.user;
            return {
                ...state,
                user: _user,
                isUserLoaded: true,
                loggedIn: true,
            };
        }

        case AuthActionTypes.UserEdited: {
          const _user: User = action.payload.user;
          return {
            ...state,
            user: _user,
            isUserLoaded: true,
            loggedIn: true
          };
        }

        default:
            return state;
    }
}
