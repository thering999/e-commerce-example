import { User } from '../_models/user.model';
import { AuthActionTypes, AuthActions } from '../_actions/auth.actions'


export interface AuthState {
    loggedIn: boolean;
    authToken: string;
    isUserLoaded: boolean;
    user: User;
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    authToken: undefined,
    isUserLoaded: false,
    user: undefined
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login: {
            const _token: string = action.payload.authToken;
            return {
                loggedIn: true,
                authToken: _token,
                isUserLoaded: false,
                user: undefined
            };
        }


        case AuthActionTypes.Logout:
            return initialAuthState;

        case AuthActionTypes.UserLoaded: {
            const _user: User = action.payload.user;
            return {
                ...state,
                loggedIn: true,
                isUserLoaded: true,
                user: _user
            };
        }


        default:
            return state;
    }
}
