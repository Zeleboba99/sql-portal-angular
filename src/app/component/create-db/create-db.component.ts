import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {ExcelService} from '../../service/excel.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {DbService} from '../../service/db.service';

@Component({
  selector: 'app-create-db',
  templateUrl: './create-db.component.html',
  styleUrls: ['./create-db.component.css']
})
export class CreateDbComponent implements OnInit {
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  private db_name = '';
  file: any = null;

  constructor(private excelService: ExcelService,
              private dbService: DbService,
              private formBuilder: FormBuilder,
              private router: Router) { }
  ngOnInit() {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
  }

  onFileSelect(event) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

      // if (file.includes(af, file.type)) {
      //   alert('Only EXCEL Docs Allowed!');
      // } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);
      // }
    }
  }

  onFormSubmit() {

    if (!this.fileUploadForm.get('myfile').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('file', this.fileUploadForm.get('myfile').value);
    this.dbService.uploadDb(formData, this.db_name).subscribe(
      res => this.router.navigate(['/all-dbs']),
      error => console.log(error)
    );
  }
}
