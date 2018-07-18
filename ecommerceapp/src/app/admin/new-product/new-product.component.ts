import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../providers/product.service';
import { CategoryService } from '../../providers/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  frm: FormGroup;
  categories: any[] = [];
productKey : string;
  constructor(private productService: ProductService, private categoryService: CategoryService,
    private router: Router, private routeParam: ActivatedRoute) {
    this.frm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getCategories();
    this.routeParam.queryParamMap.subscribe(
      (res) => {
        this.productKey = res.get('productKey')
        if (this.productKey) {
          this.productService.getProductByKey(this.productKey).subscribe(
            (res) => {
              let jsonRecord = res.json();
              this.frm.patchValue({
                title: jsonRecord.title, price: jsonRecord.price,
                category: jsonRecord.category, imageUrl: jsonRecord.imageUrl
              })
            }
          )
        }
      },
      (error) => {

      }
    )


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
        let jsonRecord = res.json()
        let keys = Object.keys(jsonRecord);
        this.categories = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] }
        })
      },
      (err) => {
        console.error(err);
      }
    )
  }

  updateProduct() {
    this.productService.updateProduct(this.productKey,this.frm.value).subscribe(
      (res) => {
        this.router.navigate(['admin/products']);
      }, (err) => {
        console.error(err);
      }
    );
  }
}

