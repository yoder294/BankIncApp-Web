import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const getAllCartItem = (state: AppState) => state.cartProducts;

export const getAmountTotalCart = createSelector(getAllCartItem, (items) => {
  const sumTotalAmount = items.reduce((accumulator, object) => {
    return accumulator + object.amount;
  }, 0);
  return sumTotalAmount.toFixed(2);
});

export const getAllCountItemCart = createSelector(getAllCartItem, (items) => {
  const sumTotal = items.reduce((accumulator, object) => {
    return accumulator +  object.quantity;
  }, 0);
  return sumTotal;
});

/*export const getAmountTotalByProductId = (productId: number) =>
  createSelector(getAllCartItem, (items) => {
    const item = items.find((a) => a.id === productId);
    return item ? (item.price * item.quantity).toFixed(2) : 0;
  });*/

export const getQuantityTotalByProductId = (productId: number) =>
  createSelector(getAllCartItem, (items) => {
    const item = items.find((a) => a.id === productId);
    return item ? item.quantity : 0;
  });

export const getItemProductCartById = (id: number) =>
  createSelector(getAllCartItem, (items) => {
    return items.filter((a) => a.id === id)[0];
  });
