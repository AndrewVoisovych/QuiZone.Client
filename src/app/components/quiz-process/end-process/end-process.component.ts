import { Answer } from './../../../core/models/question';
import { TempService } from './../../../core/services/temp.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-end-process',
  templateUrl: './end-process.component.html',
  styleUrls: ['./end-process.component.css']
})
export class EndProcessComponent implements OnInit {
  answers: boolean = false;
  result: string = "триває обрахування...";
  resultPredicate: boolean = false;
  imagePath: string = '/assets/img/success.png';
  constructor(private temp:TempService) { }

  ngOnInit() {


    console.log("====TEST====");

    console.log("====TEST====");

    setTimeout(() => {
      this.result = "80% / 100%";
      this.resultPredicate = true;
      this.imagePath = '/assets/img/success-g.png';
    }, 3000);


  }
}
