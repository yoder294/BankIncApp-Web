import { Action } from '@ngrx/store';

export enum ProductActionTypes {
  RETRIEVE_ALL_PRODUCTS = '[PRODUCT] Retrieve All Products',
  RETRIEVE_ALL_PRODUCTS_SUCCESS = '[PRODUCT] Retrieve All Products Success',
}

export class RetrieveAllProductsAction implements Action {
  readonly type = ProductActionTypes.RETRIEVE_ALL_PRODUCTS;
  constructor() {}
}

export class RetrieveAllProductsSuccessAction implements Action {
  readonly type = ProductActionTypes.RETRIEVE_ALL_PRODUCTS_SUCCESS;
  constructor(public payload: any) {}
}

export type ProductActions =
  | RetrieveAllProductsAction
  | RetrieveAllProductsSuccessAction;
