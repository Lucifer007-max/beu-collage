import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  styleUrls: ['./academics.component.scss']
})
export default class AcademicsComponent {
  URLId: any;
  dataList: any = []; // can be array or string
  pageTitle: string = '';
  constructor(public route: ActivatedRoute, public service: ApiService, public router: Router) {
    this.route.params.subscribe((params: any) => {
      // this.URLId = params['id'];
      this.getSessionList(params['id'])
      console.log(this.URLId)
    })
    this.setPageTitle();

  }


  getSessionList(id: any) {
    this.service.coursesessionGetById(id).subscribe((res) => {
      console.log(res)
      this.dataList = res
    })
  }

  academicsLinks = [
    {
      label: "Programmes", link: "/academics/Program",
      subItems: [
        { label: "Ph.D", link: "/academics/Program/Ph.D" },
        { label: "M.Tech", link: "/academics/Program/M.Tech" },
        { label: "B.Tech", link: "/academics/Program/B.Tech" }
      ]
    },
    { label: "NBA Accredited Programs", link: "/Academics/NBA-Accredited-Programs" },
    { label: "NIRF Ranking", link: "/Academics/NIRF-Ranking" },
    { label: "Board of Studies", link: "/Academics/Board-of-Studies" },
    { label: "Industry Consultation Committee", link: "/Academics/Industry-Consultation-Committee" },
    { label: "Virtual Lab", link: "https://www.vlab.co.in/participating-institute-iit-bombay" },
    {
      label: "Syllabus",
      link: "/Academics/Syllabus",
      subItems: [
        { label: "Ph.D", link: "/academic/3" },
        { label: "M.Tech", link: "/academic/2" },
        { label: "B.Tech", link: "/academic/1" }
      ]
    },
    { label: "Academic Calendar", link: "/Academics/Academic-Calendar" },
    { label: "Publications", link: "/Academics/Publications" },
    { label: "Faculty Development Programs (FDP)", link: "/Academics/Faculty-Development-Programs" },
    { label: "E-Learning Resources", link: "/Academics/E-Learning-Resources" },
    { label: "NPTEL Local Chapters", link: "/Academics/NPTEL-Local-Chapters" },
    { label: "NPTEL Online Certification", link: "/Academics/NPTEL-Online-Certification" },
    // { label: "Value Education", link: "/Academics/Value-Education" }
  ];


  setPageTitle() {
    const url = this.router.url;
    if (url === '/academics/Program') {
      this.pageTitle = 'Program';
    } else if (url === '/academics/Program/Ph.D') {
      this.pageTitle = 'Ph.D Programmes';
    }
    else if (url === '/academics/Program/M.Tech') {
      this.pageTitle = 'M.Tech Programmes';
    } else if (url === '/academics/Program/B.Tech') {
      this.pageTitle = 'B.Tech Programmes';
    }
  }

  handleItemClick(item: any, event: Event) {
    if (item.title === 'Virtual Lab' || item.label === 'Virtual Lab') {
      event.preventDefault(); // stop normal navigation
      Swal.fire({
        title: 'Virtual Lab Access',
        text: 'You are being redirected to an external Virtual Lab website.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          window.open('https://www.vlab.co.in/participating-institute-iit-bombay', '_blank');
        }
      });
    }
    else {

    }
  }
  courseData = {
    mtech: [
      {
        department: "Department of Mechanical Engineering",
        branches: ["Machine Design", "Thermal Engineering", "Manufacturing Technology", "Energy System and Management", "Manufacturing Engineering"]
      },
      {
        department: "Department of Electronics & Communication Engineering",
        branches: ["Advanced Electronics and Communication Engineering", "VLSI Design", "Signal Processing and VLSI Technology", "Micro Electronics & VLSI Technology", "Advance Communication Technology", "Electronics and Communication Engineering"]
      },
      {
        department: "Department of Civil Engineering",
        branches: ["Geotechnical Engineering", "Transportation Engineering", "Structural Engineering"]
      },
      {
        department: "Department of Computer Science & Engineering",
        branches: ["Computer Science & Engineering", "Cyber Security"]
      },
      {
        department: "Department of Electrical Engineering",
        branches: ["Electrical Energy Systems", "Power System", "Electrical Power System"]
      }
    ]
  };

}
