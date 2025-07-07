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
  semesterId :any;
  semesterRoman: string = '';
  isLoading = false;
  resultData: any;
  // resultData: any = null;
  // showErrorPage = false;
  // isLoading = false;
  errMsg:any = ''


  private toRoman(num: number): string {
    const map: { [key: number]: string } = {
      1: 'I', 2: 'II', 3: 'III', 4: 'IV',
      5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII'
    };
    return map[num] || num.toString();
  }



  showResult() {
    this.isLoading = true;

    this.apiService.resultGet(this.sessionYear, this.regNo, this.semesterId).subscribe({
      next: (res) => {
        if (res && res.status === 200) {
          console.log("res", this.resultData)
          this.resultData = res.data;
          this.router.navigate(['/result-three'], {
            // state: { resultData: res.data },
            queryParams: { name: this.examName,semester: this.semesterId, session:this.sessionYear , regNo:this.regNo}
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
      // this.semesterId = +params['semester'];
      const semesterNum = +params['semester'];
      this.sessionYear = params['session'];

      // this.semesterId = semesterNum; // keep original number if you want
      this.semesterId = this.toRoman(semesterNum);
    });

  }
  onExamClick(exam: any) {
    this.apiService.resultGet(String(this.sessionYear), this.regNo, this.semesterId).subscribe((res) => {
      console.log(res)
    })
  }

}
