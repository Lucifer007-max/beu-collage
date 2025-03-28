import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from 'src/app/theme/shared/common/breadcrumb/breadcrumb.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { BreadcrumbComponent } from "../../theme/shared/components/breadcrumb/breadcrumb.component";

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

  setPageTitle() {
    const url = this.router.url;
    if (url === '/about/mission') {
      this.pageTitle = 'Mission';
    } else if (url === '/about/objective') {
      this.pageTitle = 'Objective';
    } else if(url === "about/vision") {
      this.pageTitle = 'Vision';
    }else {
      this.pageTitle = url.split('/')[2].toUpperCase() + "Comning Soon";

    }
  }

}
