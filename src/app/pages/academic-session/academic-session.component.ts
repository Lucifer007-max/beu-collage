import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-academic-session',
  templateUrl: './academic-session.component.html',
  standalone:true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./academic-session.component.scss']
})
export default class AcademicSessionComponent {
  URLId:any;
  dataList: any = []; // can be array or string
  constructor(public route: ActivatedRoute, public service: ApiService) {
    this.route.params.subscribe((params:any) => {
      // this.URLId = params['id'];
      this.getSessionFileList(params['id'])
      console.log(this.URLId)
    })
    
  }


  getSessionFileList(id:any) {
    this.service.coursesessionGetFileById(id).subscribe((res) => {
      console.log(res)
      this.dataList = res
    })
  }
}
