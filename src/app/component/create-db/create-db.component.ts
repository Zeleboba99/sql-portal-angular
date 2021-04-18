import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {ExcelService} from '../../service/excel.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {DbService} from '../../service/db.service';
import * as alasql from 'alasql';
import alasql from 'alasql';
import {Database} from '../../model/database';
import {Table} from '../../model/table';

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
  tables = [];
  imgURL: any;
  schemaImageFile: any;
  error = '';

  constructor(private excelService: ExcelService,
              private dbService: DbService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
  }

  onFileSelect(event) {
    this.tables = [];
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);

      // if (file.includes(af, file.type)) {
      //   alert('Only EXCEL Docs Allowed!');
      // } else {
      this.fileInputLabel = file.name;
      this.fileUploadForm.get('myfile').setValue(file);
      // }
    }

    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, {type: 'binary'});
      console.log('wb', workbook);
      for (let sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        console.log('wsh', worksheet);
        var range = XLSX.utils.decode_range(worksheet['!ref']);
        console.log('range', range);

        const table = {
          name: undefined,
          fields: undefined,
          data: undefined
        };

        //read table name
        const table_name = this.readXlsxCell(worksheet, 0, 0);
        table.name = table_name;
        console.log('table name', table_name);

        //read columns
        table.fields = [];
        for (let col_ind = 0; col_ind <= range.e.c; col_ind++) {
          let cell = this.readXlsxCell(worksheet, col_ind, 1);
          const columnDescription = cell.split('|');
          table.fields.push([columnDescription[0], columnDescription[1]]);
          console.log('col name ', columnDescription[0]);
          console.log('col type and constraints ', columnDescription[1]);
        }

        //read records
        table.data = [];
        for (let row_ind = 2; row_ind <= range.e.r; row_ind++) {
          const record = [];
          for (let col_ind = 0; col_ind <= range.e.c; col_ind++) {
            let cell = this.readXlsxCell(worksheet, col_ind, row_ind);
            record.push(cell);
            console.log('cell', cell);
          }
          table.data.push(record);
        }
        this.tables.push(table);
      }
    };
  }

  onFormSubmit() {

    if (!this.fileUploadForm.get('myfile').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('file', this.fileUploadForm.get('myfile').value);
    formData.append('schemaImage', this.schemaImageFile);
    this.dbService.uploadDb(formData, this.db_name).subscribe(
      res => this.router.navigate(['/all-dbs']),
      error => console.log(error)
    );
  }

  onTestDb() {
    if (this.tables.length) {
      const alaDb = new alasql.Database('test');
      for (const table of this.tables) {
        this.excelService.createTable(alaDb, table);
      }
      console.log(alaDb);
    }
  }

  private readXlsxCell(worksheet, col, row) {
    const cell = worksheet[XLSX.utils.encode_cell({c: col, r: row})];
    return XLSX.utils.format_cell(cell);
  }

  onSchemaImageFileChanged($event: Event) {
    this.schemaImageFile = event.target.files[0];
    if (this.schemaImageFile.size > 1048576) {
      this.error = 'This file is so big';
      event.target.files[0] = null;
    }
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }
}
