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
  selectedYear: number = new Date().getFullYear();
  years: string[] = [];
  // years: number[] = [];
  constructor(public service:ApiService) {
    this.getList('','')

    for (let year = 2023; year <= 2025; year++) {
      this.years.push(`${year}-${(year + 1).toString().slice(-2)}`);
    }

  }

  getList(type: any, session: any) {
    this.list = [];
    this.noData = false;

    const payload: any = {};
    if (type) payload.type = type;
    if (session) payload.session = session;
    // payload.sortAlpha = true;
    this.service.affiliationGet(payload).subscribe((res: any) => {
      if (res?.length > 0) {
        this.list = res;

        // this.list = res.sort((a, b) => {
        //  if (a.type === '2' && b.type !== '2') return -1;
        //  if (a.type !== '2' && b.type === '2') return 1;
        //   return a.title.localeCompare(b.title);
        // });


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
    const year = event.target.value
    this.selectedSession = year;
    this.getList(this.selectedType, this.selectedSession);
  }

}

