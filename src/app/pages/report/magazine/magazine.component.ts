import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-magazine',
  standalone: true,
  imports: [SharedModule, CommonModule,RouterModule],
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.scss']
})
export default class MagazineComponent {
  pageTitle: string = ''
  annualreportList:any;
  imgURL = environment.imgUrl
  constructor(public service: ApiService, public router: Router) {
    this.pageTitle = this.router.url.split('/')[1].toUpperCase();
    this.getMagzine()
  }
  getMagzine() {
    this.service.magzineGet().subscribe((res: any) => {
      this.annualreportList = res;
    });
  }
}
