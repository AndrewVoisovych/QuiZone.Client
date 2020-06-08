import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {
  faTimes = faTimes;
  position: number;
  positionTitle: number;
  predicatePosition: boolean = false;
  predicateAnswers: boolean = false;


  @Input() questionId: number;
  @Output() deleteId: EventEmitter<number> = new EventEmitter<number>();

  answers = [];
  answersCount: number = 1;

  category: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
   
  }

  RemoveQuestion(id:number) {
    this.deleteId.emit(id);
  }

  positionCheckbox(event: any) {
    if (event.target.checked) {
      this.predicatePosition = true;
      this.positionTitle = this.position;
    } else {
      this.predicatePosition = false;
    }
    //TODO: default position 
  }

  positionInput() {
    if (this.predicatePosition) {
      this.positionTitle = this.position;
    }
  }

  answerCheckbox(event: any) {
    if (event.target.checked) {
      this.predicateAnswers = true;
      this.createAnswerInput(this.answersCount);
    } else {
      this.predicateAnswers = false;
    }
  }

  answerInput(): void {
    if (this.predicateAnswers) {
      this.createAnswerInput(this.answersCount);
    }
  }

  createAnswerInput(answersCount: number): void {
    let cycleIteration: number;
    if (this.answers.length < answersCount) {
      cycleIteration = answersCount - this.answers.length;
      for (let i = 0; i < cycleIteration; i++) {
        this.answers.push(1);
      }
    } else {
      cycleIteration = this.answers.length - answersCount;
      for (let i = 0; i < cycleIteration; i++) {
        this.answers.pop();
      }
    }


  }

}
