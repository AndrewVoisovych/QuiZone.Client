import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  question = [];
  constructor() { }

  ngOnInit() {
  }

  addQuestion(): void {
    this.question.push(1);
  }

}
