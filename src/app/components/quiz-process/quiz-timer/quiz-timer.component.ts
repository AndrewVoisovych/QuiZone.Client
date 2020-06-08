import { Component, OnInit, Input } from '@angular/core';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz-timer',
  templateUrl: './quiz-timer.component.html',
  styleUrls: ['./quiz-timer.component.css']
})
export class QuizTimerComponent implements OnInit {
  @Input() time: number;

  countDown: Subscription;
  counter: number;
  tick: number = 1000;
  end: number = 0;
  state: boolean = true;

  secondsInPercent: number;
  valueNow: number;

  ngOnInit() {
    this.counter = this.time;

    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter === this.end) {
        this.state = false;
        this.countDown.unsubscribe();
      } else {
        --this.counter;
      }

      this.secondsInPercent = 100 - ((this.counter * 100) / this.time);
      this.valueNow = Math.round(this.secondsInPercent);
    });
  }

  ngOnDestroy() {
    console.log("ngondestroy");
    this.countDown = null;
  }
}


