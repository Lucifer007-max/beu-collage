import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  imgUrl: 'http://45.79.124.136:9000/',
  apiUrl: 'http://45.79.124.136:9000/v1/',
  backendUrl : 'http://45.79.124.136:9000/v1/',
};
