import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quiz-answers',
  templateUrl: './quiz-answers.component.html',
  styleUrls: ['./quiz-answers.component.css']
})

export class QuizAnswersComponent implements OnInit {
  @Input() answers: { id: number, body: string, checked: boolean }[];
  @Input() questionId: number;

  checked: boolean;
  upIcon = faChevronUp;
  downIcon = faChevronDown;

  constructor() { }

  ngOnInit() {

  }

  Sort(id: number, position: boolean) {
    // true like a down
    if (position) {
      // if firth
      if (id === this.answers[this.answers.length - 1].id) {
        return;
      } // if last
      else {
        const currentRow = this.answers.filter(x => x.id === id);
        const indexCurrentRow = this.answers.indexOf(currentRow[0]);
        const indexNextRow = indexCurrentRow + 1;

        [this.answers[indexCurrentRow], this.answers[indexNextRow]] = [this.answers[indexNextRow], this.answers[indexCurrentRow]];
      }
    }
    // false like a up
    else {
      // if firth
      if (id === this.answers[0].id) {
          return;
      } // if last
      else {
        const currentRow = this.answers.filter(x => x.id === id);
        const indexCurrentRow = this.answers.indexOf(currentRow[0]);
        const indexPreviousRow = indexCurrentRow - 1;

        [this.answers[indexCurrentRow], this.answers[indexPreviousRow]] = [this.answers[indexPreviousRow], this.answers[indexCurrentRow]];
      }
    }
  }
}
