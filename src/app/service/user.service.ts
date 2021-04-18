import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {User} from '../model/user';

@Injectable()
export class UserService {

  private BASE_URL = '/api/auth';

  constructor(private http: HttpClient, private router: Router,
              private cookieService: CookieService) {
  }

  signup(user) {
    return this.http.post(this.BASE_URL + '/signup', user);
  }

  updateUser(user_id: number, user: User) {
    return this.http.put(this.BASE_URL + '/users/' + user_id, user);
  }

  deleteUser(user_id: number) {
    return this.http.delete(this.BASE_URL + '/users/' + user_id);
  }

  getAllStudents(page: number, size: number) {
    return this.http.get(this.BASE_URL + '/users/students?page=' + page + '&size=' + size);
  }

  getAllStudentsBySearch(search: string, page: number, size: number) {
    return this.http.get(this.BASE_URL + '/users/students?page=' + page + '&size=' + size + '&search=' + search);
  }

  getAllTeachers(page: number, size: number) {
    return this.http.get(this.BASE_URL + '/users/teachers?page=' + page + '&size=' + size);
  }

  getUserById(user_id: number) {
    return this.http.get<User>(this.BASE_URL + '/users/' + user_id);
  }
}
