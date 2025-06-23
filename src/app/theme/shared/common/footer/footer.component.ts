import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Firestore, doc, getDoc, setDoc, updateDoc, increment } from '@angular/fire/firestore';
import { Firestore, doc, getDoc, setDoc, updateDoc, increment, collection, setDoc as fsSetDoc, getDocs, query, where, deleteDoc } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  today: Date = new Date();
  visitorStats: any = { total: 0, today: 0, yesterday: 0, online: 0 };
  todayStr = new Date().toISOString().slice(0, 10); // Format: "YYYY-MM-DD"
  onlineUserCount:any;
  constructor(private firestore: Firestore) {
    this.trackVisitors();
    setInterval(() => this.getVisitorStats(), 30000); // refresh every 30s

    // this.trackVisitor();
    // this.trackOnlineUser();
    // this.updateOnlineCount();
    // setInterval(() => this.updateOnlineCount(), 30000);
  }

  // async trackVisitor() {
  //   const docRef = doc(this.firestore, 'site', 'visitorStats');
  //   const snap = await getDoc(docRef);
  //   const visitedDate = localStorage.getItem('visitedDate');
  //   const alreadyVisitedToday = visitedDate === this.todayStr;

  //   if (snap.exists()) {
  //     const data = snap.data();
  //     let updates: any = {};

  //     // Rotate today → yesterday if new day
  //     if (data['lastVisitDate'] !== this.todayStr) {
  //       updates.yesterday = data['today'] || 0;
  //       updates.today = alreadyVisitedToday ? data['today'] : 1;
  //       updates.total = alreadyVisitedToday ? data['total'] : increment(1);
  //       updates.lastVisitDate = this.todayStr;
  //     } else {
  //       if (!alreadyVisitedToday) {
  //         updates.today = increment(1);
  //         updates.total = increment(1);
  //       }
  //     }

  //     await updateDoc(docRef, updates);
  //   } else {
  //     // First ever visitor
  //     await setDoc(docRef, {
  //       today: 1,
  //       yesterday: 0,
  //       total: 1,
  //       online: 1,
  //       lastVisitDate: this.todayStr
  //     });
  //   }

  //   // ✅ Save localStorage flag (avoid repeat for today/total)
  //   localStorage.setItem('visitedDate', this.todayStr);

  //   // ✅ Handle 'online' counter (only once per session)
  //   const isOnlineTracked = sessionStorage.getItem('isOnlineTracked');

  //   if (!isOnlineTracked) {
  //     await updateDoc(docRef, { online: increment(1) });
  //     sessionStorage.setItem('isOnlineTracked', 'true');

  //     // Auto-decrement after 15 mins
  //     setTimeout(async () => {
  //       await updateDoc(docRef, { online: increment(-1) });
  //       sessionStorage.removeItem('isOnlineTracked');
  //     }, 15 * 60 * 1000);
  //   }

  //   // ✅ Update local visitorStats variable for UI
  //   this.visitorStats = await this.getStats();

  //   // ✅ Optional: Decrement online on tab close
  //   window.addEventListener('beforeunload', async () => {
  //     if (sessionStorage.getItem('isOnlineTracked')) {
  //       await updateDoc(docRef, { online: increment(-1) });
  //       sessionStorage.removeItem('isOnlineTracked');
  //     }
  //   });
  // }


  // async getStats() {
  //   const docRef = doc(this.firestore, 'site', 'visitorStats');
  //   const snap = await getDoc(docRef);
  //   return snap.exists() ? snap.data() : {};
  // }


  // async trackOnlineUser() {
  //   const sessionId = sessionStorage.getItem('sessionId') || uuidv4();
  //   sessionStorage.setItem('sessionId', sessionId);

  //   const docRef = doc(this.firestore, 'activeUsers', sessionId);

  //   // Update the current user's lastSeen time
  //   const updatePresence = async () => {
  //     await setDoc(docRef, {
  //       lastSeen: new Date().toISOString()
  //     });
  //   };

  //   // Call immediately and then every 30 seconds
  //   await updatePresence();
  //   setInterval(updatePresence, 30 * 1000);

  //   // On tab close, delete user (optional cleanup)
  //   window.addEventListener('beforeunload', async () => {
  //     await deleteDoc(docRef);
  //   });
  // }


  // async getOnlineUserCount(): Promise<number> {
  //   const now = new Date();
  //   const cutoff = new Date(now.getTime() - 2 * 60 * 1000); // 2 minutes ago

  //   const q = query(
  //     collection(this.firestore, 'activeUsers'),
  //     where('lastSeen', '>=', cutoff.toISOString())
  //   );

  //   const snap = await getDocs(q);
  //   return snap.size; // Total active users
  // }

  // async updateOnlineCount() {
  //   this.onlineUserCount = await this.getOnlineUserCount();
  // }



  async trackVisitors() {
    const visitedDate = localStorage.getItem('visitedDate');
    const alreadyVisitedToday = visitedDate === this.todayStr;

    const statsRef = doc(this.firestore, 'visitorStats', 'summary');
    const statsSnap = await getDoc(statsRef);
    const updates: any = {};

    if (statsSnap.exists()) {
      const data = statsSnap.data();

      // Rotate day
      if (data['lastVisitDate'] !== this.todayStr) {
        updates.yesterday = data['today'] || 0;
        updates.today = alreadyVisitedToday ? data['today'] : 1;
        updates.total = alreadyVisitedToday ? data['total'] : increment(1);
        updates.lastVisitDate = this.todayStr;
      } else {
        if (!alreadyVisitedToday) {
          updates.today = increment(1);
          updates.total = increment(1);
        }
      }

      await updateDoc(statsRef, updates);
    } else {
      await setDoc(statsRef, {
        today: 1,
        yesterday: 0,
        total: 1,
        lastVisitDate: this.todayStr
      });
    }

    localStorage.setItem('visitedDate', this.todayStr);

    // 🔹 Online user tracking
    const sessionId = sessionStorage.getItem('sessionId') || uuidv4();
    sessionStorage.setItem('sessionId', sessionId);

    const userRef = doc(this.firestore, 'activeUsers', sessionId);
    const updatePresence = async () => {
      await fsSetDoc(userRef, { lastSeen: new Date().toISOString() });
    };

    await updatePresence();
    setInterval(updatePresence, 30 * 1000); // refresh every 30 sec

    // cleanup on tab close
    window.addEventListener('beforeunload', async () => {
      await deleteDoc(userRef);
    });

    this.getVisitorStats();
  }


  async getVisitorStats() {
    const statsSnap = await getDoc(doc(this.firestore, 'visitorStats', 'summary'));
    const now = new Date();
    const cutoff = new Date(now.getTime() - 2 * 60 * 1000); // last 2 mins

    const onlineQuery = query(
      collection(this.firestore, 'activeUsers'),
      where('lastSeen', '>=', cutoff.toISOString())
    );
    const onlineSnap = await getDocs(onlineQuery);

    if (statsSnap.exists()) {
      const data = statsSnap.data();
      this.visitorStats = {
        today: data['today'] || 0,
        yesterday: data['yesterday'] || 0,
        total: data['total'] || 0,
        online: onlineSnap.size
      };
    }
  }


}
