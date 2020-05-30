import { Injectable } from '@angular/core';
import { Role } from '../models/role.enum';
import { AuthenticationService } from '../services/authentication.service';
import { Router, CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  protected expectedRole: Role = Role.Admin;

  constructor(
    private service: AuthenticationService,
    private router: Router,
    private toast: ToastrService) { }

  canActivate(): boolean {
    const role = this.service.getRole();
    if (role === this.expectedRole) {
      return true;
    }
    this.toast.warning('Доступ заборонено');
    this.router.navigate(['home']);
    return false;
  }

}
