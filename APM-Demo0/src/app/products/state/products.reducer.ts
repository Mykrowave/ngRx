import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ProductAction,
  ProductActionType,
  ToggleProductCode,
  SetCurrentProduct,
  LoadProducts,
  LoadProductsSuccess,
  UpdateProductSuccess,
  UpdateProduct
} from './products.actions';
import { ProductService } from '../product.service';

// extend AppState because this module is lazy loaded
export interface AppState extends fromRoot.AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number;
  products: Product[];
}

const initalProductState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: []
};

/* SELECTORS */
const getProductFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(
  getProductFeatureState,
  productState => productState.showProductCode
);
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  productState => productState.currentProductId
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (productState, productId) => {
     if (productId === 0) {
       // need an initialized Product
       return {
         id: 0,
         productName: '',
         productCode: '',
         description: '',
         starRating: 0
       };
     } else {
       return productId ? productState.products.find(p => p.id === productId) : null;
     }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  productState => productState.products
);

/* REDUCER FUNCTION FOR NGRX */
export function reducer(
  state = initalProductState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case ProductActionType.ToggleProductCode:
      return {
        ...state,
        showProductCode: (<ToggleProductCode>action).payload
      };
    case ProductActionType.SetCurrentProduct:
      return {
        ...state,
        currentProductId: (<SetCurrentProduct>action).payload.id
      };
    case ProductActionType.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };
    case ProductActionType.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };
    case ProductActionType.LoadProductsSuccess:
      return {
        ...state,
        products: (<LoadProductsSuccess>action).payload
      };
    case ProductActionType.UpdateProductSuccess:
      const updatedProduct = (<UpdateProductSuccess>action).payload;
      const updatedProducts =
        state.products.map(product =>
            product.id === updatedProduct.id ? updatedProduct : product
        );
      return {
        ...state,
        products: updatedProducts
      };
    case ProductActionType.UpdateProductFail:
      // we would really have an err value here in the action payload.
     return state;
    default:
      return state;
  }
}
