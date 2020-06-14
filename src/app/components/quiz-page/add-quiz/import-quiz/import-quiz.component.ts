import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-import-quiz',
  templateUrl: './import-quiz.component.html',
  styleUrls: ['./import-quiz.component.css']
})
export class ImportQuizComponent implements OnInit {

  constructor(    private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  ImportData():void{
    $('#importData').modal('hide');
    this.toastr.info('Дані успішно імпортовано','Результат імпорту');
  }
}
