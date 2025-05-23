import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {



  isMobile: boolean = window.innerWidth < 992; // Bootstrap lg breakpoint
  menuItems = [
    {
      title: "Home",
      link: "/",
      isOpen: false,
      subItems: []
    },
    {
      title: "About Us",
      isOpen: false,
      subItems: [
        { label: "Vision", link: "/about/vision" },
        { label: "Mission", link: "/about/mission" },
        { label: "Objective", link: "/about/objective" },
        // { label: "History", link: "/about/history" },
        { label: "University Act & Statutes", link: "/about/university-act" },
        {
          title: "Regulations",
          isOpen: false,
          subItems: [
            { title: "UG", link: "/about/ug" },
            { title: "PG", link: "/about/pg" },
            { title: "Ph.D", link: "/about/phd" },
          ]
        },
        // { label: "Noida Campus", link: "/about/noida-campus" },
        { label: "University Logo", link: "/about/university-logo" },
        // { label: "Annual Report 2016", link: "/about/annual-report" },
        // { label: "AKTU Data Privacy Policy", link: "/about/data-privacy-policy" }
      ]
    },
    {
      title: "Governance",
      isOpen: false,
      subItems: [
        {
          label: "Organization Structure",
          // link: "/Academics/Syllabus",
        },
        { label: "Honorable Chancellor", link: "/organization/chancellor" },
        { label: "Vice Chancellor", link: "/organization/vice-chancellor" },
        // { label: "Pro Vice Chancellor", link: "/organization/pro-vice-chancellor" },
        { label: "Executive Council", link: "/organization/executive-council" },
        { label: "Academic Council", link: "/organization/academic-council" },
        { label: "Finance Committee", link: "/organization/finance-committee" },
        { label: "Examination Board", link: "/organization/examination-committee" },
      ]
    },
    {
      title: "Affiliation",
      link: "/Affiliation",
      isOpen: false,
      subItems: []
    },
    {
      title: "Academics",
      link: null,
      isOpen: false,
      subItems: [
        { label: "Programmes", link: "/Academics/Programmes" },
        { label: "NBA Accredited Programmes", link: "/Academics/NBA-Accredited-Programs" },
        // { label: "Naac Programm", link: "/Academics/Naac-Programm" },
        { label: "NIRF Ranking", link: "/Academics/NIRF-Ranking" },
        { label: "Board of Studies", link: "/Academics/Board-of-Studies" },
        { label: "Industry Consultation Committee", link: "/Academics/Industry-Consultation-Committee" },
        { label: "Virtual Lab", link: "/Academics/Virtual-Lab" },
        {
          label: "Syllabus",
          link: "/Academics/Syllabus",
          subItems: [
            { label: "PhD", link: "/academic/3" },
            { label: "MTech", link: "/academic/2" },
            { label: "BTech", link: "/academic/1" }
          ]
        },
        // { label: "Honours Degree MOOCs (NPTEL) Courses", link: "/Academics/Honours-Degree-MOOCs" },
        // { label: "Compendium", link: "/Academics/Compendium" },
        { label: "Academic Calendar", link: "/Academics/Academic-Calendar" },
        { label: "Publications", link: "/Academics/Publications" },
        { label: "Faculty Development Programs (FDP)", link: "/Academics/FDP" },
        { label: "E-Learning Resources", link: "/Academics/E-Learning-Resources" },
        { label: "NPTEL Local Chapters", link: "/Academics/NPTEL-Local-Chapters" },
        { label: "NPTEL Online Certification", link: "/Academics/NPTEL-Online-Certification" },
        { label: "Value Education", link: "/Academics/Value-Education" },
        // { label: "ODOP Nodal Officer", link: "/Academics/ODOP-Nodal-Officer" }
      ]
    },
    {
      title: "Admission",
      isOpen: false,
      subItems: [
        { label: "Bachelors", link: "/admission/bachelors" },
        { label: "Masters", link: "/admission/masters" },
        { label: "Doctoral (Ph.D)", link: "/admission/phd" }
      ]
    },
    {
      title: "Examination",
      isOpen: false,
      subItems: [
        { label: "Branch Codes", link: "/examination/branch-codes" },
        { label: "Examination Centre", link: "/examination/centre" },
        { label: "Examination Schedule", link: "/examination/schedule" },
        { label: "UFM Rules", link: "/examination/ufm-rules" },
        { label: "Scrutiny Rules", link: "/examination/scrutiny-rules" },
        { label: "Question Bank Portal", link: "/examination/question-bank" }
      ]
    },
    {
      title: "Result",
      link: "https://results.beup.ac.in/",
      isOpen: false,
      subItems: []
    },
    {
      title: "Reports",
      isOpen: false,
      subItems: [
        { label: "Annual Report", link: "/annual-report" },
        // { label: "BEU Magazine", link: "/magazine" },
        { label: "Audit Report", link: "/financial-report" }
      ]
    },
    {
      title: "Service",
      isOpen: false,
      subItems: [
        { label: "Document Verification", link: "/services/document-verification" }
      ]
    },
    {
      title: "RTI",
      isOpen: false,
      subItems: [
        { label: "Public Information Officers & Contact No.", link: "/rti/public-info" },
        { label: "Format of Application", link: "/rti/application-format" },
        { label: "Mandatory Disclosure", link: "/rti/mandatory-disclosure" },
        { label: "Download Act", link: "/rti/download-act" }
      ]
    },
    {
      title: "Lokpal",
      isOpen: false,
      subItems: [
        { label: "Appointment of Lokpal", link: "/lokpal/appointment-of-lokpal" },
        { label: "Lokpal Orders", link: "/lokpal/lokpal-orders" }
      ]
    },
    {
      title: "Documents",
      isOpen: false,
      subItems: [
        { label: "Act", link: "/acts" },
        { label: "Circular", link: "/circular" },
        { label: "Important Links", link: "/links" },
        { label: "Notification", link: "/notification" },
        { label: "Downloads", link: "/downloads" },
        { label: "Minutes", link: "/minutes" },
        { label: "Letter", link: "/letter" },
        // { label: "curriculum", link: "/curriculum" },
      ]
    },
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 992;
  }

  onMouseEnter(item: any) {
    if (!this.isMobile) {
      console.log(item)
      item.isOpen = true;
    }
  }

  onMouseLeave(item: any) {
    if (!this.isMobile) {
      item.isOpen = false;
    }
  }

  toggleDropdown(item: any, event: Event) {
    if (this.isMobile) {
      item.isOpen = !item.isOpen;
      event.stopPropagation(); // Prevent closing when clicking inside
    }
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    if (this.isMobile) {
      this.menuItems.forEach(item => item.isOpen = false);
    }
  }


  // declare var google: any;

  translateLanguage(lang: any) {
    if (lang) {
      const translateInstance = new google.translate.TranslateElement();
      translateInstance.translatePage(lang);
    }
  }
  ngAfterViewInit(): void {
    this.loadGoogleTranslate();
  }

  loadGoogleTranslate() {
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
      // function googleTranslateElementInit() {
      // new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
      // }
    } else {
      // this.initGoogleTranslate();
    }
  }

  initGoogleTranslate() {
    if (typeof google !== 'undefined' && google.translate) {
      new google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'hi,es,fr,de,ar,zh', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
        'google_translate_element'
      );
    }
  }

  showBackToTop = false;

  // Listen to window scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  isNavbarOpen = false;

  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;

    if (this.navbarCollapse) {
      const el = this.navbarCollapse.nativeElement;

      if (this.isNavbarOpen) {
        const scrollHeight = el.scrollHeight;
        el.style.height = scrollHeight + 'px';
      } else {
        el.style.height = '0';
      }
    }
  }
}

(window as any).googleTranslateElementInit = () => {
  new google.translate.TranslateElement(
    { pageLanguage: 'en', includedLanguages: 'hi,es,fr,de,ar,zh', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
    'google_translate_element'
  );









};
