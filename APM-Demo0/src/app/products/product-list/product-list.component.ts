import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Subject, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/products.reducer';
import {
  ToggleProductCode,
  InitCurrentProduct,
  SetCurrentProduct,
  LoadProducts
} from '../state/products.actions';
import { takeUntil, takeWhile, finalize } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];
  componentActive = true;
  // Used to highlight the selected product in the list
  selectedProduct: Product | null;



  constructor(
    private productService: ProductService,
    private store: Store<fromProduct.AppState>
  ) {}

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );

    // TODO Unsubscribe
    this.store
      .pipe(
        select(fromProduct.getCurrentProduct),
        takeWhile(() => this.componentActive)
      )
      .subscribe(currentProduct => (this.selectedProduct = currentProduct));

    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );

    this.store
      .pipe(
        select(fromProduct.getShowProductCode),
        takeWhile(() => this.componentActive)
      )
      .subscribe(showProductCode => (this.displayCode = showProductCode));

    // raise Action to Load Products
    this.store.dispatch(new LoadProducts());

    // listen for Actions to Load Products
    this.store
      .pipe(
        select(fromProduct.getProducts),
        takeWhile(() => this.componentActive),
      )
      .subscribe(products => (this.products = products));

    // listen for the loadsuccess
  }

  ngOnDestroy(): void {
    // console.log('destroy');
    this.componentActive = false;
    // setTimeout(() => {console.log('close: ' + this.testSub$.closed); }, 2000);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new ToggleProductCode(value));
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new InitCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(new SetCurrentProduct(product));
  }
}
