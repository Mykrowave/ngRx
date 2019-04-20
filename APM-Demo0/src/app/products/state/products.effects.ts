import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import {
  LoadProducts,
  ProductActionType,
  LoadProductsSuccess,
  UpdateProduct,
  UpdateProductSuccess,
  UpdateProductFail
} from './products.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionType.LoadProducts),
    mergeMap((action: LoadProducts) =>
      this.productService
        .getProducts()
        .pipe(map((products: Product[]) => new LoadProductsSuccess(products)))
    )
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionType.UpdateProduct),
    map((action: UpdateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.updateProduct(product).pipe(
        map(updateProduct => new UpdateProductSuccess(updateProduct)),
        catchError(err => of(new UpdateProductFail(err)))
      )
    )


  )
}
