import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/service/api.service';
import { NgxPrintModule } from 'ngx-print'
@Component({
  selector: 'app-result-three',
  templateUrl: './result-three.component.html',
  styleUrls: ['./result-three.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, NgxPrintModule],
})
export default class ResultThreeComponent implements OnInit {
  resultData: any;
  examName: any;
  semesterNum: any;
  sessionYear: any;
  semesterId: any;
  regNo: any;
  currentDate: Date = new Date();

  @ViewChild('printSection') printSectionRef!: ElementRef;
  constructor(private router: Router, private route: ActivatedRoute, public apiService: ApiService) {
    const nav = this.router.getCurrentNavigation();
    this.route.queryParams.subscribe((params: any) => {
      const semesterNum = +params['name'];
      this.sessionYear = params['session'];
      this.semesterId = params['semester'];
      this.regNo = params['regNo'];
    });

    this.apiService.resultGet(this.sessionYear, this.regNo, this.semesterId).subscribe(((res) => {
      console.log(res.data)
      this.resultData = res.data
    }))
    // this.resultData = nav?.extras?.state?.['resultData'];
    // this.route.queryParams.subscribe((params: any) => {
    //   this.examName = params['name'];
    // });


    // if (!this.resultData) {
    //   // Optional: handle empty state (e.g. redirect back or show error)
    //   // this.router.navigate(['/']);
    // }
  }

  // resultData = {
  //   semester: 'IV',
  //   exam_held: 'November/2023',
  //   redg_no: '18101103041',
  //   name: 'ADARSH',
  //   father_name: 'GOPAL PANDEY',
  //   mother_name: 'POONAM PANDEY',
  //   college_code: '103',
  //   college_name: 'NETAJI SUBHAS INSTITUTE OF TECHNOLOGY, BIHTA',
  //   course_code: '101',
  //   course: 'CIVIL ENGINEERING',
  //   theorySubjects: [
  //     { code: '101401', name: 'Civil Engineering', ese: 53, ia: 25, total: 78, grade: 'B', credit: 2.0 },
  //     { code: '101402', name: 'Disaster Preparedness', ese: 52, ia: 24, total: 76, grade: 'B', credit: 2.0 },
  //     { code: '101403', name: 'Engineering Geology', ese: 53, ia: 25, total: 78, grade: 'B', credit: 3.0 },
  //     // ... more theory subjects
  //   ],
  //   practicalSubjects: [
  //     { code: '100408P', name: 'MOOC/NPTEL', ese: 'AB', ia: 'AB', total: 0, grade: 'F', credit: 2.0 },
  //     { code: '101403P', name: 'Engineering Geology Lab', ese: 16, ia: 20, total: 36, grade: 'B', credit: 1.0 },
  //     // ... more practical subjects
  //   ],
  //   sgpa: [7.71, 9.00, 7.92, 7.92, null, null, null, null],
  //   cgpa: 8.13,
  //   fail_any: 'FAIL:100408P'
  // };

  ngOnInit() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000); // updates every second
  }

  print() {
    const printContents = this.printSectionRef.nativeElement.innerHTML;
    const popupWindow = window.open('', '_blank', 'width=800,height=600');

    if (popupWindow) {
      popupWindow.document.open();
      popupWindow.document.write(`
      <html>
        <head>
          <title>Print Result</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .no-print { display: none; }
          </style>
        </head>
        <body onload="window.print(); window.close();" >
          ${printContents}
        </body>
      </html>
    `);
      popupWindow.document.close();
    }
  }




}
