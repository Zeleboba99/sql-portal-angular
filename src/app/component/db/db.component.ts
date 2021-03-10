import { Component, OnInit } from '@angular/core';
import {DbService} from '../../service/db.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as sqljs from 'sql.js';
import * as alasql from 'alasql';
import * as XLSX from 'xlsx';
import alasql from 'alasql';
import {Database} from '../../model/database';
import {Table} from '../../model/table';

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
  constructor(private dbService: DbService,
              private activateRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.db_id = this.activateRoute.snapshot.queryParams['db_id'];
    this.dbService.getDbById(this.db_id).subscribe(res => {
      this.database = res;
      console.log(this.database);

      this.alaDb = this.createDb(this.database);
      console.log("create alaDb");
      console.log('alaDb', this.alaDb);
      // const mybase1 = new alasql.Database(this.database.name);
      //   console.log('mybase1', mybase1);
      //   mybase1.exec('CREATE TABLE example (a INT, b INT)');
      //   // insert();
      //   console.log('mybase1', mybase1);
      },
      error => {}
    );
  }

  private createDb(db: Database) {
    const alaDb = new alasql.Database(db.name);
    for (const table of db.tables) {
      this.createTable(alaDb, table);
    }
    return alaDb;
  }

  private createTable(alaDb: any, table: Table) {
    let query = 'CREATE TABLE ' + table.name + ' (';
    for (const field of table.fields) {
        query += field[0] + ' ' + field[1] + ',';
    }
    query = query.slice(0, -1);
    query += ');';
    // console.log('query', query);
    alaDb.exec(query);
    // console.log('alaDb', alaDb);
    this.insertIntoTable(alaDb, table.name, table.data);
  }

  private insertIntoTable(alaDb: any, tableName: string, rows: any[]) {
    console.log("tables", alaDb.tables[tableName]);
    const columns = alaDb.tables[tableName].columns;
    for (const row of rows) {
      let query = 'INSERT INTO ' + tableName + ' VALUES (';
      for (let i = 0; i < row.length; i++) {
        if (columns[i].dbtypeid == 'STRING') {
          query += "'" + row[i] + "',";
        } else {
          query += row[i] + ',';
        }
        // console.log("test", alaDb.tables);
      }
      query = query.slice(0, -1);
      query += ');';
      alaDb.exec(query);
    }
  }

  public getColumnNames(row) {
    return Object.keys(row);
  }

  public getRowValues(row) {
    return Object.values(row);
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

  // ex() {
  //
  //   this.alaDb.exec(this.test);
  //   console.log(this.alaDb);
  // }
}
