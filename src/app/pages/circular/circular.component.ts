import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-circular',
  templateUrl: './circular.component.html',
  styleUrls: ['./circular.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class CircularComponent {
  circularDataList = [];

  constructor(public router: Router) {
    console.log("Current URL:", this.router.url);
  }
}
