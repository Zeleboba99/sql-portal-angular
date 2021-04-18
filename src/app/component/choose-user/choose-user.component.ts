import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {AuthService} from '../../service/auth.service';
import {TestService} from '../../service/test.service';
import {Attempt} from '../../model/attempt';

@Component({
  selector: 'app-choose-user',
  templateUrl: './choose-user.component.html',
  styleUrls: ['./choose-user.component.css']
})
export class ChooseUserComponent implements OnInit {

  public serverError = '';
  public users: User[] = [];
  public attempts: Attempt[] = [];

  public selectedPage = 0;
  public size = 1;
  public page = 1;
  public sort = true;
  public userPage;
  public test_id;
  public user_id;
  public search = '';

  constructor(private router: Router,
              private activateRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private testService: TestService) {
  }

  ngOnInit() {
    this.test_id = this.activateRoute.snapshot.queryParams['test_id'];
    this.getStudents(this.selectedPage, this.size);
  }

  getStudents(page: number, size: number) {
    if (this.search === '') {
      this.userService.getAllStudents(page, size).subscribe(
        res => {
          this.userPage = res;
          this.users = res.content;
        },
        error => {
          this.serverError = error;
        }
      );
    } else {
      this.userService.getAllStudentsBySearch(this.search, page, size).subscribe(
        res => {
          this.userPage = res;
          this.users = res.content;
        },
        error => {
          this.serverError = error;
        }
      );
    }
  }

  onPageSelect(page: number) {
    this.selectedPage = page;
    this.getStudents(page, this.size);
  }

  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onUserClick(user_id: number) {
    this.testService.getAttemptsForTestByUserId(user_id, this.test_id).subscribe(
      res => {
        this.attempts = res;
        this.user_id = user_id;
      }, error => {
        this.serverError = error.error.message;
      }
    );
  }

  onAttemptClick(attempt_id: number) {
    this.router.navigate(['check-attempt'], {queryParams: {attempt_id: attempt_id, user_id: this.user_id, test_id: this.test_id}});
  }

  convertToDate(date: any) {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString('ru-RU', { dateStyle: 'full', timeStyle: 'medium' });
  }

  isEstimated(attempt: Attempt) {
    for (let q of attempt.questions) {
      if (q.answer.grade != null) {
        return true;
      }
    }
    return false;
  }

  calculateGradeForAttempt(attempt: Attempt) {
    let grade = 0;
    attempt.questions.forEach(q => grade += q.answer.grade);
    return grade / attempt.questions.length;
  }
}
