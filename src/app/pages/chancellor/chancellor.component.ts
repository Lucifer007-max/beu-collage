import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-chancellor',
  templateUrl: './chancellor.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],

  styleUrls: ['./chancellor.component.scss']
})
export class ChancellorComponent {
  constructor(public router: Router) {
    console.log("Current URL:", this.router.url);
  }
}
