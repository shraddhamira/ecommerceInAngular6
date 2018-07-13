import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../providers/product.service';
import { CategoryService } from '../../providers/category.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  private products: any[] = [];
  private categories : any[]=[];

  constructor(private productService: ProductService, private categoryService : CategoryService) { }

  ngOnInit() {
    this.getCategories();
    this.productService.getData().subscribe(
      (res) => {
        console.log(res);
        let keys = Object.keys(res);
        this.products = keys.map(function (key) {
          return { key: key, data: res[key] }
        })
      },
      (err) => {
        console.log(err);
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

}
