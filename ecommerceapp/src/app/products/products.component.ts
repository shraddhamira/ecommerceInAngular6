import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../providers/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../providers/product.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { CartService } from '../providers/cart.service';
import { NotificationService } from '../providers/NotificationService';
import { Observable } from 'rxjs';
import { NotificationType } from '../models/notiications.model';
import { Category } from '../models/category.model';
import { callNgModuleLifecycle } from '@angular/core/src/view/ng_module';
import { zip } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  tempProducts: any[] = [];
  defaultCategory: string = null;
  filter: any = {};

  constructor(private db: AngularFireDatabase, private routeParam: ActivatedRoute, private categoryService: CategoryService,
    private productService: ProductService, private route: ActivatedRoute, private cartService: CartService,
    private router: Router, private notiicationService: NotificationService) { }


  ngOnInit() {
    this.getCategories();
  }

  getProductsData() {
    this.productService.getDataO().subscribe((product) => {
      let keys = Object.keys(product);

      this.products = keys.map(function (key) {
        return { key: key, data: product[key] };
      });

      this.tempProducts = this.products.filter(product => {
        return this.categories[0].key === product.data.category;
      });
      return this.tempProducts;
    },
      (error) => {
        this.notiicationService.pushMessage("Error occurred while fetchig Products", NotificationType.Error);
      });
    this.routeParam.queryParamMap.subscribe(
      (res) => {
        if (res.get('category')) {
          this.tempProducts = this.products.filter(product => {
            return res.get('category') === product.data.category;
          });
        }
      },
      (err) => {
        this.notiicationService.pushMessage("Error occurred while fetchig selected Category", NotificationType.Error);
      }
    );
  }

  getCategories() {
    zip(this.categoryService.getCategoriesO(), (category: any[]) => {
      let keys = Object.keys(category);
      this.categories = keys.map(function (key) {
        return { key: key, data: category[key] }
      });
      this.defaultCategory = this.categories[0].key;
      return this.categories;
    }).subscribe((r) => {
      this.getProductsData();
    });
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    this.notiicationService.pushMessage("Product added to Cart", NotificationType.Success);
  }

  reloadData() {
    if (this.filter) {
      if (this.filter['productName']) {
        this.tempProducts = this.products.filter(product => {
          let productName = new String(product.data.title);
          return !productName.search(this.filter['productName']);
        });
      }
      if (this.filter['minAmount'] || this.filter['maxAmount']) {
        this.tempProducts = this.products.filter(product => {
          let amount = new Number(product.data.price);
          return this.filter['minAmount'] && amount > this.filter['minAmount'] && this.filter['maxAmount'] && amount <= this.filter['maxAmount'];
        });
      }
    }
    else {
      this.tempProducts = this.products.filter(product => {
        return this.defaultCategory === product.data.category;
      });
    }
  }
}
