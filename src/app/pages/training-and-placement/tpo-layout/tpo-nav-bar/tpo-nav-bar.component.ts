import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tpo-nav-bar',
  templateUrl: './tpo-nav-bar.component.html',
  styleUrls: ['./tpo-nav-bar.component.scss']
})
export class TpoNavBarComponent {

   isCollapsed = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }


  isActiveRoute(route: string): boolean {
  return this.router.url.startsWith(route);
}


  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/tpo-login']);
  }

}
