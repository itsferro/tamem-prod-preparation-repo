import type { ActionReducerMap } from '@ngrx/store'

// export * from './app.actions';
// export * from './app.reducer';
// export * from './app.effects';
// export * from './app.selectors';
// export * from './app.state';


import {
  authenticationReducer,
  type AuthenticationState,
} from './authentication/authentication.reducer'

export type RootReducerState = {
  authentication: AuthenticationState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  authentication: authenticationReducer,
}
