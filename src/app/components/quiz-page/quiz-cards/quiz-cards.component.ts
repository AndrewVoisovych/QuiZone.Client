import { Quiz } from './../../../core/models/quiz';
import { Component, OnInit, Input } from '@angular/core';
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.css']
})
export class QuizCardsComponent implements OnInit {
  @Input() quiz: Quiz;
  faHeart = faHeart;
  faShareAlt = faShareAlt;

  descrpiption: string;
  imagePath: string;
  link: string;

  constructor() { }

  ngOnInit() {
    this.descrpiption = this.quiz.description.length > 76
    ? this.quiz.description.substring(0, 73) + '...'
    : this.quiz.description;

    this.imagePath = '/assets/img/noImageTesting.png';
    this.link = `/quiz/start/${this.quiz.id}`;
    
   
  }

  test(){
    console.log("CANT STOP ME NOW");
  }
}
