import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions, ResponseContentType} from '@angular/http';
import * as XLSX from 'xlsx';
import {Table} from '../model/table';

@Injectable()
export class ExcelService {

  private base_url = '/api';
  constructor(private http: HttpClient) { }

  // uploadExcelDB(uploadExcel: any) {
  //   return this.http.post(this.base_url + '/uploadDB', uploadExcel);
  // }
  //
  // downloadExcelDB(id: number) {
  //   let options = new RequestOptions({responseType: ResponseContentType.Blob });
  //   let headers = new HttpHeaders({
  //     'Authorization': 'Bearer '
  //   });
  //   return this.http.get(this.base_url + '/downloadDB/' + id, {headers: headers, responseType: 'arraybuffer'});
  // }

  createTable(alaDb: any, table: Table) {
    let query = 'CREATE TABLE ' + table.name + ' (';
    for (const field of table.fields) {
      query += field[0] + ' ' + field[1] + ',';
    }
    query = query.slice(0, -1);
    query += ');';
    alaDb.exec(query);
    this.insertIntoTable(alaDb, table.name, table.data);
  }

  private insertIntoTable(alaDb: any, tableName: string, rows: any[]) {
    console.log('tables', alaDb.tables[tableName]);
    const columns = alaDb.tables[tableName].columns;
    for (const row of rows) {
      let query = 'INSERT INTO ' + tableName + ' VALUES (';
      for (let i = 0; i < row.length; i++) {
        if (columns[i].dbtypeid === 'STRING') {
          if (row[i].trim().toLowerCase() === 'null') {
            query += row[i] + ',';
          } else {
            query += '\'' + row[i] + '\',';
          }
        } else {
          query += row[i] + ',';
        }
      }
      query = query.slice(0, -1);
      query += ');';
      alaDb.exec(query);
    }
  }
}
