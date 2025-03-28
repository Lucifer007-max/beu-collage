import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TokenInterceptor } from 'src/interceptors/admin/interceptors.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl:String = environment.apiUrl;
  header:any
  constructor(private httpClient : HttpClient) {
    const token  =  localStorage.getItem('token')?.toString();
    this.header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`
    });
  }


  ErrorSnackbar(message:any) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      timer: 6000,
      icon: 'error' ,
      html: ` <small> ${message}</small>`,
      timerProgressBar: true,
      showCloseButton:false,
      showConfirmButton:false
    })
  }
  SuccessSnackbar(message:any) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      timer: 6000,
      icon: 'success' ,
      html: ` <small> ${message}</small>`,
      timerProgressBar: true,
      showCloseButton:false,
      showConfirmButton:false
    })
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  register(payload: any) {
    const requestHeaders = { headers: this.header };
    return this.httpClient.post(this.baseUrl + 'admin/register', payload)
   .pipe(catchError(this.handleError.bind(this)));
  }

  adminAuth(payload:any) {
    return this.httpClient.post(this.baseUrl + 'client/authenticate', payload)
   .pipe(catchError(this.handleError.bind(this)));
  }
  bannerService(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
      }
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.post(this.baseUrl + 'banner/add-banner', formData, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }

  noticeService(id:number, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put(`${this.baseUrl}notice/add-notice/${id}`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  alertServiceUpdate(id:number, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put(`${this.baseUrl}notice/update-alerts/${id}`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  alertService(id:number, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(`${this.baseUrl}notice/add-alerts`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  eventService(id:number, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put(`${this.baseUrl}notice/add-events/${id}`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  noticeBoardService(id:number, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put(`${this.baseUrl}notice/add-notice-board/${id}`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  importantLinksService(id:number, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put(`${this.baseUrl}notice/add-important-links/${id}`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  noticeGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'notice/get-notice')
     .pipe(catchError(this.handleError.bind(this)));
  }
  alertsGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'notice/get-alerts')
     .pipe(catchError(this.handleError.bind(this)));
  }
  eventsGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'notice/get-events')
     .pipe(catchError(this.handleError.bind(this)));
  }
  noticeBoardGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'notice/get-notice-board')
     .pipe(catchError(this.handleError.bind(this)));
  }
  importantLinkGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'notice/get-important-links')
     .pipe(catchError(this.handleError.bind(this)));
  }


  CourseService(payload:any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
      }
    }

    return this.httpClient.post(this.baseUrl + 'Course', formData)
     .pipe(catchError(this.handleError.bind(this)));
  }
  TestimonialService(payload:any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key])
      }
    }

    return this.httpClient.post(this.baseUrl + 'Testimonial', formData)
     .pipe(catchError(this.handleError.bind(this)));
  }
  MnetorService(payload:any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key])
      }
    }

    return this.httpClient.post(this.baseUrl + 'mentor/add-mentor', formData)
     .pipe(catchError(this.handleError.bind(this)));
  }
  MerchandiesService(payload:any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key])
      }
    }

    return this.httpClient.post(this.baseUrl + 'Merchandies', formData)
     .pipe(catchError(this.handleError.bind(this)));
  }
  courseDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Course/' + id)
     .pipe(catchError(this.handleError.bind(this)));
  }
  testimonialDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Testimonial/' + id)
     .pipe(catchError(this.handleError.bind(this)));
  }
  merchandiesDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Merchandies/' + id)
     .pipe(catchError(this.handleError.bind(this)));
  }

  courseGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Course')
     .pipe(catchError(this.handleError.bind(this)));
  }

  courseGetById(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Course/' + id)
     .pipe(catchError(this.handleError.bind(this)));
  }
  bannerGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'banner/get-banners')
     .pipe(catchError(this.handleError.bind(this)));
  }
  testimonialGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Testimonial')
     .pipe(catchError(this.handleError.bind(this)));
  }


  mentorGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'mentor/get-mentor')
     .pipe(catchError(this.handleError.bind(this)));
  }
  // mentorGet(): Observable<any> {
  //   return this.httpClient.get(this.baseUrl + 'Merchandies')
  //    .pipe(catchError(this.handleError.bind(this)));
  // }
  bannerDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'banner/delete-banner/' + id)
     .pipe(catchError(this.handleError.bind(this)));
  }
  alertDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'notice/delete-alerts/' + id)
     .pipe(catchError(this.handleError.bind(this)));
  }

  handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // Server-side errors
        if (error.error.errors) {
            errorMessage = Object.values(error.error.errors).flat().join(' ');
        } else {
            errorMessage = error.error.title || errorMessage;
        }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
}

}

  export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  };
