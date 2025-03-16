import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';
declare const $: any;

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
  merchandiesList: any = [];
  // testimonials:any;
  isSliderInitialized: boolean = false;
  constructor(private service: ApiService) { }


  ngOnInit(): void {
    this.getBanner();
    this.getCourse();
    this.getTestimonial();
    this.getMerchandies();
  }

  getBanner() {
    this.service.bannerGet().subscribe((res: any) => {
      this.bannerList = res;
    })
  }
  getCourse() {
    this.service.courseGet().subscribe((res: any) => {
      this.courseList = res;
    })
  }
  getMerchandies() {
    this.service.merchandesGet().subscribe((res: any) => {
      this.merchandiesList = res;
    })
  }
  getTestimonial() {
    this.service.testimonialGet().subscribe((res: any) => {
      this.testimonialList = res;
      console.log(this.testimonialList, res);
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

  ngAfterViewInit() {
    this.autoScroll("important-information");
    this.autoScroll("notice-board");
    this.autoScroll("college-events");
  }

}
