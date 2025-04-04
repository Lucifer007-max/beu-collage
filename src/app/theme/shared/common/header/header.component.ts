import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit{



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
        { label: "History", link: "/about/history" },
        { label: "University Act", link: "/about/university-act" },
        { label: "Regulations (First, 2010)", link: "/about/regulations" },
        { label: "Noida Campus", link: "/about/noida-campus" },
        { label: "University Logo", link: "/about/university-logo" },
        { label: "Annual Report 2016", link: "/about/annual-report" },
        { label: "AKTU Data Privacy Policy", link: "/about/data-privacy-policy" }
      ]
    },
    {
      title: "Organization Structure",
      isOpen: false,
      subItems: [
        { label: "Chancellor", link: "/organization/chancellor" },
        { label: "Vice Chancellor", link: "/organization/vice-chancellor" },
        { label: "Pro Vice Chancellor", link: "/organization/pro-vice-chancellor" },
        { label: "Executive Council", link: "/organization/executive-council" },
        { label: "Academic Council", link: "/organization/academic-council" },
        { label: "Finance Committee", link: "/organization/finance-committee" },
        { label: "Examination Committee", link: "/organization/examination-committee" },
        { label: "Building & Works Committee", link: "/organization/building-works-committee" }
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
      link: "/Academics",
      isOpen: false,
      subItems: []
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
        { label: "Branch Codes", link: "#" },
        { label: "Course Codes", link: "#" },
        { label: "Subject Code & Paper ID", link: "#" },
        { label: "Examination Centre", link: "#" },
        { label: "Examination Schedule", link: "#" },
        { label: "UFM Rules", link: "#" },
        { label: "Revaluation Rules", link: "#" },
        { label: "Grace Rule in CBCS System", link: "#" },
        { label: "Detained Rule in CBCS System", link: "#" },
        { label: "Question Bank Portal", link: "#" },
        { label: "Annual Report", link: "/annual-report" },
        { label: "Lokpal Orders", link: "/lokpal-orders" },
        { label: "One-View display of Student Result Data", link: "#" },
        { label: "Ph.D.", link: "/phd" },
        { label: "Merit List of Students", link: "#" }
      ]
    },
    {
      title: "Reports",
      isOpen: false,
      subItems: [
        { label: "Annual Report", link: "/annual-report" },
        { label: "BEU Magazine", link: "/beu-magazine" },
        { label: "Financial Report", link: "/financial-report" }
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
        { label: "Appointment of Lokpal", link: "/appointment-of-lokpal" },
        { label: "Lokpal Orders", link: "/lokpal-orders" }
      ]
    },
    {
      title: "Documents",
      isOpen: false,
      subItems: [
        { label: "Act", link: "/acts" },
        { label: "Circular", link: "/circular" },
        { label: "Notification", link: "/notification" },
        { label: "Downloads", link: "/downloads" },
        { label: "Minutes", link: "/minutes" },
        { label: "Letter", link: "/letter" },
        { label: "curriculum", link: "/curriculum" },
        // { label: "IQAC", link: "/iqac" },
        // { label: "Gallery", link: "/gallery" }
//         Acts
// Circular
// Notification
// Downloads
// Minutes
// Letter
// Curriculum
      ]
    },
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 992;
  }

  onMouseEnter(item: any) {
    if (!this.isMobile) {
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
}

(window as any).googleTranslateElementInit = () => {
  new google.translate.TranslateElement(
    { pageLanguage: 'en', includedLanguages: 'hi,es,fr,de,ar,zh', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
    'google_translate_element'
  );






};
