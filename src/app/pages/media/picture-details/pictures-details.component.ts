import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-pictures-details',
  templateUrl: './pictures-details.component.html',
  standalone:true,
  imports: [SharedModule, CommonModule, RouterModule],
  styleUrls: ['./pictures-details.component.scss']
})
export default class PicturesDetailsComponent {
  imgurl = environment.imgUrl
  pageTitle: string = '';

  albumList: any;
  constructor(private service: ApiService,public router: Router) {
    this.getAlbumAll();
    this.pageTitle = this.router.url.split('/')[2].toUpperCase();
    console.log("Current URL:", this.router.url.split('/')[3]);
  }


  getAlbumAll() {
    this.service.albumGetAll(this.router.url.split('/')[3]).subscribe((res: any) => {
      this.albumList = res;
    });
  }
}
