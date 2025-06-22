import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './result-one.component.html',
  styleUrls: ['./result-one.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export default class ResultOneComponent {
  examData = [
    {
      course: 'M.Tech.',
      exams: [
        {
          name: 'M.Tech. 1st Semester Examination, 2023',
          session: '2023-25',
          published: '20-01-2025',
          id: 'mtech1'
        }
      ],
    },
    {
      course: 'MBA',
      exams: [
        {
          name: 'MBA 1st Semester Examination, 2023',
          session: '2023-25',
          published: '12-11-2024',
          id: 'mba1'
        }
      ],
    },
    {
      course: 'B.Arch.',
      exams: [
        {
          name: 'B. Arch. 2nd Semester Examination, 2024',
          session: '2023-28',
          published: '04-04-2025',
          id: 'barch2'
        },
        {
          name: 'B. Arch. 1st Semester Examination, 2023',
          session: '2023-28',
          published: '22-09-2024',
          id: 'barch1'
        },
      ],
    },
    {
      course: 'B.Tech.',
      exams: [
        {
          name: 'B.Tech. 4th Semester Examination, 2024',
          session: '2022-26',
          published: '22-05-2025',
          id: 'btech4'
        },
        {
          name: 'B.Tech. 7th Semester Examination, 2024',
          session: '2021-25',
          published: '11-05-2025',
          id: 'btech7'
        },
        {
          name: 'B.Tech. 1st to 8th Semester Examinations, 2024 (S)',
          session: '2020-24',
          published: '06-04-2025',
          id: 'btech-all'
        },
        {
          name: 'B.Tech. 2nd Semester Examination, 2024',
          session: '2023-27',
          published: '04-04-2025',
          id: 'btech2'
        },
      ],
    },
  ];


  constructor(public router: Router) {
    console.log("Current URL:", this.router.url);
  }
  onExamClick(exam: any) {
    console.log('Clicked Exam:', exam);
    // Example: navigate to detail page or open modal
    this.router.navigate(['/result-two/', exam.name]);
  }

}
