import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../providers/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private frm: FormGroup;
  private categories: any[] = [];

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
