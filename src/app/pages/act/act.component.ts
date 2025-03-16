import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-act',
  templateUrl: './act.component.html',
  styleUrls: ['./act.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class ActComponent {
  actDataList = [
    {
      id: 1,
      description: 'Act No. 20 of 2021, Bihar',
      url: 'http://beu-bih.ac.in/BEUP/UploadedImage/Act_Image/doct202332917172468.pdf',
      isNew: true
    },
    {
      id: 2,
      description: 'STATUTES OF THE UNIVERSITY [Vide Section 28 and 29 (1) of the Act]',
      url: 'http://beu-bih.ac.in/BEUP/UploadedImage/Act_Image/doct2025219144536648.pdf',
      isNew: true
    },
    {
      id: 3,
      description: 'Letter no. 2415 and Regulation',
      url: 'http://beu-bih.ac.in/BEUP/UploadedImage/Act_Image/doct202332917172468.pdf',
      isNew: true
    },
    {
      id: 4,
      description: 'Regulation',
      url: 'http://beu-bih.ac.in/BEUP/UploadedImage/Act_Image/doct2025219144536648.pdf',
      isNew: true
    }
  ];

  constructor(public router: Router) {
    console.log("Current URL:", this.router.url);
  }

  downloadFile(fileUrl: string) {
    window.open(fileUrl, '_blank');
  }
}
