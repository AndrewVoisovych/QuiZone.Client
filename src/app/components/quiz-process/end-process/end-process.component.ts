import { QuizService } from './../../../core/services/quiz.service';
import { Answer, Question } from './../../../core/models/question';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-end-process',
  templateUrl: './end-process.component.html',
  styleUrls: ['./end-process.component.css']
})
export class EndProcessComponent implements OnInit {
  answers: boolean = false;
  result: string = "триває обрахування...";
  resultPredicate: boolean = false;
  imagePath: string = '/assets/img/success.png';


  //
  loading: boolean = false;
  quizId: number;
  questions: Question[];
  viewResultPredicate: boolean = false;


  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) {

    if (this.route.snapshot.params.quiz) {
      this.quizId = this.route.snapshot.params.quiz;
    } else {
      this.router.navigate(['quiz']);
      this.toastr.error('Такої сторінки не існує', 'Помилка доступу');
    }
  }

  ngOnInit() {
    this.quizService.getQuestions(this.quizId)
      .pipe(
        finalize(() => this.loading = true)
      )
      .subscribe(
        result => {
          this.questions = result;
          this.computeResult();
          if (this.quizId == 1) {
            this.viewResultPredicate = true;
          }
        },
        error => {
          this.router.navigate(['quiz']);
          this.toastr.error('Такої сторінки не існує', 'Помилка доступу');
        });




  }

  computeResult(): void {


    setTimeout(() => {
      if(this.quizId==1){
        this.result = "80% / 100%";
        this.resultPredicate = true;
        this.imagePath = '/assets/img/success-g.png';
      }else if(this.quizId==3){
        this.result = "0% / 100%";
        this.resultPredicate = true;
      }else{
        this.result = "оцінка недоступна.";
      }


    }, 3000);
  }

  mockData() {
  }
}
