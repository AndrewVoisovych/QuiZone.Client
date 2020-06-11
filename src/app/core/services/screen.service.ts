import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ScreenService {
  private isScreenBlock: Subject<boolean> = new Subject<boolean>();

  get isScreenBlock$(){
    return this.isScreenBlock.asObservable();
  }
  changeValue(data: boolean){
    this.isScreenBlock.next(data);
  }
}
