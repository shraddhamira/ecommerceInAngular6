import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../providers/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../providers/product.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { CartService } from '../providers/cart.service';
import { NotificationService } from '../providers/NotificationService';
import { Observable } from 'rxjs';
import { NotificationType } from '../models/notiications.model';

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
  constructor(private db: AngularFireDatabase, private routeParam: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute, private cartService: CartService,
    private router: Router, private notiicationService : NotificationService) { }

  ngOnInit() {
    this.getCategories();
    this.productService.getData().subscribe(
      (res) => {
        let jsonRecord = res.json();
        let keys = Object.keys(jsonRecord);
        if (this.defaultCategory) {
          this.router.navigate(['products'], { queryParams: { category: this.defaultCategory } });
        }
        else {
          this.tempProducts = this.products = keys.map(function (key) {
            return { key: key, data: jsonRecord[key] };
          });
        }

        this.routeParam.queryParamMap.subscribe(
          (res) => {
            this.tempProducts = this.products.filter(product => {
              return res.get('category') === product.data.category;
            })
          },
          (err) => {
            this.notiicationService.pushMessage("Error occurred while fetchig selected Category",NotificationType.Error);
          }
        );

        this.products = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] };
        })
      },
      (error) => {
        this.notiicationService.pushMessage("Error occurred while fetchig Products",NotificationType.Error);
      }
    )
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        let jsonRecord = res.json();
        let keys = Object.keys(jsonRecord);
        this.categories = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] }
        });
        this.defaultCategory = this.categories[0].key;
      },
      (err) => {
        this.notiicationService.pushMessage("Error occurred while fetchig Categories",NotificationType.Error);
      }
    )
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    this.notiicationService.pushMessage("Product added to Cart",NotificationType.Success);
  }

}
