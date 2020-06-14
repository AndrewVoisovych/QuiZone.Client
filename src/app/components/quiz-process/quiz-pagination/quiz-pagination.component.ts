import { PaginationAgorithm } from './../../../core/helper/pagination-helper';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faArrowLeft, faArrowRight, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { QuizPaginator, Pages, ComputeData } from 'src/app/core/models/pagination';

@Component({
  selector: 'app-quiz-pagination',
  templateUrl: './quiz-pagination.component.html',
  styleUrls: ['./quiz-pagination.component.css']
})
export class QuizPaginationComponent implements OnInit {
  @Input() page: QuizPaginator;
  // tslint:disable-next-line:max-line-length
  @Output() selectPage: EventEmitter<number> = new EventEmitter<number>();

  pagesForView: number = 8;
  pages: Pages;
  computedData: ComputeData;

  faLeft = faArrowLeft;
  faRight = faArrowRight;
  faStepBack = faStepBackward;
  faStepForward = faStepForward;

  constructor(private paginatr: PaginationAgorithm) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.computedData = this.paginatr.Compute(this.page, this.pagesForView);
    this.pagesView();
  }

  pagesView() {

    // Alghoritm pages
    const pageArr = [];

    // push all pages
    for (let i = this.computedData.start; i <= this.computedData.end; i++) {
      pageArr.push({ number: i, link: i - 1 });
    }

    this.pages = {
      current: this.page.CurrentPage,
      previousPredicate: this.page.CurrentPage === 0,
      nextPredicate: (this.page.CurrentPage + 1) === this.page.allPages,
      next: (this.page.CurrentPage + 1) === this.page.allPages
        ? this.page.CurrentPage
        : this.page.CurrentPage + 1,

      previous: this.page.CurrentPage === 0
        ? this.page.CurrentPage
        : this.page.CurrentPage - 1,

      page: pageArr
    };
  }

  pageSelect(page: number) {
    this.selectPage.emit(page);
    this.pagesView();

  }
}


