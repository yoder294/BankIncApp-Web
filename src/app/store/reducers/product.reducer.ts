import { Product } from 'src/app/models/product';
import { ProductActionTypes, ProductActions, RetrieveAllProductsSuccessAction } from '../actions/product-actions';
import { Action } from '@ngrx/store';

const initialStateProducts: Array<Product> = [];

export function productsReducer(
  state: Array<Product> = initialStateProducts,
  action: Action
) {
  
  switch (action.type) {
    case ProductActionTypes.RETRIEVE_ALL_PRODUCTS_SUCCESS:
      return  (action as RetrieveAllProductsSuccessAction).payload;
    default:
      return state;
  }
}
