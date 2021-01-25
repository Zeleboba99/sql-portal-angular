import {Component, OnInit} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {User} from '../../model/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private LOGIN = 'login';
  private FIRST_NAME = 'firstName';
  private LAST_NAME = 'lastName';
  private ID = 'id';
  private TOKEN = 'token';
  public signInData = {login: '', password: ''};
  public serverError: any;
  constructor(private authService: AuthService,
              private router: Router,
              private cookieService: CookieService
  ) { }


  ngOnInit() {
    const user = this.authService.userLoggedIn.getValue();
    if (user) {
      this.router.navigate(['all-courses']);
    }
  }

  signin() {
    // TODO validation and compare passwords
    this.serverError = '';
    this.authService.login(this.signInData)
      .subscribe(
        data => {
          if (data[this.TOKEN]) {
            this.authService.saveToken(data[this.TOKEN]);
            this.cookieService.put(this.LOGIN, data[this.LOGIN]);
            this.cookieService.put(this.ID, data[this.ID]);
            this.cookieService.put(this.FIRST_NAME, data[this.FIRST_NAME]);
            this.cookieService.put(this.LAST_NAME, data[this.LAST_NAME]);
            const user = new User(data[this.ID], data[this.LOGIN], data[this.FIRST_NAME], data[this.LAST_NAME], null);
            this.authService.userLoggedIn.next(user);
            this.router.navigate(['/all-courses']);
          }},
        error => {
          this.serverError = 'Данные некорректны';
          // this.serverError = error.error.message;
        }
      );
  }
}
