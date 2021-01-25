import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CourseService} from '../../service/course.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  constructor(
    private router: Router,
    private courseService: CourseService
  ) {

  }

  ngOnInit() {
  }

}
