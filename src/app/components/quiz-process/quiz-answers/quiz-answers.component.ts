import { TempService } from './../../../core/services/temp.service';
import { Answer } from './../../../core/models/question';
import { Component, OnInit, Input,  SimpleChanges } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { QuestionType } from 'src/app/core/models/question.enum';

@Component({
  selector: 'app-quiz-answers',
  templateUrl: './quiz-answers.component.html',
  styleUrls: ['./quiz-answers.component.css']
})

export class QuizAnswersComponent implements OnInit {
  @Input() answers: Answer[];
  @Input() questionId: number;


  checked: boolean;
  upIcon = faChevronUp;
  downIcon = faChevronDown;
  questionType: string = '';

  constructor(private temp:TempService) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    this.questionType = this.questionTypeToString(this.questionId);
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

  questionTypeToString(type: QuestionType): string {
    switch (type) {
      case QuestionType.OneAnswer:
        return 'запитання з одною відповіддю';
      case QuestionType.ManyAnswers:
        return 'запитання з багатьма відповідями';
      case QuestionType.WordsInput:
        return 'введення тексту';
      case QuestionType.WordInput:
        return 'введення слова/словосполучення';
      case QuestionType.Sequence:
        return 'установити послідовність';
    }
  }
}
