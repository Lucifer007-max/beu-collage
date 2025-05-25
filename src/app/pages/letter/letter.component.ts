import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class LetterComponent {
  // dataList = [
  //   {
  //     id: 1,
  //     description: 'Letter no 65 dated 14-03-2023 ',
  //     url: 'http://beu-bih.ac.in/BEUP/UploadedImage/Act_Image/doct2023329172054996.pdf',
  //     isNew: true
  //   },
  //   {
  //     id: 2,
  //     description: 'Letter no. 2415',
  //     url: 'http://beu-bih.ac.in/BEUP/UploadedImage/Act_Image/doct2025216175730778.pdf',
  //     isNew: true
  //   }
  // ];

  constructor(public router: Router) {
    console.log("Current URL:", this.router.url);
  }

  downloadFile(fileUrl: string) {
    window.open(fileUrl, '_blank');
  }
}
