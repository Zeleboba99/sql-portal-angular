import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../../service/excel.service';
import * as sqljs from 'sql.js';
import * as alasql from 'alasql';
import * as XLSX from 'xlsx';
import alasql from 'alasql';

alasql.utils.isBrowserify = false;
alasql.utils.global.XLSX = XLSX;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private excelService: ExcelService) { }
  downloadedExcel: any;

  blob: Blob;
  url: string;

  ngOnInit() {
    this.excelService.downloadExcelDB(1).subscribe(
      result => {

        const u8 = new Uint8Array(result);
        const wb: XLSX.WorkBook = XLSX.read(u8, {type: 'array'});
        const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, {header: 1});
        console.log('json is', json);
        // const wb = XLSX.read(result, { type: "binary" });
        console.log(wb);
        const mybase1 = new alasql.Database();
        console.log(mybase1.exec('select * from xlsx("Book1.xlsx",{sheetid:"Лист1"})'));

      }
    );
    const mybase = new alasql.Database();
    mybase.exec('CREATE TABLE one (two INT, three INT)');
    var res = mybase.exec("SELECT * FROM one");
    console.log('before insert ', res);

    mybase.exec('INSERT INTO one (?,?)',[5,6]);

    var res = mybase.exec("SELECT * FROM one");
    console.log('after insert ', res);
    // mybase.exec('SELECT * INTO XLSX("restest280b.xlsx") FROM ?', [mybase]);

    // var insert = mybase.compile('INSERT INTO one (1,2)');
    // insert();

    var data = [{a:1,b:10}, {a:2,b:20}, {a:1,b:30}];
    var res = alasql('SELECT a, SUM(b) AS b FROM ? GROUP BY a',[data]);
    console.log(res);

    // var data1 = [{ a: 1, b: 10 }, { a: 2, b: 20 }];
    // var data2 = [{ a: 100, b: 10 }, { a: 200, b: 20 }];
    // var opts = [{ sheetid: 'Good', header: true }, { sheetid: 'Two', header: false }];
    // var res = alasql('SELECT INTO XLSX("MyAwesomeData.xlsx",?) FROM ?', [opts, [data1, data2]]);

    // const SQL =  sqljs.initSqlJs({
    //   // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
    //   // You can omit locateFile completely when running in node
    //   locateFile: file => `https://sql.js.org/dist/${file}`
    // });
    // var db = new sqljs.Database();
    const a =1;
  }

  onSqlJsClick() {


  }

  onDownloadDB() {
    this.excelService.downloadExcelDB(0)
    //   .subscribe(
    //   res => {const blob = new Blob([res.blob()], { type : 'application/vnd.ms.excel' });
    //     const file = new File([blob], 'Книга1' + '.xlsx', { type: 'application/vnd.ms.excel' });
    //     // saveAs(file);
    //   },
    //   error => console.log(error)
    // );
      .subscribe(data => {
      if (data != null)
      {
        // this.blob = new Blob([data._body], { type: 'application/vnd.ms-excel' });
        const file = new File([this.blob], 'report.xlsx', { type: 'application/vnd.ms-excel' });
        console.log(this.blob);
        console.log(file);
        this.url = window.URL.createObjectURL(file);
        window.open(this.url);
      }
    });
  }
}
