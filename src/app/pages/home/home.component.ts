import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';
declare const $: any;
import * as bootstrap from 'bootstrap';
import * as AOS from 'aos';


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
  notice: any = [];
  noticeBoard: any = [];
  importLink: any = [];
  events: any = [];
  baseUrl: String = environment.imgUrl;
  imagePreview: any;
  isSliderInitialized: boolean = false;
  alerts: any = [];

  @ViewChild('exampleModal') exampleModal!: ElementRef;
  @ViewChildren('slicedImage') slicedImages!: QueryList<ElementRef>;
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  constructor(private service: ApiService) { }


  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      offset: 120,
      throttleDelay: 99,
      debounceDelay: 50
    });
    this.getBanner();
    this.getNotice();
    this.getNoticeBoard();
    this.getImportantLink();
    this.getEvents();
    this.getAlerts();
    this.getMetor()
    this.getModal();
  }
  getModal() {
    this.service.modalGet().subscribe((res: any) => {
      this.imagePreview = res.data[0].modalUrl;
    });
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
    this.service.noticeBoardGet(1).subscribe((res: any) => {
      this.noticeBoard = res;
    });
  }
  getImportantLink() {
    this.service.importantLinkGet(1).subscribe((res: any) => {
      this.importLink = res
    });
  }
  getEvents() {
    this.service.eventsGet().subscribe((res) => {
      this.events = res.data[0].events

    });
  }


  getMetor() {
    this.service.mentoruserGet().subscribe((res: any) => {
      this.mentorList = res.data;
    })
  }
  getTestimonial() {
    this.service.testimonialGet().subscribe((res: any) => {
      this.testimonialList = res;
    });
  }

  getAlerts() {
    this.service.alertsGet().subscribe((res) => {
      if (res.data) {
        this.alerts = res.data
      }
    });
  }


  moveUp(listId: string) {
    const list = document.getElementById(listId);
    if (!list) return;

    // Use querySelectorAll to ensure we grab live li elements
    const items = list.querySelectorAll('li');

    if (items.length === 0) return;

    const firstItem = items[0] as HTMLElement;
    const height = firstItem.offsetHeight * -1;

    list.style.transition = "transform 0.5s ease-in-out";
    list.style.transform = `translateY(${height}px)`;

    // Wait for the transition to finish
    setTimeout(() => {
      // Move the first item to the end
      list.appendChild(firstItem.cloneNode(true));
      list.removeChild(firstItem);

      // Reset styles
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


  ngAfterViewInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      offset: 120,
      throttleDelay: 99,
      debounceDelay: 50
    });
    this.autoScroll("important-information");
    this.autoScroll("notice-board");
    this.autoScroll("college-events");
  }

  handleModal() {
    const modalElement = this.exampleModal?.nativeElement;
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }


}
