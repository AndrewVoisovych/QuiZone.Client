import { UserService } from './../../core/services/user.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  email: string;
  hash: string;


  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

  }




  ngOnInit() {
    // Email Confirm
    if (this.route.snapshot.params.email && this.route.snapshot.params.hash) {
      this.email = this.route.snapshot.params.email;
      this.hash = this.route.snapshot.params.hash;

      if (this.email !== '' && this.hash !== '') {
        this.confirmEmail();
      }
    }
  }




  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  private confirmEmail() {
    this.userService
      .confirmEmail(this.email, this.hash)
      .subscribe(
        result => {
          this.toastr.success(
            `${result}, ви можете авторизуватись!`,
            'Вашу пошту успішно підтверджено'
          );
        },
        error => {
          if (error.status === 404) {
            this.toastr.error(
              'Користувача з такою поштою не існує',
              'Помилка!'
            );
          } else if (error.status === 409) {
            this.toastr.error(
              `Пошта: ${error.error} вже підтверджена`,
              'Помилка!'
            );
          } else if (error.status === 400) {
            this.toastr.error(
              'Помилка підтвердження пошти',
              'Помилка!'
            );
          }
        }
      );




  }

}
