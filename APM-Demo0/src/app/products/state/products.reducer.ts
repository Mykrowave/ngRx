import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductAction, ProductActionType, ToggleProductCode, SetCurrentProduct,
         LoadProducts, LoadProductsSuccess } from './products.actions';

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
export function reducer(state = initalProductState, action: ProductAction): ProductState {
  switch (action.type) {
    case ProductActionType.ToggleProductCode:
      return {
        ...state,
        showProductCode: (<ToggleProductCode>action).payload
      };
    case ProductActionType.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...(<SetCurrentProduct>action).payload }
      };
      case ProductActionType.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };
      case ProductActionType.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
      };
      case ProductActionType.LoadProductsSuccess:
      return {
        ...state,
        products: (<LoadProductsSuccess>action).payload
      }
    default:
      return state;
  }
}
