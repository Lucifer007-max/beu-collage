import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterModule],
  styleUrls: ['./publication.component.scss']
})
export default class PublicationComponent {
  imgurl = environment.imgUrl
  pageTitle: string = '';

  pressList: any;
  constructor(private service: ApiService,public router: Router) {
    this.getPress();
    console.log("Current URL:", this.router.url);
  }


  getPress() {
    this.service.pressGet().subscribe((res: any) => {
      this.pressList = res;
    });
  }
}
