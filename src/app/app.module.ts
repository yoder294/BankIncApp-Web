import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './home/home.component';
import { cartReducer } from './store/reducers/cart-reducer';
import { productsReducer } from './store/reducers/product.reducer';
import { StoreModule } from '@ngrx/store';
import { ProductEffects } from './store/effects/product-effect';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cart-detail', component: CartDetailComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CartDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    StoreModule.forRoot({
      cartProducts: cartReducer,
      mainProducts: productsReducer,
    }),

    EffectsModule.forRoot([ProductEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
