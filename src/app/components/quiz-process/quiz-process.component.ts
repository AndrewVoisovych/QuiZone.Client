import { Question, Answer } from './../../core/models/question';
import { Quiz } from './../../core/models/quiz';
import { QuizService } from './../../core/services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { QuizPaginator } from 'src/app/core/models/pagination';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ScreenService } from 'src/app/core/services/screen.service';
declare var $: any;

@Component({
  selector: 'app-quiz-process',
  templateUrl: './quiz-process.component.html',
  styleUrls: ['./quiz-process.component.css']
})

export class QuizProcessComponent implements OnInit {
  // Quiz - questtion model
  quizId: number;
  quiz: Quiz;
  question: Question[];
  answers: Answer[];

  //loading?
  loading: boolean = false;

  //data fill
  currentQuestion: number;
  testingName: string;
  questionBody: string;
  categoryId: number;


  // func
  timer: number;
  page: QuizPaginator;
  blockTab: boolean = false;
  endLink: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private screen: ScreenService,
    private quizService: QuizService) {

    if (this.route.snapshot.params.id) {
      this.quizId = this.route.snapshot.params.id;
    }
  }


  ngOnInit() {

    this.quizService.getQuiz(this.quizId).subscribe(result => {
      this.quiz = result;

      this.quizService.getQuestions(this.quiz.id).subscribe(result => {
        this.question = result;
        this.currentQuestion = 0;

        this.quizService.getEndHash(this.quiz.id).subscribe(result=>{
          this.endLink = result;

          this.loading = true;
          this.contentFill();
        })
      },
        error => {
          this.router.navigate(['quiz/start' + this.quizId]);
          this.toastr.warning('В даному опитуванні поки відсутні питання', 'Попередження');
        });

    },
      error => {
        this.router.navigate(['quiz']);
        this.toastr.error('Опитування з введеним ідентифікатором відсутнє', 'Помилка');
      });
  }

  currentPage(page: number) {
    this.currentQuestion = page;
    this.contentFill();
  }

  contentFill() {
    this.testingName = this.quiz.name.length > 25
      ? this.quiz.name.substring(0, 25) + '...'
      : this.quiz.name;

    this.timer = this.quiz.setting.timerValue
      ? this.quiz.setting.timerValue * 60
      : 0;

    this.blockTab = this.quiz.setting.blockTab
      ? this.quiz.setting.blockTab
      : false;

    if (this.blockTab === true) {
      this.screen.changeValue(true);
    }

    this.screen.changeValueQuizId(this.quizId);
    this.screen.changeValueQuizEndHash(this.endLink);

    this.questionBody = this.question[this.currentQuestion].body;
    this.answers = this.question[this.currentQuestion].answers;
    this.categoryId = this.question[this.currentQuestion].categoryId;

    this.page = { allPages: this.question.length, CurrentPage: this.currentQuestion };
  }

  endQuiz() {
    $('#endQuizButton').modal();
  }
}

