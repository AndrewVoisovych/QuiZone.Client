import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ScreenService {
  private isScreenBlock: Subject<boolean> = new Subject<boolean>();
  private quizId: Subject<number> = new Subject<number>();
  private quizEndHash: Subject<string> = new Subject<string>();

  get isScreenBlock$(){
    return this.isScreenBlock.asObservable();
  }
  get quizId$(){
    return this.quizId.asObservable();
  }
  get quizEndHash$(){
    return this.quizEndHash.asObservable();
  }

  changeValue(data: boolean){
    this.isScreenBlock.next(data);
  }
  changeValueQuizId(data: number){
    this.quizId.next(data);
  }
  changeValueQuizEndHash(data: string){
    this.quizEndHash.next(data);
  }

}
