import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { DataTableModule } from "angular-6-datatable";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { NotificationComponent } from './notification/notification.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Route } from '@angular/router';
import { OrderSucessComponent } from './order-sucess/order-sucess.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

//firebase start
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment.prod';
import { AuthService } from './providers/auth.service';
import { NewProductComponent } from './admin/new-product/new-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './providers/product.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './providers/category.service';
import { CategoriesComponent } from './admin/categories/categories.component';
import { CartService } from './providers/cart.service';
import { OrderService } from './providers/order.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
//firebase end
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    NotificationComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrderComponent,
    LoginComponent,
    OrderSucessComponent,
    NewProductComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    NgbModule.forRoot(), DataTableModule, AngularFireDatabaseModule, HttpModule, AngularFirestoreModule,
    RouterModule.forRoot([//{ path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'index.html', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'checkout', component: CheckOutComponent },
    { path: 'order-success', component: OrderSucessComponent },
    { path: 'my-orders', component: MyOrdersComponent },
    { path: 'admin/products', component: AdminProductsComponent },
    { path: 'admin/products/new', component: NewProductComponent },
    { path: 'admin/orders', component: AdminOrderComponent },
    { path: 'admin/categories', component: CategoriesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cart', component: ShoppingCartComponent },
    { path: 'check-out', component: CheckOutComponent }]),
    AngularFireModule.initializeApp(environment.firebase, 'ecommerce'),
    AngularFireAuthModule
  ],
  providers: [AuthService, ProductService, CategoryService, CartService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
