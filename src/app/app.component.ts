import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {User} from './model/user';
import {AuthService} from './service/auth.service';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  newPassword = '';
  public changePasswordMessage = '';
  public user: User;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.userLoggedIn.subscribe( value => this.user = value);
  }

  changePassword() {
    this.authService.changePassword(this.newPassword).subscribe(
      res => {
        this.changePasswordMessage = 'Пароль был успешно изменен';
      },
      error => {
        this.changePasswordMessage = 'Возникли проблемы во время смены пароля';
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
