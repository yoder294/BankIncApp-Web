import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Product } from '../models/product';
import { AppState } from '../store/app.state';
import * as ProductActions from '../store/actions/product-actions';
import * as CartActions from '../store/actions/cart-actions';
import { Observable } from 'rxjs';
import { getAllCategoriesByProducts } from '../store/selectors/category.selector';
import {
  getAllProductsByCategories,
  getAllProductsByCategoriesAndTitle,
  getAllProductsSearchByTitle,
  getItemProductById,
} from '../store/selectors/product.selector';
import {
  getAllCountItemCart,
  getAmountTotalCart,
  getItemProductCartById,
  getQuantityTotalByProductId,
} from '../store/selectors/cart.selector';
import { CartItem } from '../models/cart-item';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  infoCart: any = {
    quantityItem: 0,
    amountTotal: 0,
  };

  products: Product[] = [];
  ListCategories: any[] = [];

  formCategories!: FormGroup;

  products$!: Observable<Array<Product>>;
  cartItem$!: Observable<Array<CartItem>>;
  productItem!: any;

  searchTitle: any;

  searchFormGroup!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.initFormGroup();

    const cartItem: any = this.store.select((store) => store.cartProducts);
    if (cartItem && cartItem.length > 0) {
    }

    this.store.dispatch(new ProductActions.RetrieveAllProductsAction());
    this.products$ = this.store.select((store) => store.mainProducts);
    this.products$;
    this.store
      .select(getAllCategoriesByProducts)
      .subscribe((response: any[]) => {
        this.ListCategories = response;
        this.initFormCategoriesGroup();
      });
  }

  initFormGroup() {
    return this.fb.group({
      searchText: ['', {}],
    });
  }

  initFormCategoriesGroup() {
    this.formCategories = this.fb.group({
      categories: this.fb.array(this.ListCategories.map((x) => false)),
    });
  }

  onChangeSearchPructByTitle() {
    const selectCategories = this.getSelectCategories();

    if (this.searchTitle && selectCategories && selectCategories.length > 0) {
      this.products$ = this.store.select(
        getAllProductsByCategoriesAndTitle(selectCategories, this.searchTitle)
      );
    } else if (selectCategories && selectCategories.length > 0) {
      this.products$ = this.store.select(
        getAllProductsByCategories(selectCategories)
      );
    } else {
      this.products$ = this.store.select(
        getAllProductsSearchByTitle(this.searchTitle ?? '')
      );
    }
  }

  onChangeCategories() {
    this.onChangeSearchPructByTitle();
  }

  getSelectCategories() {
    return this.formCategories?.value.categories
      .map((checked: any, i: any) =>
        checked ? this.ListCategories[i].id : null
      )
      .filter((v: any) => v !== null);
  }

  addItem(item: any) {
    this.store.dispatch(new CartActions.AddProductCartAction(item));
    this.getTotalsCartItem();
  }

  deleteItemQuantity(item: any) {
    this.store.dispatch(new CartActions.DeleteItemProductCartAction(item));
    this.getTotalsCartItem();
  }

  getAmountTotalByProduct(productId: any) {
    let nuuuu: number = 0;
    this.store
      .select(getQuantityTotalByProductId(productId))
      .subscribe((resp) => {
        nuuuu = resp;
      });
    return nuuuu;
  }

  getPrdouctById(id: number) {
    this.store.select(getItemProductCartById(id)).subscribe((res) => {
      if (res) {
        this.productItem = res;
      } else {
        this.store.select(getItemProductById(id)).subscribe((res) => {
          this.productItem = res;
        });
      }
    });
  }

  getTotalsCartItem() {
    this.store.select(getAllCountItemCart).subscribe((res) => {
      this.infoCart.quantityItem = res;
      this.store.select(getAmountTotalCart).subscribe((resAmount) => {
        this.infoCart.amountTotal = resAmount;
        this.sharedService.sendClickEvent({ ...this.infoCart });
      });
    });
  }

  onChangeSearch() {
    this.searchTitle = this.searchFormGroup.get('searchText')?.value;
    this.onChangeSearchPructByTitle();
  }

  get categories() {
    return this.formCategories.get('categories') as FormArray;
  }
}
