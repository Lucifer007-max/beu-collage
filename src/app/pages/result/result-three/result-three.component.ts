import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-result-three',
  templateUrl: './result-three.component.html',
  styleUrls: ['./result-three.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export default class ResultThreeComponent {
  resultData: any;
  examName:any;
  constructor(private router: Router, private route: ActivatedRoute) {
    const nav = this.router.getCurrentNavigation();
    this.resultData = nav?.extras?.state?.['resultData'];
    this.route.queryParams.subscribe((params: any) => {
      this.examName = params['name'];
    });


    if (!this.resultData) {
      // Optional: handle empty state (e.g. redirect back or show error)
      this.router.navigate(['/']);
    }
  }


  @ViewChild('printSection') printSectionRef!: ElementRef;

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
            body { font-family: Arial, sans-serif; padding: 20px; }
            .no-print { display: none; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContents}
        </body>
      </html>
    `);
      popupWindow.document.close();
    }
  }




}
