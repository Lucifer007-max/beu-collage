import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  standalone:true,
  imports: [SharedModule, CommonModule, RouterModule],
  styleUrls: ['./pictures.component.scss']
})
export default class PicturesComponent {
  imgurl = environment.imgUrl
  pageTitle: string = '';

  albumList: any;
  constructor(private service: ApiService,public router: Router) {
    this.getMedia();
    console.log("Current URL:", this.router.url);
  }


  getMedia() {
    this.service.albumGet().subscribe((res: any) => {
    // this.service.albumGetAll().subscribe((res: any) => {
      this.albumList = res;
    });
  }
}
