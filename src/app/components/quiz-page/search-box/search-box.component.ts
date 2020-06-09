import { Component, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  query: string = '';

  constructor() { }

  ngOnInit() {
  }

  changeSearchQuery(){
    this.search.emit(this.query);
  }

}
