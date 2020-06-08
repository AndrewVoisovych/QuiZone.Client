import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { share } from 'rxjs/operators';

@Component({
  selector: 'navbar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  activeFragment = this.route.fragment.pipe(share()); 
  
  constructor(
    public router: Router,
    private authService: AuthenticationService,
    public route: ActivatedRoute) { }

  ngOnInit() {

  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
