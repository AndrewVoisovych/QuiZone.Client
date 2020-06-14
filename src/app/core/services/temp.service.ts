import { Answer, Question } from './../models/question';
import { Quiz } from './../models/quiz';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TempService {
  quizId:number;
  quiz: Quiz;
  question: Question[];
  answer: Answer[];

  constructor() { }

  set quizData(data:Quiz){
      this.quiz = data;
  }

  set questionData(data:Question[]){
    this.question = data;
  }

  set answerData(data:Answer[]){
    this.answer = data;
  }
}
