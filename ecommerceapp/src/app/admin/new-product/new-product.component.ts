import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../providers/product.service';
import { CategoryService } from '../../providers/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  private frm: FormGroup;
  private categories: any[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) {
    this.frm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  saveProduct() {
    this.productService.saveProduct(this.frm.value).subscribe(
      (res) => {
        this.router.navigate(['admin/products']);
      }, (err) => {
        console.error(err);
      }
    );
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
