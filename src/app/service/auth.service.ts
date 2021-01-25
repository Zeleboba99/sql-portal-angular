import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {

  private BASE_URL = '/api/auth';
  private LOGIN = 'login';
  private FIRST_NAME = 'firstName';
  private LAST_NAME = 'lastName';
  private ID = 'id';
  public userLoggedIn: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router,
              private cookieService: CookieService) {
    if (this.cookieService.get(this.LOGIN)) {
      const login = this.cookieService.get(this.LOGIN);
      const firstName = this.cookieService.get(this.FIRST_NAME);
      const lastName = this.cookieService.get(this.LAST_NAME);
      const id = this.cookieService.get(this.ID);
      this.userLoggedIn.next(new User(Number(id), login, firstName, lastName, null));
    }
  }

  login(signInData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic'
      })
    };
    return this.http.post(this.BASE_URL + '/signin', signInData, httpOptions);
  }

  signup(signUpData) {
    return this.http.post(this.BASE_URL + '/signup', signUpData);
  }

  saveToken(token: string) {
    // var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.put(environment.ACCESS_TOKEN, token);
  }

  confirmEmail(token: String) {
    return this.http.get(this.BASE_URL + '/registrationConfirm?token=' + token);
  }

  logout() {
    this.cookieService.remove(environment.ACCESS_TOKEN);
    this.cookieService.remove(this.LOGIN);
    this.cookieService.remove(this.FIRST_NAME);
    this.cookieService.remove(this.LAST_NAME);
    this.userLoggedIn.next(null);
    this.router.navigate(['/login']);
  }

}