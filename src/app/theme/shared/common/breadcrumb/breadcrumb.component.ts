import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  standalone:true,
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  // @Input() bannerImage: string = 'assets/default-banner.jpg'; // Default image
  // @Input() title: string = ''; // Page title
  // @Input() subTitle: string = ''; // Page subtitle

  breadcrumbs: { label: string; url: string }[] = [];

}
