import { Action } from '@ngrx/store';


// enums
export enum UserActionType {
  ToggleMaskUserName = '[User] Mask User Name'
}


// action creator
export class ToggleMaskUserName implements Action {
  type = UserActionType.ToggleMaskUserName;
  constructor(public payload: boolean){}
}

// Union Type

export type UserAction = ToggleMaskUserName;
