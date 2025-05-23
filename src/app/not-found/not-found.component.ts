import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  formattedTitle: string = '';

  constructor(public router: Router) {
    console.log("Current URL:", this.router.url);
    const rawSlug = this.router.url.split('/')[2];
    this.formattedTitle = this.formatTitle(rawSlug);

  }
  formatTitle(slug: string): string {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }


  academicsLinks = [
    { label: "Programmes", link: "/Academics/Programmes" },
    { label: "NBA Accredited Programs", link: "/Academics/NBA-Accredited-Programs" },
    { label: "NIRF Ranking", link: "/Academics/NIRF-Ranking" },
    { label: "Board of Studies", link: "/Academics/Board-of-Studies" },
    { label: "Industry Consultation Committee", link: "/Academics/Industry-Consultation-Committee" },
    { label: "Virtual Lab", link: "/Academics/Virtual-Lab" },
    {
      label: "Syllabus",
      link: "/Academics/Syllabus",
      subItems: [
        { label: "Ph.D", link: "/academic/3" },
        { label: "MTech", link: "/academic/2" },
        { label: "BTech", link: "/academic/1" }
      ]
    },
    { label: "Academic Calendar", link: "/Academics/Academic-Calendar" },
    { label: "Publications", link: "/Academics/Publications" },
    { label: "Faculty Development Programs (FDP)", link: "/Academics/FDP" },
    { label: "E-Learning Resources", link: "/Academics/E-Learning-Resources" },
    { label: "NPTEL Local Chapters", link: "/Academics/NPTEL-Local-Chapters" },
    { label: "NPTEL Online Certification", link: "/Academics/NPTEL-Online-Certification" },
    { label: "Value Education", link: "/Academics/Value-Education" }
  ];


  addmission =[
    { label: "Bachelors", link: "/Academics/NPTEL-Local-Chapters" },
    { label: "Masters", link: "/Academics/NPTEL-Online-Certification" },
    { label: "Doctoral Ph.D ", link: "/Academics/Value-Education" }
  ]

  examinationLinks = [
    { label: "Branch Codes", link: "/examination/branch-codes" },
    { label: "Examination Centre", link: "/examination/centre" },
    { label: "Examination Schedule", link: "/examination/schedule" },
    { label: "UFM Rules", link: "/examination/ufm-rules" },
    { label: "Scrutiny Rules", link: "/examination/scrutiny-rules" },
    { label: "Question Bank Portal", link: "/examination/question-bank" }
  ];


  serviceLinks = [
    { label: "Document Verification", link: "/services/document-verification" }
  ];


  rtiLinks = [
    { label: "Public Information Officers & Contact No.", link: "/rti/public-info" },
    { label: "Format of Application", link: "/rti/application-format" },
    { label: "Mandatory Disclosure", link: "/rti/mandatory-disclosure" },
    { label: "Download Act", link: "/rti/download-act" }
  ];


  lokpalLinks = [
    { label: "Appointment of Lokpal", link: "/lokpal/appointment-of-lokpal" },
    { label: "Lokpal Orders", link: "/lokpal/lokpal-orders" }
  ];

}
