// Angular Import
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Accessibility } from 'accessibility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // constructor
  constructor(private router: Router) {}

  // life cycle event
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    new Accessibility({
      // Optional config here
      icon: {
        // position: {
        //   bottom: { size: 20 },
        //   right: { size: 20 },
        //   type: 'fixed',
        // },
      },
    });
  }




}
