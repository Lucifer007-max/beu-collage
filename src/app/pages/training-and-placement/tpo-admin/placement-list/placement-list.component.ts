import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-placement-list',
  templateUrl: './placement-list.component.html',
  styleUrls: ['./placement-list.component.scss'],
  standalone: true,
  imports:[CommonModule, RouterModule],
})
export class PlacementListComponent {

  constructor(public router: Router,){
    // console.log('Current URL:', this.router.url);
  }


  get isPlacementListPage(): boolean {
  return this.router.url === '/tpo/Add-placement';
}

placements = [
    {
      studentName: 'Alice Johnson',
      company: 'Google',
      position: 'Software Engineer',
      date: new Date('2025-05-12'),
      status: 'Selected',
    },
    {
      studentName: 'Bob Smith',
      company: 'Amazon',
      position: 'DevOps Engineer',
      date: new Date('2025-06-08'),
      status: 'Pending',
    },
    {
      studentName: 'Carol Taylor',
      company: 'Meta',
      position: 'Frontend Developer',
      date: new Date('2025-04-28'),
      status: 'Rejected',
    },
  ];


}
