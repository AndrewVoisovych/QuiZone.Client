import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-end-process',
  templateUrl: './end-process.component.html',
  styleUrls: ['./end-process.component.css']
})
export class EndProcessComponent implements OnInit {
  answers: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
