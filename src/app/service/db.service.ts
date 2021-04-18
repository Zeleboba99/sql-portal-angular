import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DbInfo} from '../model/db-info';
import {RequestOptions, ResponseContentType} from '@angular/http';
import {Database} from '../model/database';

@Injectable()
export class DbService {

  private BASE_URL = '/api/dbs';

  constructor(private http: HttpClient, private router: Router) {
  }

  public getDbsByAuthor(author_id, page: number, size: number, sort: boolean) {
    return this.http.get<DbInfo[]>(this.BASE_URL + '/author/' + author_id + '?page=' + page +
      '&size=' + size + '&sort=' + sort);
  }

  public getAllDbsPage(page: number, size: number, sort: boolean) {
    return this.http.get<DbInfo[]>(this.BASE_URL + '/pageable' + '?page=' + page +
      '&size=' + size + '&sort=' + sort);
  }

  public getAllDbs() {
    return this.http.get<DbInfo[]>(this.BASE_URL);
  }

  public getDbById(db_id) {
    return this.http.get<Database>(this.BASE_URL + '/' + db_id);
  }

  public uploadDb(uploadExcel: any, db_name: string) {
    return this.http.post(this.BASE_URL + '/uploadDB/' + db_name, uploadExcel);
  }

  public deleteDb(db_id: number) {
    return this.http.delete(this.BASE_URL + '/' + db_id);
  }

  getDbInfoById(db_id: number) {
    return this.http.get<DbInfo>(this.BASE_URL + '/db-info/' + db_id);
  }
}
