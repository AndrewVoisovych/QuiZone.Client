
import { Component, OnInit, Input } from '@angular/core';
import { ObjectServerQuestions } from '../../core/temp-data/objectServerQuestions';
import { QuizPaginator } from 'src/app/core/models/pagination';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-quiz-process',
  templateUrl: './quiz-process.component.html',
  styleUrls: ['./quiz-process.component.css']
})

export class QuizProcessComponent implements OnInit {
  constructor(private router: Router,  private toastr: ToastrService) { }

  testingName: string;
  question: string;
  categoryId: number;
  answers: { id: number, body: string}[];
  timer: number;
  page: QuizPaginator;
  currentQuestion: number;
  quizId: number;
  objectServer = ObjectServerQuestions;

  ngOnInit() {
    this.currentQuestion = 0;
    this.contentFill();
  }

  currentPage(page: number) {
    this.currentQuestion = page;
    this.contentFill();
  }

  contentFill() {
    this.testingName = this.objectServer.quizName.length > 25
      ? this.objectServer.quizName.substring(0, 25) + '...'
      : this.objectServer.quizName;

    this.quizId = this.objectServer.id;
    this.question = this.objectServer.question[this.currentQuestion].body;
    this.answers = this.objectServer.question[this.currentQuestion].answers;
    this.timer = this.objectServer.timer * 60;
    this.categoryId = this.objectServer.question[this.currentQuestion].categoryId;
    this.page = { allPages: this.objectServer.question.length, CurrentPage: this.currentQuestion };
  }

  endQuiz(){
    $('#endQuizButton').modal();
  }

}

