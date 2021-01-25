import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions, ResponseContentType} from '@angular/http';

@Injectable()
export class ExcelService {

  private base_url = '/api';
  constructor(private http: HttpClient) { }

  uploadExcelDB(uploadExcel: any) {
    return this.http.post(this.base_url + '/uploadDB', uploadExcel);
  }

  downloadExcelDB(id: number) {
    let options = new RequestOptions({responseType: ResponseContentType.Blob });
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '
    });
    return this.http.get(this.base_url + '/downloadDB/' + id, {headers: headers, responseType: 'arraybuffer'});
  }
}
