import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserAction, UserActionType } from './user.actions';

export interface UserState {
  userNameMasked: boolean;
}


const initialUserState: UserState = {
  userNameMasked: false
};


/* SELECTORS */
// Feature Selector
const getUserFeatureState = createFeatureSelector<UserState>('user');

// Composed Selectors
export const getUserNameMasked = createSelector(getUserFeatureState, u => u.userNameMasked);

export function reducer(state = initialUserState, action: UserAction): UserState {

  switch (action.type) {
    case UserActionType.ToggleMaskUserName:
      return {
        ...state,
        userNameMasked: action.payload
      };
    default:
      return state;
  }
}
