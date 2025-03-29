import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';
declare const $: any;
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit, AfterViewChecked, AfterViewInit {
  bannerList: any;
  testimonialList: any = [];
  courseList: any = [];
  mentorList: any = [];
  notice:any =[];
  noticeBoard:any =[];
  importLink:any =[];
  events:any =[];
  baseUrl:String = environment.imgUrl;

  isSliderInitialized: boolean = false;
  constructor(private service: ApiService) { }


  ngOnInit(): void {
    this.getBanner();
    this.getNotice();
    this.getNoticeBoard();
    this.getImportantLink();
    this.getEvents();
    this.getAlerts();
    this.getMetor()
    // this.getTestimonial();
    // this.getMerchandies();
  }

  getBanner() {
    this.service.bannerGet().subscribe((res: any) => {
      this.bannerList = res.data;
    })
  }
  getNotice() {
    this.service.noticeGet().subscribe((res) => {
      this.notice = res.data[0].notice
    });
  }
  getNoticeBoard() {
    this.service.noticeBoardGet().subscribe((res:any) => {
      this.noticeBoard = res.data[0].board
      // if (res.data) {
      //   this.noticeForm.patchValue({
      //     id: res.data[0].id, // Set ID
      //     notice: res.data[0].board // Set Notice content
      //   });
      // }
    });
  }
  getImportantLink() {
    this.service.importantLinkGet().subscribe((res: any) => {
      this.importLink = res.data[0].implinks
      // if (res.data) {
      //   this.noticeForm.patchValue({
      //     id: res.data[0].id, // Set ID
      //     implinks: res.data[0].implinks // Set Notice content
      //   });
      // }
    });
  }
  getEvents() {
    this.service.eventsGet().subscribe((res) => {
      // if (res.data) {
      this.events = res.data[0].events
      //   this.eventForm.patchValue({
      //     id: res.data[0].id, // Set ID
      //     events: res.data[0].events // Set Notice content
      //   });
      // }
    });
  }
  getCourse() {
    this.service.courseGet().subscribe((res: any) => {
      this.courseList = res;
    })
  }
  getMetor() {
    this.service.mentorGet().subscribe((res: any) => {
      this.mentorList = res.data;
      console.log(res.data)
    })
  }
  getTestimonial() {
    this.service.testimonialGet().subscribe((res: any) => {
      this.testimonialList = res;
      console.log(this.testimonialList, res);
    });
  }

  alerts: any = []
  getAlerts() {
    this.service.alertsGet().subscribe((res) => {
      if (res.data) {
        this.alerts = res.data
        // this.noticeForm.patchValue({
        //   id: res.data[0].id, // Set ID
        //   notice: res.data[0].notice // Set Notice content
        // });
      }
    });
  }
  initializeSlider() {
    $('.testimonial-slider').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  moveUp(listId: string) {
    const list = document.getElementById(listId) || document.createElement('ul');
    const items = list?.children;

    if (items.length === 0) return;

    const firstItem = items[0] as HTMLElement;
    const height = firstItem.offsetHeight * -1;
    list.style.transition = "transform 0.5s ease-in-out";
    list.style.transform = `translateY(${height}px)`;
    setTimeout(() => {
      list.appendChild(items[0].cloneNode(true));
      list.removeChild(items[0]);
      list.style.transition = "none";
      list.style.transform = "translateY(0)";
    }, 500);
  }

  moveDown(listId: string) {
    const list = document.getElementById(listId) || document.createElement('ul');
    const items = list.children;
    const lastItem = items[items.length - 1].cloneNode(true);
    list.insertBefore(lastItem, items[0]);
    list.style.transition = "none";
    list.style.transform = "translateY(-40px)";
    setTimeout(() => {
      list.style.transition = "transform 0.5s ease-in-out";
      list.style.transform = "translateY(0)";
      setTimeout(() => {
        list.removeChild(items[items.length - 1]);
      }, 500);
    }, 10);
  }

  autoScroll(listId: string) {
    this.moveUp(listId);
    setTimeout(() => this.autoScroll(listId), 3000);
  }


  ngAfterViewChecked() {
    if (this.testimonialList.length > 0 && !this.isSliderInitialized) {
      this.initializeSlider();
      this.isSliderInitialized = true;
    }
  }

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
  ngAfterViewInit() {
    this.autoScroll("important-information");
    this.autoScroll("notice-board");
    this.autoScroll("college-events");
    // ngAfterViewInit() {
      setTimeout(() => {
        console.log('screoll acrtive')
        if (this.carousel) {
          new bootstrap.Carousel(this.carousel.nativeElement, {
            interval: 3000, // Change slide every 3 seconds
            ride: 'carousel'
          });
        }
      }, 1000); // Delay to ensure DOM is fully loaded
    // }
  }


  // ngAfterViewInit() {
  // }
}
