import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import {
  LoadProducts,
  ProductActionType,
  LoadProductsSuccess
} from './products.actions';
import { map, mergeMap } from 'rxjs/operators';
import { Product } from '../product';
@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(ProductActionType.LoadProducts),
    mergeMap((action: LoadProducts) =>
      this.productService
        .getProducts()
        .pipe(map((products: Product[]) => new LoadProductsSuccess(products)))
    )
  );
}
