import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {User} from './model/user';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public user: User;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.userLoggedIn.subscribe( value => this.user = value);
  }

  logout() {
    this.authService.logout();
  }
}
