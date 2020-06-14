import { ViewQuizAccess } from './../../../core/helper/quiz-access-helper';
import { QuizService } from './../../../core/services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Quiz } from 'src/app/core/models/quiz';
import { ViewQuizType } from 'src/app/core/helper/quiz-type-helper';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit {
  quizId: number;
  quiz: Quiz;

  imagePath: string = "/assets/img/noImageTesting.png";
  link: string = '/quiz/';
  loading: boolean = false;
  quizType: string = '';
  quizAccess: string;
  timerValue: number;
  countQuestion: number = 0;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private quizService: QuizService,
    private viewQuizType: ViewQuizType,
    private viewQuizAccess: ViewQuizAccess,
    private authService: AuthenticationService,
  ) {
    if (this.route.snapshot.params.id) {
      this.quizId = this.route.snapshot.params.id;
    } else {
      this.router.navigate(['quiz']);
    }
  }

  ngOnInit() {
    if (this.quizId) {

      this.quizService.getQuiz(this.quizId)
      .subscribe(res => {
        this.quiz = res;
        this.link += this.quiz.id;
        this.imagePath = (this.quiz.imagePath)
          ? this.quiz.imagePath
          : this.imagePath;


        this.quizType = this.viewQuizType.output(this.quiz.categoryId);
        this.quizAccess = this.viewQuizAccess.output(this.quiz.accessId)



        this.quizService.getCountQuestions(this.quizId)
        .pipe(
          finalize(() => this.loading = true)
        ).subscribe(
          result => {
            this.countQuestion = result;
          },
          error => {
            this.countQuestion = 0;
          }
        );

      },
        err => {
          this.toastr.warning('Такого опитування не існує', 'Помилка');
          this.router.navigate(['quiz']);
        });
    } else {
      this.toastr.warning('Такого опитування не існує', 'Помилка');
      this.router.navigate(['quiz']);
    }
  }

  start(): void {
    if (!this.authService.isLoggedIn()) {
      this.toastr.error('Авторизуйтесь перед проходженням тестування', 'Помилка доступу');
    }
    this.router.navigate([this.link]);
  }



}
