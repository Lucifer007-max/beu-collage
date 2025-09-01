import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/service/api.service';
import { environment } from 'src/environments/environment';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-about-tpo',
  templateUrl: './about-tpo.component.html',
  styleUrls: ['./about-tpo.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export default class AboutTpoComponent {
imgUrl: any = environment.imgUrl
  flag: string = "";
  pageTitle: string = '';

   constructor(public router: Router, public apiService: ApiService) {
    // this.setPageTitle(this.router.url.split('/')[1]);
    this.setPageTitle();

    this.router.url.split('/')[1]= this.flag;
    // console.log("Current URL:", this.router.url.split('/')[1]);
  }


  setPageTitle() {
    const url = this.router.url;
    if (url === '/TPO-About-Us') {
      this.pageTitle = "About us";
    } else if(url === "/tpo/Tpo-mission") {
      this.pageTitle = 'Our Mission';
    }else if(url === "/tpo/Tpo-vision") {
      this.pageTitle = 'Our Vision';
    }else if(url === "/tpo/Training-and-placement-officer") {
      this.pageTitle = 'Training and Placement Officer';
    }else if(url === "/tpo/Industry-aligned-syllabus") {
      this.pageTitle = 'Industry Aligned Syllabus';
    } else if(url === "/tpo/Students-from-various-engineering-and-architecture-desciplines") {
      this.pageTitle = 'Students from various engineering and architecture desciplines';
    } else if(url === "/tpo/Well-infrastructure-supporting-practical-training-and-labs") {
      this.pageTitle = 'Well infrastructure supporting practical training and labs';
    } else if(url === "/tpo/Professional-ethics-like-communication-skills-team-work") {
      this.pageTitle = 'Professional ethics like communication skills, team work etc.';
    } else if(url === "/tpo/Register-as-company") {
      this.pageTitle = 'Register as company';
    } else if(url === "/tpo/Register-as-student") {
      this.pageTitle = 'Register as student';
    } else if(url === "/tpo/Job-Notification-Form-submission") {
      this.pageTitle = 'Job Notification Form (JNF) submission';
    } else if(url === "/tpo/Internship-Notification-Form-submission") {
      this.pageTitle = 'Internship Notification Form (INF) submission';
    } else if(url === "/Company-list-for-recruiting-FTE") {
      this.pageTitle = 'Company list for recruiting/FTE';
    } else if(url === "/Company-list-for-Internship") {
      this.pageTitle = 'Company list for Internship';
    } else if(url === "/tpo/Our-Alumni") {
      this.pageTitle = 'Our Alumni';
    } else if(url === "/tpo/Placement-Brochure") {
      this.pageTitle = 'Placement Brochure';
    }
    else if(url === "/tpo/contact") {
      this.pageTitle = 'Contact';
    }
    else {
      this.pageTitle = url.split('/')[2].toUpperCase();
    }

  }


   get showSection(): boolean {
    const path = this.router.url.split('/')[1];
    return path !== 'notification' && path !== 'links';
  }

  formatTitle(slug: string): string {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }


 missions = [
    {
      title: 'Bridging the Gap:',
      description: 'A primary goal is to connect students with the industry, acting as a bridge between academic learning and real-world job requirements.'
    },
    {
      title: 'Career Guidance:',
      description: 'Providing personalized career counselling, professional development workshops, and guidance on various career paths.'
    },
    {
      title: 'Industry Connect',
      description: 'Organising interactions with industry professionals, pre-placement talks, and events to expose students to different companies and sectors.'
    },
    {
      title: 'Skill Development',
      description: 'Focusing on developing both technical and soft skills, including communication, teamwork, and problem-solving, which are crucial for job success.'
    },
    {
      title: 'Placement Assistance',
      description: 'Providing end-to-end support for students during the placement process, including resume building, interview preparation, and mock tests.'
    },
    {
      title: 'Ensuring Placements',
      description: 'A key objective is to secure maximum placements for eligible students, often working towards 100% placement rates.'
    },
    {
      title: 'Industry Exposure',
      description: 'Facilitating internships, in-plant training, and other opportunities for students to gain practical experience in their chosen fields.'
    },
    {
      title: 'Continuous Improvement',
      description: 'Regularly evaluating and improving placement strategies and training programs based on industry trends and student feedback.'
    }
  ];


  industrySyllabusPoints = [
      {
        title: 'Focus on practical skills',
        description: 'Beyond theoretical knowledge, the syllabus emphasizes hands-on skills development through practical exercises, laboratory work, and projects that simulate real-world scenarios.'
      },
      {
        title: 'Industry-relevant technologies',
        description: 'The curriculum incorporates the latest technologies and tools used in various industries, ensuring students are familiar with current trends and practices.'
      },
      {
        title: 'Project-based learning',
        description: 'Students engage in projects that require them to apply their knowledge to solve practical problems, fostering critical thinking, problem-solving, and teamwork skills.'
      },
      {
        title: 'Collaboration with industry',
        description: 'Partnerships with industry leaders ensure the curriculum stays current and relevant, and provides students with valuable insights into industry practices and expectations, according to Bihar Engineering University.'
      },
      {
        title: 'Soft skills development',
        description: 'The syllabus also includes training in essential soft skills like communication, teamwork, and problem-solving, which are crucial for success in the workplace.'
      },
      {
        title: 'Adaptability and lifelong learningg',
        description: 'The curriculum encourages students to develop a mind-set of continuous learning and adaptability, enabling them to thrive in a rapidly evolving technological landscape.'
      }
    ];

    industryCourses = [
      'Programming Languages like Python, Java, and C++, along with newer languages relevant to specific industries;',
      'Entrepreneurship and Venture Development;',
      'Sales and Marketing;',
      'Data Science and AI;',
      'Cyber Security;',
      'Cloud Computing;',
      'Design Thinking;',
      'AI Tools and Applications.'
    ];

    industryBenefits = [
        {
          title: 'Improved employability',
          description: 'Students with industry-relevant skills are more likely to find jobs and succeed in their chosen fields.'
        },
        {
          title: 'Enhanced career readiness',
          description: 'Students gain practical experience and develop the skills needed to transition smoothly into the workforce.'
        },
        {
          title: 'Increased innovation and productivity',
          description: 'By fostering a culture of innovation and practical application, industry-aligned curricula can contribute to advancements in various industries.'
        },
        {
          title: 'Better alignment with industry needs',
          description: 'The curriculum ensures that students are equipped with the knowledge and skills that companies are actively seeking.'
        }
      ];




}
