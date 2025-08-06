import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from 'src/app/theme/shared/common/breadcrumb/breadcrumb.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-governance',
  templateUrl: './governance.component.html',
  styleUrls: ['./governance.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  
})
export class GovernanceComponent {

  constructor(public router: Router) {
    this.setPageTitle();
    console.log("Current URL:", this.router.url);
  }
  pageTitle: string = '';

  setPageTitle() {
    const url = this.router.url;
    // if (url === '/organization/chancellor') {
    //   this.pageTitle = "Hon'ble Chancellor";
    // } else if (url === '/organization/vice-chancellor') {
    //   this.pageTitle = 'Vice Chancellor';
    // } else if(url === "/organization/pro-vice-chancellor") {
    //   this.pageTitle = 'Pro Vice Chancellor';
    // }
    // else if(url === "/organization/executive-council") {
    //   this.pageTitle = 'Executive Council';
    // }
    // else if(url === "/organization/academic-council") {
    //   this.pageTitle = 'Academic Council';
    // }
    // else if(url === "/organization/finance-committee") {
    //   this.pageTitle = 'Finance Council';
    // }
    // else if(url === "/organization/examination-committee") {
    //   this.pageTitle = 'Examination Board';
    // }
    if (url === '/organization/BEU-Officials') {
      this.pageTitle = "BEU Officials";
    } else if(url === "/organization/organization-structure") {
      this.pageTitle = 'Organization Structure';
    }
    else {
      this.pageTitle = url.split('/')[2].toUpperCase();
    }

  }


  // officials = [
  //   {
  //     name: 'Dr. Pradip Kumar M.A., Ph.D., PGD in Public Administrator & Local Self Government',
  //     designation: 'Registrar'
  //   },
  //   { name: 'Dr. Bijendra Kumar', designation: 'Examination Controller' },
  //   { name: 'Upendra Kumar Singh', designation: 'Finance Officer' },
  //   { name: 'Dr. Sunny Chandra', designation: 'Deputy Registrar' },
  //   { name: 'Dr. Shiv Kumar Rai', designation: 'Deputy Examination Controller' },
  //   { name: 'Kumari Chandni', designation: 'Assistant Registrar' },
  //   { name: 'Ramprit Baitha', designation: 'Assistant Registrar' },
  //   { name: 'Anita Kumari', designation: 'Assistant Examination Controller' },
  //   { name: 'Anisha', designation: 'Assistant Examination Controller' },
  //   { name: 'Vikas Kumar', designation: 'OSD' },
  //   { name: 'Niraj Kumar', designation: 'Training & Placement Officer' }
  // ];
  officials = [
                  {
                    name: 'Dr. Pradip Kumar',
                    degree: 'M.A., Ph.D., PGD in Public Administrator & Local Self Government',
                    designation: 'Registrar'
                  },
                  { name: 'Dr. Bijendra Kumar', degree: '', designation: 'Examination Controller' },
                  { name: 'Upendra Kumar Singh', degree: '', designation: 'Finance Officer' },
                  { name: 'Dr. Sunny Chandra', degree: '', designation: 'Deputy Registrar' },
                  { name: 'Dr. Shiv Kumar Rai', degree: '', designation: 'Deputy Examination Controller' },
                  { name: 'Kumari Chandni', degree: '', designation: 'Assistant Registrar' },
                  { name: 'Ramprit Baitha', degree: '', designation: 'Assistant Registrar' },
                  { name: 'Anita Kumari', degree: '', designation: 'Assistant Examination Controller' },
                  { name: 'Anisha', degree: '', designation: 'Assistant Examination Controller' },
                  { name: 'Vikas Kumar', degree: '', designation: 'OSD' },
                  { name: 'Niraj Kumar', degree: '', designation: 'Training & Placement Officer' }
                ];


}
