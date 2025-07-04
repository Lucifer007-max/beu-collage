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
  examData:any = [];





  constructor(public router: Router, private service: ApiService) {
    console.log("Current URL:", this.router.url);
    this.service.resultSemGet().subscribe((res: any) => {
      // Transform the data for binding
      this.examData = res.map((item: any) => {
        return {
          course: `${item.courseName}`, // You can replace this with actual course name if available
          exams: item.exams.map((exam: any) => ({
            name: exam.examName,
            session: `${exam.batchYear} / ${exam.session}`,
            published: new Date(exam.publishDate).toLocaleDateString()
          }))
        };
      });

      console.log(this.examData);
    });


  }
  onExamClick(exam: any) {
    console.log('Clicked Exam:', exam);
    // Example: navigate to detail page or open modal
    this.router.navigate(['/result-two', exam.name], {
      queryParams: { session: exam?.session?.toString()?.trim() }
    });
  }




}
