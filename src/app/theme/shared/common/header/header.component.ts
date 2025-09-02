import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
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
        { label: "University Act", link: "/about/university-act" },
        { label: "University Statutes", link: "/about/university-statutes" },
        {
          title: "Regulations",
          isOpen: false,
          subItems: [
            { title: "UG", link: "/about/regulations/UG" },
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
          label: "Organization Structure", link: "/organization/organization-structure"
        },
        { label: "BEU Officials", link: "/organization/BEU-Officials" },
        { label: "Hon'ble Chancellor", link: "/organization/chancellor" },
        { label: "Vice Chancellor", link: "/organization/vice-chancellor" },
        // { label: "BEU Officials", link: "" },
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
        // { label: "Programmes", link: "/Academics/Programmes",
        {
          label: "Programmes", link: "/academics/Program",
          subItems: [
            { label: "Ph.D", link: "/academics/Program/Ph.D" },
            { label: "M.Tech", link: "/academics/Program/M.Tech" },
            { label: "B.Tech", link: "/academics/Program/B.Tech" }
            // { label: "B.Tech", link: "https://syllabus.beup.ac.in/" }
          ]
        },
        {
          label: "Syllabus",
          link: "/Academics/Syllabus",
          subItems: [
            // { label: "Ph.D", link: "/academic/3" },
            // { label: "M.Tech", link: "/academic/2" },
            // { label: "B.Tech", link: "/academic/1" }
            { label: "Ph.D", link: "/syllabus/3" },
            { label: "M.Tech", link: "/syllabus/2" },
            { label: "B.Tech", link: "https://syllabus.beup.ac.in/" }
          ]
        },
        { label: "NBA Accredited Programmes", link: "/Academics/NBA-Accredited-Programs" },
        // { label: "Naac Programm", link: "/Academics/Naac-Programm" },
        { label: "NIRF Ranking", link: "/Academics/NIRF-Ranking" },
        { label: "Board of Studies", link: "/Academics/Board-of-Studies" },
        { label: "Industry Consultation Committee", link: "/Academics/Industry-Consultation-Committee" },
        // { label: "Virtual Lab", link: "/Academics/Virtual-Lab" },
        { label: "Virtual Lab", link: "/" },
        // { label: "Honours Degree MOOCs (NPTEL) Courses", link: "/Academics/Honours-Degree-MOOCs" },
        // { label: "Compendium", link: "/Academics/Compendium" },
        { label: "Academic Calendar", link: "/Academics/Academic-Calendar" },
        { label: "Publications", link: "/Academics/Publications" },
        // { label: "Faculty Development Programs (FDP)", link: "/Academics/FDP" },
        { label: "Faculty Development Programs (FDP)", link: "/Academics/Faculty-Development-Programs" },
        { label: "E-Learning Resources", link: "/Academics/E-Learning-Resources" },
        // { label: "NPTEL Local Chapters", link: "/Academics/NPTEL-Local-Chapters" },
        // { label: "NPTEL Online Certification", link: "/Academics/NPTEL-Online-Certification" },
        { label: "NPTEL Online Certification", link: "https://archive.nptel.ac.in/noc/" },
        // { label: "Value Education", link: "/Academics/Value-Education" },
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
    // {
    //   title: "Result",
    //   link: "https://results.beup.ac.in/",
    //   isOpen: false,
    //   subItems: []
    // },
    {
      title: "Result",
      link: "/result-one",
      isOpen: false,
      subItems: []
    },
     {
      title: "Training & Placement",
      isOpen: false,
      subItems: [
        { label: "About Us", link: "" ,
           subItems: [
            { label: "Our Mission", link: "/tpo/Tpo-mission" },
            { label: "Our Vision", link: "/tpo/Tpo-vision" },
            { label: "Training and Placement Officer", link: "/tpo/Training-and-placement-officer" }
          ]
        },
        { label: "Why recruit from BEU Patna?", link: "",
           subItems: [
            { label: "Industry aligned syllabus", link: "/tpo/Industry-aligned-syllabus" },
            { label: "Students from various engineering and architecture desciplines", link: "/tpo/Students-from-various-engineering-and-architecture-desciplines" },
            { label: "Well infrastructure supporting practical training and labs", link: "" },
            { label: "Professional ethics like communication skills, team work etc.", link: "" }
            // { label: "Well infrastructure supporting practical training and labs", link: "/tpo/Well-infrastructure-supporting-practical-training-and-labs" },
            // { label: "Professional ethics like communication skills, team work etc.", link: "/tpo/Professional-ethics-like-communication-skills-team-work" }
          ]
         },
        { label: "Join TNP Cell BEU Patna", link: "",
          subItems: [
            { label: "Register as company", link: "https://forms.gle/mYpMRJSGKyQyNT777" },
            { label: "Register as student", link: "https://forms.gle/easiHx3H2BwEn8EeA" },
            // { label: "Register as company", link: "/tpo/Register-as-company" },
            // { label: "Register as student", link: "/tpo/Register-as-student" },
          ]
         },
        { label: "For Companies", link: "",
           subItems: [
            { label: "Job Notification Form (JNF) submission", link: "https://forms.gle/wEYoSU7dsiby5UKU6" },
            { label: "Internship Notification Form (INF) submission", link: "https://forms.gle/VLcUHhvMkz8ibvHm6" },
            // { label: "Job Notification Form (JNF) submission", link: "/tpo/Job-Notification-Form-submission" },
            // { label: "Internship Notification Form (INF) submission", link: "/tpo/Internship-Notification-Form-submission" },
          ]
         },
        { label: "Career", link: "",
           subItems: [
            { label: "Company list for recruiting/FTE", link: "/tpo/Company-list-for-recruiting-FTE" },
            { label: "Company list for Internship", link: "/tpo/Company-list-for-Internship" },
            // { label: "Company list for recruiting/FTE", link: "/Company-list-for-recruiting-FTE" },
            // { label: "Company list for Internship", link: "/Company-list-for-Internship" },
          ]
         },
        { label: "Our Alumni", link: "/tpo/Our-Alumni" },
        { label: "Placement Brochure", link: "/tpo/Placement-Brochure" },
        { label: "Login", link: "/tpo-login" },
        { label: "Contact", link: "/tpo/contact" }
        // { label: "Training and Placement Cell", link: "/tpo-cell" },
      ]
    },
    // {
    //   title: "Training & Placement",
    //   link: "/TPCell",
    //   isOpen: false,
    //   subItems: []
    // },
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
        // { label: "Act", link: "/acts" },
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


  handleItemClick(item: any, event: Event) {
    if (item.title === 'Virtual Lab' || item.label === 'Virtual Lab') {
      event.preventDefault(); // stop normal navigation
      Swal.fire({
        title: 'Virtual Lab Access',
        text: 'You are being redirected to an external Virtual Lab website.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          window.open('https://www.vlab.co.in/participating-institute-iit-bombay', '_blank');
        }
      });
    }
    else {

    }
  }


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
