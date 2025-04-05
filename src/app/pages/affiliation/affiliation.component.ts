import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-affiliation',
  templateUrl: './affiliation.component.html',
  standalone:true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./affiliation.component.scss']
})
export class AffiliationComponent {
  list:any =[];
  noData: boolean = false;
  imgUrl = environment.imgUrl;
  selectedType: any = '';
  selectedSession: any = '';

  constructor(public service:ApiService) {
    this.getList('','')
  }

  getList(type: any, session: any) {
    this.list = [];
    this.noData = false;

    const payload: any = {};
    if (type) payload.type = type;
    if (session) payload.session = session;

    this.service.affiliationGet(payload).subscribe((res: any) => {
      if (res?.length > 0) {
        this.list = res;
      } else {
        this.list = [];
        this.noData = true;
      }
    });
  }



  handleChange(e: any) {
    this.selectedType = e.target.value;
    this.getList(this.selectedType, this.selectedSession);
  }

  onDateSelect(event: any) {
    const year = event.target.value.split('-')[0];
    this.selectedSession = year;
    this.getList(this.selectedType, this.selectedSession);
  }

}

