import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from 'src/service/api.service';

@Injectable({
  providedIn: 'root',
})

export class tpoAuthguardGuard  implements CanActivate {
  constructor(private Api: ApiService, private router: Router) {}
  canActivate(): boolean {
    if (this.Api.isAuthenticated()) {
      return true;
    } else {
      this.Api.ErrorSnackbar('You are not Authorized ! Login Again')
      this.router.navigate(['/tpo-login']);
      return false;
    }
  }
};
