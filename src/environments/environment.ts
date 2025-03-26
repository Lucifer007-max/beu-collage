// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  imgUrl: 'http://45.79.124.136:9000/',
  apiUrl: 'http://45.79.124.136:9000/v1/',
  backendUrl : 'http://45.79.124.136:9000/v1/',
  // apiUrl: 'http://localhost:9000/v1/',
  // backendUrl : 'http://localhost:9000/v1/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
