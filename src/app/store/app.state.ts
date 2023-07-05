import { CartItem } from "../models/cart-item";
import { Product } from "../models/product";

export interface AppState {
  readonly cartProducts: Array<CartItem>;
  readonly mainProducts: Array<Product>;
}
