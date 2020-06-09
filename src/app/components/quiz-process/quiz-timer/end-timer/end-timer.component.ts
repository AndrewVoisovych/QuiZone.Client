import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-timer',
  templateUrl: './end-timer.component.html',
  styleUrls: ['./end-timer.component.css']
})
export class EndTimerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  endProcces(){
    this.router.navigate(['/endquiz']);
  }
}
