import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-two',
  templateUrl: './result-two.component.html',
  styleUrls: ['./result-two.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export default class ResultTwoComponent {
  regNo: string = '';
  showError: boolean = true;
  examName =''
  showResult() {
    // Example validation (you can replace with real API check)
    if (!this.regNo || this.regNo !== 'VALID123') {
      this.showError = true;
    } else {
      this.showError = false;
      // Redirect to result page or show actual data
    }
  }


  constructor(public router: Router) {
    const rawSegment = this.router.url.split('/')[2];
    const cleanName = decodeURIComponent(rawSegment);
    this.examName = cleanName
    console.log("Decoded Exam Name:", cleanName);
    }
  onExamClick(exam: any) {
    console.log('Clicked Exam:', exam);
    // Example: navigate to detail page or open modal
    // this.router.navigate(['/result', exam.id]);
  }

}
