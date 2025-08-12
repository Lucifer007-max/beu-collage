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
    }else if(url === "/organization/executive-council") {
      this.pageTitle = 'Executive Council';
    }else if(url === "/organization/academic-council") {
      this.pageTitle = 'Academic Council';
    } else if(url === "/organization/finance-committee") {
      this.pageTitle = 'Finance Committee';
    }
    else if(url === "/organization/examination-board") {
      this.pageTitle = 'Examination Board';
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
                    name: 'Dr. Pradip Kumar, IES (Retd.)',
                    // degree: 'M.A., Ph.D., PGD in Public Administrator & Local Self Government',
                    degree: '',
                    designation: 'Registrar'
                  },
                  { name: 'Dr. Bijendra Kumar', degree: '', designation: 'Examination Controller' },
                  { name: 'Upendra Kumar Singh', degree: '', designation: 'Finance Officer' },
                  { name: 'Dr. Sunny Chandra', degree: '', designation: 'Deputy Registrar' },
                  { name: 'Dr. Shiv Kumar Rai', degree: '', designation: 'Deputy Examination Controller' },
                  { name: 'Kumari Chandni', degree: '', designation: 'Assistant Registrar' },
                  { name: 'Ramprit Baitha', degree: '', designation: 'Assistant Registrar' },
                  { name: 'Dr. Anita Kumari', degree: '', designation: 'Assistant Examination Controller' },
                  { name: 'Anisha', degree: '', designation: 'Assistant Examination Controller' },
                  { name: 'Vikas Kumar', degree: '', designation: 'OSD' },
                  { name: 'Niraj Kumar', degree: '', designation: 'Training & Placement Officer' }
                ];

  executiveCouncilMembers = [
    // 'The Vice-Chancellor of the University;',
    'The Vice-Chancellor who shall be the Chairman;', // said by Vishal ji BEU
    'Additional chief Secretary/ Principal Secretary/Secretary, Department of Science and technology, Government of Bihar or his/her representative not below the rank of joint secretary;',
    'Additional chief Secretary/ Principal Secretary/ Secretary, Department of Education, Government of Bihar or his/her representative not below the rank of joint secretary;',
    'Additional chief Secretary/ Principal Secretary /Secretary, Department of Finance, Government of Bihar or his/her representative not below the rank of joint secretary;',
    'Director, Indian Institute of Technology, Patna or his/her representative not below the rank of professor;',
    'Director, National Institute of Technology, Patna or his/her representative not below the rank of professo;r',
    'Director, Chandragupta Institute of Management, Patna or his/her representative not below the rank of professor;',
    'Director, Development Management Institute, Patna or his/ her representative not below the rank of professor;',
    'Head of Department, Department of Architecture, National Institute of Technology, Patna;',
    'Director, Department of Science and technology, Government of Bihar;',
    'The Registrar of the University shall act as ex-officio Member-Secretary to the Executive Council;',
    'Three teachers to be nominated by the Vice Chancellor of whom, one shall be from amongst Heads of Department, one from Professors and one from Associate Professors by rotation for a period of one year each from Government engineering colleges;'
  ];

  academicCouncilMembers = [
    'The Vice-Chancellor who shall be the Chairman;',
    'Director, Indian Institute of Technology, Patna or his/her representative not below the rank of professor;',
    'Director, National Institute of Technology, Patna or his/her representative not below the rank of professor;',
    'Director, Chandragupta Institute of Management, Patna or his/her representative not below the rank of professor;',
    'Director, Development Management Institute, Patna or his/her representative not below the rank of professor;',
    'Head of Department, Department of Architecture, National Institute of Technology Patna;',
    'Three persons from amongst educationists of repute or men of letters or members of the learned profession or eminent public men, who are not in the service nominated by the Chancellor;',
    'A nominee of the All India Council for Technical Education;',
    'Director, Department of Science and technology, Government of Bihar;',
    'Ten Principals of the Government Engineering colleges of Bihar on rotation for a period of three years to be nominated by the Government of Bihar;',
    'Three members of the teaching staff; one each respectively representing the Professor, Associate and Assistant Professors of Government Engineering colleges, nominated by the Vice- Chancellor for a period of three years;',
    'The Registrar of the University shall act as ex-officio Secretary to the Academic Council.'
  ]

  financeCommittee =[
    'The Vice-Chancellor as the Chairman',
    'Two officers nominated by the Department of Science & Technology, Govt. of Bihar.',
    'Three persons to be nominated by the Executive council, out of whom at least one shall be a member of the Executive council;',
    'Two persons to be nominated by the State Government from amongst teachers not below the rank of Associate Professor.',
    'The Registrar',
    'The Finance Officer, Member-Secretary.'
  ]


}
