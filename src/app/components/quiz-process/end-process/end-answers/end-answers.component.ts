import { Question, Answer } from './../../../../core/models/question';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-end-answers',
  templateUrl: './end-answers.component.html',
  styleUrls: ['./end-answers.component.css']
})
export class EndAnswersComponent implements OnInit {
  @Input() question: Question;

  constructor() { }

  ngOnInit() {

  }

}
