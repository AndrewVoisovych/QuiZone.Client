import { Component, OnInit } from '@angular/core';
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.css']
})
export class QuizCardsComponent implements OnInit {
  faHeart = faHeart;
  faShareAlt = faShareAlt;

  constructor() { }

  ngOnInit() {
  }

}
