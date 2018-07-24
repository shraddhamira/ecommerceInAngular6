import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../providers/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  frm: FormGroup;
  categories: any[] = [];

  constructor(private categoryService: CategoryService) {
    this.frm = new FormGroup({
      description: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getCategories();
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
        console.error(err);
      }
    )
  }

  addCategory() {
    this.categoryService.addCategory(this.frm.value).subscribe(
      (res) => {
        this.getCategories();
        this.frm.patchValue({ description: '' });
      },
      (err) => {
        console.error(err);
      }
    )
  }

  deleteCategory(key){
    this.categoryService.deleteCategory(key).subscribe(
      (res) => {
        this.getCategories();
      },
      (err) => {
        console.error(err);
      }
    )
  }

}
