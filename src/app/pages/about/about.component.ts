import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from 'src/app/theme/shared/common/breadcrumb/breadcrumb.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { BreadcrumbComponent } from "../../theme/shared/components/breadcrumb/breadcrumb.component";
import * as AOS from 'aos';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],

  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export default class AboutComponent {
  pageTitle: string = '';
  constructor(public router: Router) {
    this.setPageTitle();
    console.log("Current URL:", this.router.url);
  }

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      offset: 120,
      throttleDelay: 99,
      debounceDelay: 50
    });
  }

  setPageTitle() {
    const url = this.router.url;
    if (url === '/about/mission') {
      this.pageTitle = 'Mission';
    } else if (url === '/about/objective') {
      this.pageTitle = 'Objective';
    } else if(url === "/about/vision") {
      console.log(url)
      this.pageTitle = 'Vision';
    }else {
      this.pageTitle = url.split('/')[2].toUpperCase() + " Comning Soon";

    }
  }

}
