import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CreateDbComponent } from './component/create-db/create-db.component';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BaseUrlInterceptor} from './service/interceptor/base-url-interceptor';
import {ExcelService} from './service/excel.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AllDbsComponent } from './component/all-dbs/all-dbs.component';
import { AllCoursesComponent } from './component/all-courses/all-courses.component';
import {UserService} from './service/user.service';
import {CourseService} from './service/course.service';
import {CookieService} from 'angular2-cookie/core';
import {AuthenticationInterceptor} from './service/interceptor/authentication-interseptor';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { LoginComponent } from './component/login/login.component';
import {AccessGuard} from './guard/access.guard';
import {AuthService} from './service/auth.service';
import {DbService} from './service/db.service';
import { DbComponent } from './component/db/db.component';
import { CreateCourseComponent } from './component/create-course/create-course.component';
import { CourseComponent } from './component/course/course.component';
import {TestService} from './service/test.service';
import {CreateTestComponent} from './component/create-test/create-test.component';
import { TestComponent } from './component/test/test.component';
import { AttemptsComponent } from './component/attempts/attempts.component';
import { ViewAttemptComponent } from './component/view-attempt/view-attempt.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { AllUsersComponent } from './component/all-users/all-users.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import { ChooseUserComponent } from './component/choose-user/choose-user.component';
import { CheckAttemptComponent } from './component/check-attempt/check-attempt.component';

// the second parameter 'fr-FR' is optional
registerLocaleData(localeRu, 'ru');


@NgModule({
  declarations: [
    AppComponent,
    CreateDbComponent,
    AllDbsComponent,
    AllCoursesComponent,
    LoginComponent,
    DbComponent,
    CreateCourseComponent,
    CourseComponent,
    CreateTestComponent,
    TestComponent,
    AttemptsComponent,
    ViewAttemptComponent,
    AllUsersComponent,
    CreateUserComponent,
    ChooseUserComponent,
    CheckAttemptComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AceEditorModule,
    RouterModule.forRoot(
      [
        {path: 'create-db', component: CreateDbComponent, canActivate: [AccessGuard]},
        {path: 'all-dbs', component: AllDbsComponent, canActivate: [AccessGuard]},
        {path: 'all-courses', component: AllCoursesComponent, canActivate: [AccessGuard]},
        {path: 'login', component: LoginComponent},
        {path: 'db', component: DbComponent, canActivate: [AccessGuard]},
        {path: 'create-course', component: CreateCourseComponent, canActivate: [AccessGuard]},
        {path: 'course', component: CourseComponent, canActivate: [AccessGuard]},
        {path: 'create-test', component: CreateTestComponent, canActivate: [AccessGuard]},
        {path: 'test', component: TestComponent, canActivate: [AccessGuard]},
        {path: 'attempts', component: AttemptsComponent, canActivate: [AccessGuard]},
        {path: 'view-attempt', component: ViewAttemptComponent, canActivate: [AccessGuard]},
        {path: 'all-users', component: AllUsersComponent, canActivate: [AccessGuard]},
        {path: 'create-user', component: CreateUserComponent, canActivate: [AccessGuard]},
        {path: 'choose-user', component: ChooseUserComponent, canActivate: [AccessGuard]},
        {path: 'check-attempt', component: CheckAttemptComponent, canActivate: [AccessGuard]}
      ]
    )
  ],
  providers: [
    ExcelService,
    UserService,
    CourseService,
    AuthService,
    AccessGuard,
    DbService,
    TestService,
    { provide: CookieService, useFactory: cookieServiceFactory },
    { provide: LOCALE_ID, useValue: 'ru' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function cookieServiceFactory() {
  return new CookieService();
}
