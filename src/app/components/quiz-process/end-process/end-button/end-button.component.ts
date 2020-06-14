import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-button',
  templateUrl: './end-button.component.html',
  styleUrls: ['./end-button.component.css']
})
export class EndButtonComponent implements OnInit {
  @Input() endLink: string;
  @Input() quizId: number;
  constructor( private router: Router) { }

  ngOnInit() {
  }

  endProcces(){
    this.router.navigate([`/endquiz/${this.quizId}/${this.endLink}`]);
  }
}
