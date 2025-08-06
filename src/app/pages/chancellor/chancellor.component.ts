import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-chancellor',
  templateUrl: './chancellor.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],

  styleUrls: ['./chancellor.component.scss']
})
export class ChancellorComponent {
  constructor(public router: Router) {
    this.setPageTitle();
    console.log("Current URL:", this.router.url);
  }
  pageTitle: string = '';

  setPageTitle() {
    const url = this.router.url;
     if (url === '/organization/organization-structure') {
      this.pageTitle = "Organization Structure";
    }else if (url === '/organization/BEU-Officials') {
      this.pageTitle = "BEU Officials";
    }else if (url === '/organization/chancellor') {
      this.pageTitle = "Hon'ble Chancellor";
    } else if (url === '/organization/vice-chancellor') {
      this.pageTitle = 'Vice Chancellor';
    } else if(url === "/organization/pro-vice-chancellor") {
      this.pageTitle = 'Pro Vice Chancellor';
    }
    else if(url === "/organization/executive-council") {
      this.pageTitle = 'Executive Council';
    }
    else if(url === "/organization/academic-council") {
      this.pageTitle = 'Academic Council';
    }
    else if(url === "/organization/finance-committee") {
      this.pageTitle = 'Finance Council';
    }
    else if(url === "/organization/examination-committee") {
      this.pageTitle = 'Examination Board';
    }
    else {
      this.pageTitle = url.split('/')[2].toUpperCase();
    }
  }



}
