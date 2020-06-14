import { Component, OnInit, Input } from '@angular/core';
import { timer, Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-quiz-timer',
  templateUrl: './quiz-timer.component.html',
  styleUrls: ['./quiz-timer.component.css']
})


export class QuizTimerComponent implements OnInit {
  @Input() time: number;
  @Input() endLink: string;
  @Input() quizId: number;

  timerPredicate: boolean = true;
  countDown: Subscription;
  counter: number;
  tick: number = 1000;
  end: number = 0;
  state: boolean = true;

  secondsInPercent: number;
  valueNow: number;

  ngOnInit() {
    if(this.time === 0 || this.time === null){
      this.timerPredicate = false;
    }else{
      this.counter = this.time;

      this.countDown = timer(0, this.tick).subscribe(() => {
        if (this.counter === this.end) {
          this.state = false;
          this.countDown.unsubscribe();
          this.endQuiz();

        } else {
          --this.counter;
        }

        this.secondsInPercent = 100 - ((this.counter * 100) / this.time);
        this.valueNow = Math.round(this.secondsInPercent);
      });
    }


  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.countDown = null;
  }

  endQuiz() {
    $('#endTimeModal').modal({backdrop: 'static', keyboard: false});
  }
}


