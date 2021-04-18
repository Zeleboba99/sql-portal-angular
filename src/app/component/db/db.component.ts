import {Component, OnInit} from '@angular/core';
import {DbService} from '../../service/db.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as sqljs from 'sql.js';
import * as alasql from 'alasql';
import * as XLSX from 'xlsx';
import alasql from 'alasql';
import {Database} from '../../model/database';
import {Table} from '../../model/table';
import {ExcelService} from '../../service/excel.service';
import {error} from 'util';
import {DbInfo} from '../../model/db-info';

alasql.utils.isBrowserify = false;
alasql.utils.global.XLSX = XLSX;

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {

  public db_id;
  public database: Database;
  public alaDb = null;
  public inputQuery;
  public result = null;
  public queryExecutableError = null;
  test: any;
  private dbInfo: DbInfo;
  private isExpanded = false;

  constructor(private dbService: DbService,
              private excelService: ExcelService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.db_id = this.activateRoute.snapshot.queryParams['db_id'];
    this.dbService.getDbInfoById(this.db_id).subscribe(res => {
        this.dbInfo = res;
      },
      error => {

      });

    this.dbService.getDbById(this.db_id).subscribe(res => {
        this.database = res;
        console.log(this.database);

        this.alaDb = this.createDb(this.database);
        console.log('create alaDb');
        console.log('alaDb', this.alaDb);
        // const mybase1 = new alasql.Database(this.database.name);
        //   console.log('mybase1', mybase1);
        //   mybase1.exec('CREATE TABLE example (a INT, b INT)');
        //   // insert();
        //   console.log('mybase1', mybase1);
      },
      error => {
      }
    );
  }

  private createDb(db: Database) {
    const alaDb = new alasql.Database(db.name);
    for (const table of db.tables) {
      this.excelService.createTable(alaDb, table);
    }
    return alaDb;
  }

  public getColumnNames(row) {
    return Object.keys(row);
  }

  public getRowValues(row) {
    console.log(Object.values(row));
    return Object.values(row).map(r => {
      return r === undefined ? 'NULL' : r;
    });
  }

  onExecuteClick(inputQuery) {
    try {
      this.result = this.alaDb.exec(inputQuery);
      this.queryExecutableError = null;
      console.log('result ', this.result);
    } catch (ex) {
      const e: Error = ex;
      this.queryExecutableError = e.message;
      this.result = null;
      console.log('catches exception in execute query ', ex);
    }
  }

  onResizeSchema(event) {
    this.isExpanded = !this.isExpanded;
    let element = null;
    if (event.target.parentNode.classList.contains('container')) {
      element = event.target.parentNode;
    } else {
      element = event.target.parentNode.parentNode;
    }
    this.isExpanded ? element.style.width = '100%' : element.style.width = '50%';
  }
}
