import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../providers/product.service';
import { CategoryService } from '../../providers/category.service';
import { NotificationType } from '../../models/notiications.model';
import { NotificationService } from '../../providers/NotificationService';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService,
  private notificationService : NotificationService) { }

  ngOnInit() {
    this.getCategories();
    this.getProductData();
  }

  getProductData() {
    this.productService.getData().subscribe(
      (res) => {
        let jsonRecord = res.json();
        let keys = Object.keys(jsonRecord);
        this.products = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] }
        });
      },
      (err) => {
        this.notificationService.pushMessage("Error occurred while fetching products",NotificationType.Error);
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
        })
      },
      (err) => {
        this.notificationService.pushMessage("Error occurred while fetching categories",NotificationType.Error);
      }
    )
  }

  deleteProduct(key) {
    this.productService.deleteProduct(key).subscribe(
      (res) => {
        this.getProductData();
      },
      (err) => {
        this.notificationService.pushMessage("Error occurred while deleting Product",NotificationType.Error);
      }
    )
  }
}
