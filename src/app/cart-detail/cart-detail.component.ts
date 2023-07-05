import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getAllCartItem, getAllCountItemCart, getAmountTotalCart } from '../store/selectors/cart.selector';
import { CartItem } from '../models/cart-item';
import * as CartActions from '../store/actions/cart-actions';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css'],
})
export class CartDetailComponent implements OnInit {
  infoCart: any = {
    quantityItem: 0,
    amountTotal: 0,
  };

  disabledBtn: boolean = true;
  listProductItems?: CartItem[] = [];

  constructor(private store: Store<AppState>, private route: Router) {}

  ngOnInit(): void {
    this.getAllItemsCart();
    this.getTotalsCartItem();
  }

  getTotalsCartItem() {
    this.store.select(getAllCountItemCart).subscribe((res) => {
      this.infoCart.quantityItem = res;
      this.store.select(getAmountTotalCart).subscribe((resAmount) => {
        this.infoCart.amountTotal = resAmount;
      });
    });
  }

  getAllItemsCart() {
    this.store.select(getAllCartItem).subscribe((response) => {
      this.listProductItems = response;
    });
  }

  addItem(item: any) {
    this.store.dispatch(new CartActions.AddProductCartAction(item));
    this.ngOnInit();
  }

  deleteItemQuantity(item: any) {
    this.store.dispatch(new CartActions.DeleteItemProductCartAction(item));
    this.ngOnInit();
  }

  deleteItemCart(id: any) {
    this.store.dispatch(new CartActions.DeleteProductCartAction(id));
    this.ngOnInit();
  }

  generatedBuy() {
    this.store.dispatch(new CartActions.ClearCartAction());
    this.route.navigate(['/home']);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Compra realizada con exito!.',
      showConfirmButton: false,
      timer: 1800,
    });
  }

  isDisabledBtn() { 
    return !(this.listProductItems && this.listProductItems.length > 0);
  }
}
