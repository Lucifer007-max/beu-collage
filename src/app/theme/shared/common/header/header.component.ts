import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
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