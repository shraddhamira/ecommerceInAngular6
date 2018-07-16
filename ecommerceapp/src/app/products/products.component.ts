import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../providers/category.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../providers/product.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { CartService } from '../providers/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  tempProducts: any[] = [];

  constructor(private db: AngularFireDatabase, private routeParam: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    this.getCategories();
    this.productService.getData().subscribe(
      (res) => {
        let jsonRecord = res.json();
        let keys = Object.keys(jsonRecord);
        this.tempProducts = this.products = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] };
        })

        this.routeParam.queryParamMap.subscribe(
          (res) => {
            this.tempProducts = this.products.filter(product => {
              return res.get('category') === product.data.category;
            })
          },
          (err) => {
            console.log('The error is ', err)
          }
        );

        this.products = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] };
        })
      },
      (error) => {
        console.log("Record updated")
      }
    )
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        let keys = Object.keys(res);
        this.categories = keys.map(function (key) {
          return { key: key, data: res[key] }
        })
      },
      (err) => {
        console.error(err);
      }
    )
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

}
