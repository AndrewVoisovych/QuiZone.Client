import { QuizService } from './../../core/services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Quiz } from 'src/app/core/models/quiz';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {
  plusIcon = faPlus;
  quizes: Quiz[];
  quizesFilter: Quiz[];
  loading: boolean = false;

  constructor(private quizService: QuizService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.quizService.getAllQuiz()
    .pipe(
      finalize(() => this.loading = true)
    )
    .subscribe(result => {
      this.quizes = result;
      this.quizesFilter = result;
    });
  }

  search(query: string) {
    query = query.toLowerCase().trim();

    if (query === '') {
      this.quizesFilter = this.quizes;
    }

    this.quizesFilter = this.quizes.filter(x => x.name.toLowerCase().includes(query));
    if (this.quizesFilter.length < 1) {
      this.quizesFilter = this.quizes.filter(x => x.description.toLowerCase().includes(query));
    }
  }

}
