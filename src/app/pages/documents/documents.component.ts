import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
})
export default class DocumentsComponent {
  imgUrl: any = environment.imgUrl
  List: any = [];
  flag: string = "";
  noticeBoard: any = [];
  importantLinksData: any = [];
  baseUrl= environment.imgUrl;
  constructor(public router: Router, public apiService: ApiService) {
    this.setPageTitle(this.router.url.split('/')[1]);
    this.router.url.split('/')[1]= this.flag;
    console.log("Current URL:", this.router.url.split('/')[1]);
  }

  setPageTitle(url: string) {
    switch (url) {
      case 'acts':
        this.getFile(url)
        console.log("Navigated to Acts Page");
        break;
      case 'circular':
        this.getFile(url)
        console.log("Navigated to Circular Page");
        break;
      case 'notification':
        // this.getFile(url)
        this.getNoticeBoard()
        console.log("Navigated to Notification Page");
        break;
      case 'links':
        // this.getFile(url)
        this.getImportantLink()
        console.log("Navigated to Notification Page");
        break;
      case 'download':
        this.getFile(url)
        console.log("Navigated to Download Page");
        break;
      case 'minutes':
        this.getFile(url)
        console.log("Navigated to minutes Page");
        break;
      case 'letter':
        this.getFile(url)
        console.log("Navigated to Letter Page");
        break;
      case 'curriculum':
        this.getFile(url)
        console.log("Navigated to Curriculum Page");
        break;
      default:
        console.log(`Navigated to unknown route: ${url}`);
        break;
    }

  }

  getFile(url: string) {
    this.apiService.fileGet(url).subscribe((res: any) => {
      this.List = res;
    });
  }

  getNoticeBoard() {
    this.apiService.noticeBoardGet().subscribe((res: any) => {
      this.noticeBoard = res;
    });
  }

  getImportantLink() {
    this.apiService.importantLinkGet().subscribe((res: any) => {
      this.importantLinksData = res
    });
  }
  get showSection(): boolean {
    const path = this.router.url.split('/')[1];
    return path !== 'notification' && path !== 'links';
  }

}
