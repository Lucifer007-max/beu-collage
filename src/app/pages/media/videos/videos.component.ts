import { Component } from '@angular/core';
import { FooterComponent } from "../../../theme/shared/common/footer/footer.component";
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/service/api.service';
import { DataFilterPipe } from 'src/app/theme/shared/filter/data-filter.pipe';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  standalone:true,
  imports: [SharedModule, CommonModule , RouterModule, DataFilterPipe],
})
export default class VideosComponent {
  pageTitle: string = '';
  videosList:any;
  constructor(public router: Router,private service: ApiService) {
    this.getVideos();
    console.log("Current URL:", this.router.url);
  }

  getVideos() {
    this.service.videosGet().subscribe((res: any) => {
      this.videosList = res;
      console.log(res[0].videoURL.split('/')[3].split('=')[1])
    });
  }

}
