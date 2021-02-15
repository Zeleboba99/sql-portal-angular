import { Component, OnInit } from '@angular/core';
import {Course} from '../../model/course';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../service/course.service';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public serverError = '';
  public user_id: number = null;
  public user: User = new User(null, '', '', '', '', '');
  public roles = [{rusName: 'Преподаватель', name: 'TEACHER'},
                  {rusName: 'Студент', name: 'STUDENT'}];

  constructor(private router: Router,
              private userService: UserService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.user_id = this.activateRoute.snapshot.queryParams['user_id'];
    if (this.user_id) {
      this.userService.getUserById(this.user_id).subscribe(
        res => {
          this.user = res;
          console.log(this.user);
        }, error => {
          this.serverError = error.error.message;
        }
      );
    }

  }

  onCreateUserClick() {
    this.userService.signup(this.user).subscribe(
      res => {
        this.router.navigate(['all-users']);
      },
      error => {
        this.serverError = error;
        console.log(this.serverError);
        this.router.navigate(['all-users']);
      }
    );
  }

  onUpdateUserClick() {
    this.userService.updateUser(this.user_id, this.user).subscribe(
      res => {
        this.router.navigate(['all-users']);
      }, error => {
        this.serverError = error;
        console.log(this.serverError);
        // this.router.navigate(['all-users']);

      }
    );
  }
}
