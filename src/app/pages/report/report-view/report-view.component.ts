import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  standalone:true,
  imports:[CommonModule,SharedModule,RouterModule],
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export default class ReportViewComponent {
  pageTitle: string = '';
  annualreportList:any =[];
  imgURL:string = environment.imgUrl;
  constructor(public service:ApiService,public router: Router) {this.getReport(); this.pageTitle = this.router.url.split('/')[1].toUpperCase() ;  console.log("Current URL:", this.router.url);
  }
  getReport() {
    this.service.reportGet().subscribe((res: any) => {
      this.annualreportList = res;
    });
  }
}
