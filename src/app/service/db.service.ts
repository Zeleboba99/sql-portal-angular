import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Db} from '../model/db';
import {RequestOptions, ResponseContentType} from '@angular/http';
import {Database} from '../model/database';

@Injectable()
export class DbService {

  private BASE_URL = '/api/dbs';
  constructor(private http: HttpClient, private router: Router) { }

  public getDbsByAuthor(author_id) {
    return this.http.get<Db[]>(this.BASE_URL + '/author/' + author_id);
  }

  public getAllDbs() {
    return this.http.get<Db[]>(this.BASE_URL);
  }

  public getDbById(db_id) {
    return this.http.get<Database>(this.BASE_URL + '/' + db_id);
  }

  public uploadDb(uploadExcel: any, db_name: string) {
    return this.http.post(this.BASE_URL + '/uploadDB/' + db_name, uploadExcel);
  }

  // public createCourse(course) {
  //   return this.http.post(this.BASE_URL, course);
  // }
  //
  // public deleteCourse(course_id) {
  //   return this.http.delete(this.BASE_URL + '/' + course_id);
  // }
}
