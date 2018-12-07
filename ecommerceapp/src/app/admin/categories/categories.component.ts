import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../providers/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../providers/NotificationService';
import { NotificationType } from '../../models/notiications.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  frm: FormGroup;
  categories: any[] = [];
categoryKey : string;
  constructor(private categoryService: CategoryService, private notificationService : NotificationService) {
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
        this.notificationService.pushMessage("Error occurred while fetching categories",NotificationType.Error);
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
        this.notificationService.pushMessage("Error occurred while adding categories",NotificationType.Error);
      }
    )
  }

  deleteCategory(key){
    this.categoryService.deleteCategory(key).subscribe(
      (res) => {
        this.getCategories();
      },
      (err) => {
        this.notificationService.pushMessage("Error occurred while deleting category",NotificationType.Error);
      }
    )
  }

  editCategory(key, description){
    this.categoryKey = key;
    this.frm.patchValue({ description: description });
  }

  updateCategory(){
    this.categoryService.updateCategory(this.categoryKey,this.frm.value).subscribe(
      (res) => {
        this.getCategories();
        this.categoryKey = '';
        this.frm.patchValue({ description: '' });
      },
      (err) => {
        this.notificationService.pushMessage("Error occurred while updating category",NotificationType.Error);
      }
    )
  }
}

