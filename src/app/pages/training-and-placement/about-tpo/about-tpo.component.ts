import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-tpo',
  templateUrl: './about-tpo.component.html',
  styleUrls: ['./about-tpo.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
})
export default class AboutTpoComponent {
imgUrl: any = environment.imgUrl
  flag: string = "";

   constructor(public router: Router, public apiService: ApiService) {
    this.setPageTitle(this.router.url.split('/')[1]);
    this.router.url.split('/')[1]= this.flag;
    console.log("Current URL:", this.router.url.split('/')[1]);
  }


  setPageTitle(url: string) {
    switch (url) {
      case 'Career':
        // this.getFile(url)
        console.log("Navigated to Career Page");
        break;
      case 'tpo-cell':
        // this.getFile(url)
        console.log("Navigated to tpo-cell Page");
        break;
      
    }

  }


   get showSection(): boolean {
    const path = this.router.url.split('/')[1];
    return path !== 'notification' && path !== 'links';
  }

  formatTitle(slug: string): string {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
