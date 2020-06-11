import { Component, OnInit } from '@angular/core';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-completed-add',
  templateUrl: './completed-add.component.html',
  styleUrls: ['./completed-add.component.css']
})

export class CompletedAddComponent implements OnInit {
  checkIcon = faCheckSquare;
  removeIcon = faTimes;
  accessChoise: string = '';
  emails: { email: string }[];

  constructor(
    private clipboardService: ClipboardService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.emails = [];
  }

  copyToClipboard(text: string) {
    if ((text.trim() === '') || (!(text.includes('http')))) {

    } else {
      this.clipboardService.copyFromContent(text);
      this.toastr.info('Посилання скопійовано');
    }

  }

  addEmailInput() {
    this.emails.push({ email: '' });
  }

  removeEmail(index: number) {
    this.emails.splice(index, 1);

  }

  sendtoEmails(){
   this.toastr.info('Учасникам буде надіслано запрошення');
  }

}
