import { QuizService } from './../../core/services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Quiz } from 'src/app/core/models/quiz';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {
  plusIcon = faPlus;
  quizes: Quiz[];

  constructor(private quizService: QuizService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.quizService.getAllQuiz().subscribe(res => {
      this.quizes = res;
    });
  }

  

}
