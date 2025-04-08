// Angular import
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeStyle, SafeUrl } from '@angular/platform-browser';

// project import
import * as _ from 'lodash';

@Pipe({
  name: 'dataFilter',
  standalone:true,
})
export class DataFilterPipe implements PipeTransform {
  // public method
  // eslint-disable-next-line
  // transform(array: any[], query: string): any[] {
  //   if (!query) {
  //     return array;
  //   }

  //   const lowerQuery = query.toLowerCase();

  //   return _.filter(array, (row: { name?: string; videoUrl?: string }) => {
  //     const nameMatch = row.name?.toLowerCase().includes(lowerQuery);
  //     const urlMatch = row.videoUrl?.toLowerCase().includes(lowerQuery);
  //     return nameMatch || urlMatch;
  //   });
  // // }
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any, type: string): SafeHtml | SafeStyle | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }


}
