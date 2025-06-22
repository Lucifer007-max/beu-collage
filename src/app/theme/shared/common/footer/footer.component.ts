import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Firestore, doc, getDoc, setDoc, updateDoc, increment } from '@angular/fire/firestore';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  today: Date = new Date();
  visitorCount: number = 0;

  constructor(private firestore: Firestore) {
    this.trackVisitor();
  }

  async trackVisitor() {
    // Only count if the visitor is new
    const hasVisited = localStorage.getItem('hasVisited');

    if (!hasVisited) {
      await this.incrementVisitorCount();
      localStorage.setItem('hasVisited', 'true');
    }

    this.visitorCount = await this.getVisitorCount();
  }

  async incrementVisitorCount() {
    const docRef = doc(this.firestore, 'site', 'visitorCounter');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      await updateDoc(docRef, { count: increment(1) });
    } else {
      await setDoc(docRef, { count: 1 });
    }
  }

  async getVisitorCount(): Promise<number> {
    const docRef = doc(this.firestore, 'site', 'visitorCounter');
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data()['count'] : 0;
  }



}
