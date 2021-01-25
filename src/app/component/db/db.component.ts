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
  constructor(private dbService: DbService,
              private activateRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.db_id = this.activateRoute.snapshot.queryParams['db_id'];
    this.dbService.getDbById(this.db_id).subscribe(res => {
      this.database = res;
      console.log(this.database);

      this.createDb(this.database);
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
    for (let table of db.tables) {
      this.createTable(alaDb, table);
    }
  }

  private createTable(alaDb: any, table: Table) {
    let query = 'CREATE TABLE ' + table.name + ' (';
    console.log('table.fields', Object.entries(table.fields));
    for (let field of Object.entries(table.fields)) {
      query += field[0] + ' ' + field[1] + ',';
    }
    query = query.slice(0, -1);
    query += ');';
    console.log('query', query);
    alaDb.exec(query);
    console.log('alaDb', alaDb);

  }

}
