import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// extend AppState because this module is lazy loaded
export interface AppState extends fromRoot.AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initalProductState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

/* SELECTORS */
const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(getProductFeatureState, productState => productState.showProductCode);
export const getCurrentProduct = createSelector(getProductFeatureState, productState => productState.currentProduct);
export const getProducts = createSelector(getProductFeatureState, productState => productState.products);


/* REDUCER FUNCTION FOR NGRX */
export function reducer(state = initalProductState, action): ProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload
      };
    default:
      return state;
  }
}
