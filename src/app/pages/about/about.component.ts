import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from 'src/app/theme/shared/common/breadcrumb/breadcrumb.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { BreadcrumbComponent } from "../../theme/shared/components/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SharedModule],

  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export default class AboutComponent {
  constructor(public router: Router) {
    console.log("Current URL:", this.router.url);
  }

}
