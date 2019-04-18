import { createFeatureSelector, createSelector } from "@ngrx/store";

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

export function reducer(state = initialUserState, action): UserState {

  switch (action.type) {
    case 'TOGGLE_MASK_USERNAME':
      return {
        ...state,
        userNameMasked: action.payload
      };
    default:
      return state;
  }
}
