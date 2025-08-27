import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-notification',
  templateUrl: './result-one.component.html',
  styleUrls: ['./result-one.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export default class ResultOneComponent {
  examData: any = [];

  constructor(public router: Router, private service: ApiService) {
    this.service.resultSemGet().subscribe((res: any) => {
      // Transform the data for binding
      this.examData = res.map((item: any) => {
        return {
          course: `${item.courseName}`, // You can replace this with actual course name if available
          exams: item.exams.map((exam: any) => ({
            name: exam.examName,
            session: `${exam.session}`,
            batchYear: exam.batchYear,
            examHeld: exam.examHeld,
            published: new Date(exam.publishDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })
            ,
            semId: exam.semId
          }))
        };
      });

      console.log(this.examData);
    });


  }

  onExamClick(exam: any) {
    this.router.navigate(['/result-two', exam.name], {
      queryParams: {
        semester: exam?.semId,
        session: exam?.batchYear?.toString()?.trim(),
        exam_held: exam?.examHeld?.toString()?.trim(),
      }
    });
  }




}
