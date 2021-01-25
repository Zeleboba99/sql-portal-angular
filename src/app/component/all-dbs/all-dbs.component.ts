import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {DbService} from '../../service/db.service';
import {Db} from '../../model/db';

@Component({
  selector: 'app-all-dbs',
  templateUrl: './all-dbs.component.html',
  styleUrls: ['./all-dbs.component.css']
})
export class AllDbsComponent implements OnInit {

  public serverError = '';
  public dbs:  Db[] = [];
  constructor(private dbService: DbService,
              private router: Router) { }

  ngOnInit() {
    this.dbService.getAllDbs().subscribe(
      res => {
        this.dbs = res;
      },
      error => {
        this.serverError = error;
      }
    );
  }

  onCreateDbClick() {

  }

  onDbClick(db_id: number) {
    this.router.navigate(['/db'], {queryParams: {db_id: db_id}});
  }
}
