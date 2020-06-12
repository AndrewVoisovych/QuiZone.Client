import { Quiz } from './../../../core/models/quiz';
import { Component, OnInit, Input } from '@angular/core';
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.css']
})
export class QuizCardsComponent implements OnInit {
  @Input() quiz: Quiz;
  faHeart = faHeart;
  faShareAlt = faShareAlt;

  description: string;
  imagePath: string;
  link: string;

  constructor(
    private router: Router,
    private clipboardService: ClipboardService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.description = this.quiz.description.length > 76
      ? this.quiz.description.substring(0, 73) + '...'
      : this.quiz.description;

    this.imagePath =  (this.quiz.imagePath) 
      ? this.quiz.imagePath
      :'/assets/img/noImageTesting.png';

    this.link = `/quiz/start/${this.quiz.id}`;
  }

  start() {
    this.router.navigate([this.link]);
  }

  shareLink(event: Event) {
    event.stopPropagation(); 
    this.clipboardService.copyFromContent(this.link);
    this.toastr.info('Посилання на опитування скопійовано');
  }

  addToLibrary(event: Event) {
    event.stopPropagation();
  }

  noClick(event: Event) {
    event.stopPropagation();
  }
}
