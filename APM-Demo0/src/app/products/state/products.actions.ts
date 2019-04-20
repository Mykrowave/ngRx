import { Action } from '@ngrx/store';
import { Product } from '../product';

/* Action Types */

export enum ProductActionType {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product',
  LoadProducts = '[Product] Load Products',
  LoadProductsSuccess = '[Product] Load Products Success',
  LoadProductsFail = '[Product] Load Products Fail',
  UpdateProduct = '[Product] Update Product',
  UpdateProductSuccess = '[Product] Update Product Success',
  UpdateProductFail = '[Product] Update Product Fail',

}

/* Action Creators */

export class ToggleProductCode implements Action {
  type = ProductActionType.ToggleProductCode;
  constructor(public payload: boolean) {
  }
}
export class SetCurrentProduct implements Action {
  type = ProductActionType.SetCurrentProduct;
  constructor(public payload: Product) {
  }
}
export class ClearCurrentProduct implements Action {
  type = ProductActionType.ClearCurrentProduct;
}
export class InitCurrentProduct implements Action {
  type = ProductActionType.InitializeCurrentProduct;
}
export class LoadProducts implements Action {
  type = ProductActionType.LoadProducts;
}
export class LoadProductsSuccess implements Action {
  type = ProductActionType.LoadProductsSuccess;
  constructor(public payload: Product[]) {}
}
export class LoadProductsFail implements Action {
  type = ProductActionType.LoadProductsFail;
  constructor(public payload: string) {}
}
export class UpdateProduct implements Action {
  type = ProductActionType.UpdateProduct;
  constructor(public payload: Product) {}
}
export class UpdateProductSuccess implements Action {
  type = ProductActionType.UpdateProductSuccess;
  constructor(public payload: Product) {}
}
export class UpdateProductFail implements Action {
  type = ProductActionType.UpdateProductFail;
  constructor(public payload: string) {}
}

/* Union Type */
export type ProductAction = ToggleProductCode |
                            SetCurrentProduct |
                            ClearCurrentProduct |
                            InitCurrentProduct |
                            LoadProducts |
                            LoadProductsSuccess |
                            LoadProductsFail |
                            UpdateProduct |
                            UpdateProductSuccess |
                            UpdateProductFail;
