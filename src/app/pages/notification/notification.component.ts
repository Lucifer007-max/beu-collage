import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class NotificationComponent {
  dataList = [
    {
      id: 1,
      description: 'Act No. 20 of 2021, Bihar',
      url: 'http://beu-bih.ac.in/BEUP/UploadedImage/Act_Image/doct202332917172468.pdf',
      isNew: true,
      updatedOn: '09-February-2022'
    },
    {
      id: 2,
      description: 'STATUTES OF THE UNIVERSITY [Vide Section 28 and 29 (1) of the Act]',
      url: 'http://beu-bih.ac.in/BEUP/UploadedImage/Act_Image/doct2025219144536648.pdf',
      isNew: true,
      updatedOn: '09-February-2022'
    },
    {
      id: 3,
      description: 'Letter no. 2415 and Regulation',
      url: 'http://beu-bih.ac.in/BEUP/UploadedImage/Act_Image/doct202332917172468.pdf',
      isNew: true,
      updatedOn: '09-February-2022'
    },
    {
      id: 4,
      description: 'Regulation',
      url: 'http://beu-bih.ac.in/BEUP/UploadedImage/Act_Image/doct2025219144536648.pdf',
      isNew: true,
      updatedOn: '09-February-2022'
    }
  ];

  constructor(public router: Router) {
    console.log("Current URL:", this.router.url);
  }

}
