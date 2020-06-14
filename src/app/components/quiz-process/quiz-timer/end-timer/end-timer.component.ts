import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenService } from 'src/app/core/services/screen.service';

@Component({
  selector: 'app-end-timer',
  templateUrl: './end-timer.component.html',
  styleUrls: ['./end-timer.component.css']
})
export class EndTimerComponent implements OnInit {
  @Input() endLink: string;
  @Input() quizId: number;

  constructor(private router: Router,
               private screenService: ScreenService) { }


  ngOnInit() {
  }

  endProcces(){
        this.router.navigate([`/endquiz/${this.quizId}/${this.endLink}`]);
  }
}
