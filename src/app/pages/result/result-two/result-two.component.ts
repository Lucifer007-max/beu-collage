import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/service/api.service';
import bootstrap from 'bootstrap';
import ResultThreeComponent from "../result-three/result-three.component";

@Component({
  selector: 'app-result-two',
  templateUrl: './result-two.component.html',
  styleUrls: ['./result-two.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, ResultThreeComponent],
})
export default class ResultTwoComponent {
  regNo: string = '';
  showError: boolean = true;
  examName = ''
  sessionYear = '';
  isLoading = false;
  resultData: any;
  // resultData: any = null;
  // showErrorPage = false;
  // isLoading = false;
  errMsg:any = ''
  showResult() {
    this.isLoading = true;

    this.apiService.resultGet(this.sessionYear, this.regNo).subscribe({
      next: (res) => {
        if (res && res.status === 200) {
          this.resultData = res.data;
          this.router.navigate(['/result-three'], {
            state: { resultData: res.data },
            queryParams: { name: this.examName }
          });
        } else {
          console.log(res.message);
          this.errMsg = res.message; // ✅ Corrected here
          this.showError = true;
        }
      },
      error: (err) => {
        console.error(err);
        this.errMsg = 'Something went wrong. Please try again.';
        this.showError = true;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }


  clearResult() {
    this.resultData = null;
    this.regNo = '';
  }


  // openModal() {
  //   const modalElement = document.getElementById('resultModal');
  //   if (modalElement) {
  //     const modal = new bootstrap.Modal(modalElement);
  //     modal.show();
  //   }
  // }



  constructor(public router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    const rawSegment = this.router.url.split('/')[2];

    const cleanName = decodeURIComponent(rawSegment);
    this.examName = cleanName.split('?')[0]

    this.route.queryParams.subscribe((params: any) => {
      this.sessionYear = params['session'];
      console.log('Session:', this.sessionYear);
    });

  }
  onExamClick(exam: any) {
    // console.log('Clicked Exam:', exam);
    this.apiService.resultGet(String(this.sessionYear), this.regNo).subscribe((res) => {
      console.log(res)
    })
    // this.router.navigate(['/result', exam.id]);
  }

}
