import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../providers/product.service';
import { CategoryService } from '../../providers/category.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
this.getProductData();
  }

  getProductData(){
    this.productService.getData().subscribe(
      (res) => {
        let jsonRecord = res.json();
        console.log(jsonRecord);
        let keys = Object.keys(jsonRecord);
        this.products = keys.map(function (key) {

          return { key: key, data: jsonRecord[key]['payload'] }
        });
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        let jsonRecord = res.json();
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

  deleteProduct(key){
    this.productService.deleteProduct(key).subscribe(
      (res) => {
        this.getProductData();
      },
      (err) => {
        console.error(err);
      }
    )
  }
}
