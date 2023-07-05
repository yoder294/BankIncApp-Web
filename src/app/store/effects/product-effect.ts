import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import {
  ProductActionTypes,
  RetrieveAllProductsSuccessAction,
} from '../actions/product-actions';
import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionTypes.RETRIEVE_ALL_PRODUCTS),
      mergeMap(() =>
        this.service.getAllProducts().pipe(
          map((data) => {
            const products = data; 
            return new RetrieveAllProductsSuccessAction(products);
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: ProductService) {}
}
