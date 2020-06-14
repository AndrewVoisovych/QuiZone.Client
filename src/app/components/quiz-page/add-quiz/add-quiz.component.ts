import { Component, OnInit, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  question = [];
  category: string;
  topic: string = '';
  predicateTimer: boolean = false;
  timerValue: number = 0;
  positionPredicate: boolean = false;
  answerVisible: string = '';


  constructor(private toastr: ToastrService, private router: Router) {

  }

  ngOnInit() {
  }



  addQuestion(): void {
    this.question.push(this.question.length + 1);
  }

  createQuiz(): void {
    this.toastr.success('Ваше тестування збережено', 'Вітаємо');
    this.router.navigate(['/addquiz/completed']);
  }


  removeQuestion(id: number) {
    this.question = this.question.filter(item => item !== id);
  }


  timerCheckbox(event: any) {

  }
  randomPositionCheckbox(event: any) {
    this.positionPredicate = !this.positionPredicate;
  }
}
