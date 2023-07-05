import {
  AddProductCartAction,
  CartActionTypes,
  DeleteItemProductCartAction,
  DeleteProductCartAction,
} from '../actions/cart-actions';
import { Action } from '@ngrx/store';
import { CartItem } from 'src/app/models/cart-item';

const initialStateCart: Array<CartItem> = [];

export function cartReducer(
  state: Array<CartItem> = initialStateCart,
  action: Action
) {
  switch (action.type) {
    case CartActionTypes.ADD_PRODUCT_CART:
      const product = (action as AddProductCartAction).payload;
      const existingCartItemIndex = state.findIndex(
        (item) => item.id === product.id
      );
      const existingCartItem = state[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
          amount: Number(
            (existingCartItem.amount + existingCartItem.price).toFixed(2)
          ),
        };
        updatedItems = [...state];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const updatedItem = { ...product, quantity: 1, amount: product.price };
        updatedItems = state.concat(updatedItem);
      }
      return updatedItems;
    case CartActionTypes.DELETE_ITEM_PRODUCT_CART:
      const productId = (action as DeleteItemProductCartAction).payload;
      const existingCartItemIndexDelete = state.findIndex(
        (item) => item.id === Number(productId)
      );
      const existingItem = state[existingCartItemIndexDelete];
      let updatedItemsDeleteItem;

      if (existingItem) {
        if (existingItem.quantity === 1) {
          updatedItemsDeleteItem = state.filter(
            (item) => item.id !== Number(productId)
          );
        } else {
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
            amount: Number(
              (existingItem.amount - existingItem.price).toFixed(2)
            ),
          };
          updatedItemsDeleteItem = [...state];
          updatedItemsDeleteItem[existingCartItemIndexDelete] = updatedItem;
        }
        return updatedItemsDeleteItem; // REMOVE QUANTITY
      }
      return [...state];

    case CartActionTypes.DELETE_PRODUCT_CART:
      const productItemId = (action as DeleteProductCartAction).payload;
      return state.filter((item) => item.id !== Number(productItemId)); // REMOVE ITEM

    case CartActionTypes.CLEAR_CART:
      return initialStateCart; // CLEAR ALL
    default:
      return state;
  }
}
