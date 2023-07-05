import { Action } from '@ngrx/store';
import { Product } from 'src/app/models/product';

export enum CartActionTypes {
  ADD_PRODUCT_CART = '[CART] Add Product',
  DELETE_PRODUCT_CART = '[CART] Delete Product',
  DELETE_ITEM_PRODUCT_CART = '[CART] Delete Item Product',
  CLEAR_CART = '[CART] Clear Cart',
}

export class AddProductCartAction implements Action {
  readonly type = CartActionTypes.ADD_PRODUCT_CART;
  constructor(public payload: Product) {}
}
export class DeleteProductCartAction implements Action {
  readonly type = CartActionTypes.DELETE_PRODUCT_CART;
  constructor(public payload: string) {}
}

export class DeleteItemProductCartAction implements Action {
  readonly type = CartActionTypes.DELETE_ITEM_PRODUCT_CART;
  constructor(public payload: string) {}
}

export class ClearCartAction implements Action {
  readonly type = CartActionTypes.CLEAR_CART;
  constructor() {}
}


export type CartActions = AddProductCartAction | DeleteProductCartAction | DeleteItemProductCartAction | ClearCartAction;
