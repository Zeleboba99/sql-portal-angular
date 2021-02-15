import {Component, OnInit} from '@angular/core';
import {Course} from '../../model/course';
import {Router} from '@angular/router';
import {CourseService} from '../../service/course.service';
import {AuthService} from '../../service/auth.service';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  public serverError = '';
  public users: User[] = [];

  public selectedUser: User = null;

  public selectedPage = 0;
  public size = 5;
  public page = 1;
  public sort = true;
  public userPage;

  public currentTab = 'STUDENTS';

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getStudents(this.selectedPage, this.size);
  }

  getStudents(page: number, size: number) {
    this.userService.getAllStudents(page, size).subscribe(
      res => {
        this.userPage = res;
        this.users = res.content;
      },
      error => {
        this.serverError = error;
      }
    );
  }

  getTeachers(page: number, size: number) {
    this.userService.getAllTeachers(page, size).subscribe(
      res => {
        this.userPage = res;
        this.users = res.content;
      },
      error => {
        this.serverError = error;
      }
    );
  }

  onPageSelect(page: number) {
    console.log('selected page : ' + page);
    this.selectedPage = page;
    if (this.currentTab == 'STUDENTS') {
      this.getStudents(page, this.size);
    } else {
      this.getTeachers(page, this.size);
    }
  }

  onCreateUserClick() {
    this.router.navigate(['create-user']);
  }

  // onUserClick(event, course_id: number) {
  //   event.stopPropagation();
  //   this.router.navigate(['us'], {queryParams: {course_id: course_id}});
  // }

  onEditUser(user_id: number) {
    this.router.navigate(['create-user'], {queryParams: {user_id: user_id}});
  }

  onSelectUser(event, user: User) {
    event.stopPropagation();
    this.selectedUser = user;
    $('#deleteModal').modal('show');
  }

  onDeleteSelectedUser() {
    this.userService.deleteUser(this.selectedUser.id).subscribe(
      res => {
        $('#deleteModal').modal('hide');
        this.reloadCurrentRoute();
      }, error => {
        this.serverError = error.error.message;
      }
    );
  }

  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  onStudentsClick() {
    if (this.currentTab !== 'STUDENTS') {
      this.currentTab = 'STUDENTS';
      this.selectedPage = 0;
      this.page = 1;
      this.getStudents(this.selectedPage, this.size);
    }
  }

  onTeachersClick() {
    if (this.currentTab !== 'TEACHERS') {
      this.currentTab = 'TEACHERS';
      this.selectedPage = 0;
      this.page = 1;
      this.getTeachers(this.selectedPage, this.size);
    }
  }
}
