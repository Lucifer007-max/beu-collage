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
  imgUrl = environment.imgUrl
  constructor(public service:ApiService) {
    this.getList('')
  }

  getList(type: any) {
    this.list = []; // Optional: clears previous data while loading
    this.service.affiliationGet(type).subscribe((res: any) => {
      if (res?.length > 0) {
        this.list = res;
        this.noData = false;
      } else {
        this.list = [];
        this.noData = true;
      }
    });
  }

  handleChange(e: any) {
    const selectedValue = e.target.value;
    this.getList(selectedValue)
  }
}

