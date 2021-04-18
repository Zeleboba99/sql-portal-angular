import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {DbService} from '../../service/db.service';
import {DbInfo} from '../../model/db-info';
import {Course} from '../../model/course';


@Component({
  selector: 'app-all-dbs',
  templateUrl: './all-dbs.component.html',
  styleUrls: ['./all-dbs.component.css']
})
export class AllDbsComponent implements OnInit {

  public serverError = '';
  public dbs: DbInfo[] = [];
  public isCurrentUserTeacher = false;
  public selectedDb: DbInfo = null;

  public selectedPage = 0;
  public size = 5;
  public page = 1;
  public sort = true;
  public dbPage;

  constructor(private dbService: DbService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.isCurrentUserTeacher = this.authService.isCurrentUserTeacher();
    this.getDbs(this.selectedPage, this.size);
  }

  getDbs(page: number, size: number) {
    this.dbService.getAllDbsPage(page, size, this.sort).subscribe(
      res => {
        this.dbPage = res;
        this.dbs = res.content;
      },
      error => {
        this.serverError = error;
      }
    );
  }

  onCreateDbClick() {
    this.router.navigate(['create-db']);
  }

  onDbClick(db_id: number) {
    this.router.navigate(['/db'], {queryParams: {db_id: db_id}});
  }

  isCurrentUserAuthor(db: DbInfo) {
    return this.authService.userLoggedIn.value.id === db.author_id;
  }

  onEditDb(db_id: number) {

  }

  onDeleteDb(db_id: number) {

  }

  onSelectDb(event, db: DbInfo) {
    event.stopPropagation();
    this.selectedDb = db;
    $('#deleteModal').modal('show');
  }

  onDeleteSelectedDb() {
    this.dbService.deleteDb(this.selectedDb.id).subscribe(
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

  onPageSelect(page: number) {
    console.log('selected page : ' + page);
    this.selectedPage = page;
    this.getDbs(page, this.size);
  }
}
