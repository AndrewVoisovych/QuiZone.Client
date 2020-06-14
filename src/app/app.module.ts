import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { LoginComponent } from './components/home-page/login/login.component';
import { SearchBoxComponent } from './components/quiz-page/search-box/search-box.component';
import { QuizCardsComponent } from './components/quiz-page/quiz-cards/quiz-cards.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuizStartComponent } from './components/quiz-page/quiz-start/quiz-start.component';
import { QuizProcessComponent } from './components/quiz-process/quiz-process.component';
import { AddQuizComponent } from './components/quiz-page/add-quiz/add-quiz.component';
import { QuizQuestionComponent } from './components/quiz-page/add-quiz/quiz-question/quiz-question.component';
import { QuizPaginationComponent } from './components/quiz-process/quiz-pagination/quiz-pagination.component';
import { QuizTimerComponent } from './components/quiz-process/quiz-timer/quiz-timer.component';
import { FormatTimePipe } from './core/pipe/FormatTimePipe.pipe';
import { QuizAnswersComponent } from './components/quiz-process/quiz-answers/quiz-answers.component';
import { HttpAuthInterceptor } from './core/interceptors/http-auth.interceptor';
import { CommonModule } from '@angular/common';
import { UserGuard } from './core/guards/user.guard';
import { SuperadminGuard } from './core/guards/superadmin.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { FacebookComponent } from './components/home-page/login/facebook/facebook.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AngularPageVisibilityModule } from 'angular-page-visibility';
import { CompletedAddComponent } from './components/quiz-page/add-quiz/completed-add/completed-add.component';
import { EndTimerComponent } from './components/quiz-process/quiz-timer/end-timer/end-timer.component';
import { EndProcessComponent } from './components/quiz-process/end-process/end-process.component';
import { EndButtonComponent } from './components/quiz-process/end-process/end-button/end-button.component';
import { EndAnswersComponent } from './components/quiz-process/end-process/end-answers/end-answers.component';
import { QuizBlockedComponent } from './components/quiz-process/quiz-blocked/quiz-blocked.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    QuizPageComponent,
    LoginComponent,
    SearchBoxComponent,
    QuizCardsComponent,
    QuizStartComponent,
    QuizProcessComponent,
    AddQuizComponent,
    QuizQuestionComponent,
    QuizPaginationComponent,
    QuizTimerComponent,
    FormatTimePipe,
    QuizAnswersComponent,
    FacebookComponent,
    ProfilePageComponent,
    CompletedAddComponent,
    EndTimerComponent,
    EndProcessComponent,
    EndButtonComponent,
    EndAnswersComponent,
    QuizBlockedComponent,
    SpinnerComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    AngularPageVisibilityModule,
    NgxMaskModule.forRoot(),
    ClipboardModule,
    NgxSpinnerModule
  ],
  exports: [
    LoginComponent,
    SearchBoxComponent,
    QuizCardsComponent,
    QuizProcessComponent,
    QuizPageComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    SuperadminGuard,
    AdminGuard,
    UserGuard
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

