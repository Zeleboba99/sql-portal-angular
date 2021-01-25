import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CreateDbComponent } from './component/create-db/create-db.component';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BaseUrlInterceptor} from './service/interceptor/base-url-interceptor';
import {ExcelService} from './service/excel.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TaskComponent } from './component/task/task.component';
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

// the second parameter 'fr-FR' is optional
registerLocaleData(localeRu, 'ru');


@NgModule({
  declarations: [
    AppComponent,
    CreateDbComponent,
    TaskComponent,
    AllDbsComponent,
    AllCoursesComponent,
    LoginComponent,
    DbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {path: 'create-db', component: CreateDbComponent, canActivate: [AccessGuard]},
        {path: 'task', component: TaskComponent, canActivate: [AccessGuard]},
        {path: 'all-dbs', component: AllDbsComponent, canActivate: [AccessGuard]},
        {path: 'all-courses', component: AllCoursesComponent, canActivate: [AccessGuard]},
        {path: 'login', component: LoginComponent},
        {path: 'db', component: DbComponent, canActivate: [AccessGuard]}
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
