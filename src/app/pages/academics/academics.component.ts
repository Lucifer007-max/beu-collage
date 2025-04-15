import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  standalone:true,
  imports: [CommonModule, SharedModule,RouterModule],
  styleUrls: ['./academics.component.scss']
})
export default class AcademicsComponent {
  URLId:any;
  dataList: any = []; // can be array or string
  constructor(public route: ActivatedRoute, public service: ApiService) {
    this.route.params.subscribe((params:any) => {
      // this.URLId = params['id'];
      this.getSessionList(params['id'])
      console.log(this.URLId)
    })
  }


  getSessionList(id:any) {
    this.service.coursesessionGetById(id).subscribe((res) => {
      console.log(res)
      this.dataList = res
    })
  }
}
