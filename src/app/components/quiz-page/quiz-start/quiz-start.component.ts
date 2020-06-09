import { QuizService } from './../../../core/services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Quiz } from 'src/app/core/models/quiz';
import { QuizType } from '../../../core/models/quiz.enum';

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

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private quizService: QuizService
  ) {
    if (this.route.snapshot.params.id) {
      this.quizId = this.route.snapshot.params.id;

      if (this.quizId) {
        this.quizService.getQuiz(this.quizId).subscribe(res => {
          this.quiz = res;
          this.link += this.quiz.id;
          this.quizType = this.ViewQuizType(this.quiz.categoryId);
          this.loading = true;
        },
          err => {
            this.toastr.warning('Такого опитування не існує', 'Помилка');
            this.router.navigate(['quiz']);
          });
      } else {
        this.toastr.warning('Такого опитування не існує', 'Помилка');
        this.router.navigate(['quiz']);
      }
    } else {
      this.router.navigate(['quiz']);
    }
  }

  ngOnInit() {
  }

  ViewQuizType(type: QuizType): string {
    switch (type) {
      case QuizType.OneTime:
        return 'одноразове';
      case QuizType.Multiple:
        return 'багаторазове';
      case QuizType.Learning:
        return 'режим заучування';
      case QuizType.EstimatedOneTime:
        return 'оцінкове одноразове';
      case QuizType.EstimatedMultiple:
        return 'оцінкове багаторазове';
      case QuizType.Custom:
        return '';
    }
  }


}
