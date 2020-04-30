import { QuizService } from './../core/services/quiz.service';
import { Quiz } from '../core/models/quiz-model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {

  quiz: Quiz; 
  
  constructor(private quizService: QuizService) { 
    this.quiz = new Quiz();
  }

  ngOnInit() {
   
   this.quizService.getQuiz(1)
  .subscribe(data=> {
    this.quiz = data;
    console.log(this.quiz);
  },
  err=> {
    console.log("ERRORR");
  }
  );

  
  }

  ShowINFO(){
    return this.quiz.name;
  }
 

}
