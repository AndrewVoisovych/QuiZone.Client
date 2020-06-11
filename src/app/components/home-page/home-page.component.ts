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
            `${result}, you can successfully login!`,
            'Your email has been successfully verified'
          );
        },
        error => {
          if (error.status === 404) {
            this.toastr.error(
              'There is no user with this mail',
              'Error!'
            );
          } else if (error.status === 409) {
            this.toastr.error(
              `Email: ${error.error} is already verified`,
              'Error!'
            );
          } else if (error.status === 400) {
            this.toastr.error(
              'Verification error',
              'Error!'
            );
          }
        }
      );




  }

}
