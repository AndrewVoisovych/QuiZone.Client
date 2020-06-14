import { Component, HostListener, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { ScreenService } from './core/services/screen.service';
import { OnPageVisibilityChange, AngularPageVisibilityStateEnum } from 'angular-page-visibility';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isScreenBlock: boolean = false;
  quizId: number = 0;
  quizEndHash: string = '';
  loading: boolean = false;

  constructor(
    private screenService: ScreenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loaded();
  }

  ngOnChanges(): void {
    this.loaded();
  }

  loaded(): void{
    this.screenService.isScreenBlock$
    .subscribe(res => {
      this.isScreenBlock = res;
      if (this.isScreenBlock) {
        this.screenService.quizId$.subscribe(res => {
          this.quizId = res;
          this.screenService.quizEndHash$

          .subscribe(res => {
            this.quizEndHash = res;
          });
        });
      }
    });
  }

  blockScreen(event: any) {
      $('#endQuizScreenBlock').modal();
  }

  // todo: fix ZINDEX MODAL AFTER TESTING

  @OnPageVisibilityChange()
  logWhenPageVisibilityChange(visibilityState: AngularPageVisibilityStateEnum): void {
    if (this.isScreenBlock) {
      if (AngularPageVisibilityStateEnum[visibilityState]
        === AngularPageVisibilityStateEnum[AngularPageVisibilityStateEnum.HIDDEN]) {

        this.isScreenBlock = false;
        this.screenService.changeValue(false);
        this.router.navigate([`/endquiz/${this.quizId}/${this.quizEndHash}`]);
        this.toastr.error('Ваше тестуванння завершено, через те що ви вийшли із вкладки', 'Дострокове завершення тестування');
        $('#endQuizScreenBlock').modal('hide');
      }
      else if (AngularPageVisibilityStateEnum[visibilityState]
        === AngularPageVisibilityStateEnum[AngularPageVisibilityStateEnum.UNLOADED]) {
        this.isScreenBlock = false;
        this.screenService.changeValue(false);
        this.router.navigate([`/endquiz/${this.quizId}/${this.quizEndHash}`]);
        this.toastr.error('Ваше тестуванння завершено, через те що ви вийшли із вкладки', 'Дострокове завершення тестування');
      }
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {
    if (this.isScreenBlock) {
      event.preventDefault();
      event.returnValue = false;
    }
  }


}
