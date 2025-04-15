import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  standalone:true,
  imports: [SharedModule, CommonModule, RouterModule],

  styleUrls: ['./media.component.scss']
})
export default class MediaComponent {
  imgurl = environment.imgUrl
  pageTitle: string = '';

  mediaList: any;
  constructor(private service: ApiService,public router: Router) {
    this.getMedia();
    console.log("Current URL:", this.router.url);
  }


  getMedia() {
    this.service.mediaGet().subscribe((res: any) => {
      this.mediaList = res;
    });
  }
}
