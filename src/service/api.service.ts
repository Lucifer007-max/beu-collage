import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TokenInterceptor } from 'src/interceptors/admin/interceptors.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: String = environment.apiUrl;
  header: any
  constructor(private httpClient: HttpClient) {
    const token = localStorage.getItem('token')?.toString();
    this.header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`
    });
  }


  ErrorSnackbar(message: any) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      timer: 6000,
      icon: 'error',
      html: ` <small> ${message}</small>`,
      timerProgressBar: true,
      showCloseButton: false,
      showConfirmButton: false
    })
  }
  SuccessSnackbar(message: any) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      timer: 6000,
      icon: 'success',
      html: ` <small> ${message}</small>`,
      timerProgressBar: true,
      showCloseButton: false,
      showConfirmButton: false
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

  adminAuth(payload: any) {
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
  courseFileService(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
      }
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.httpClient.post(this.baseUrl + 'course/add-course-file', formData, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }

  noticeService(id: number, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put(`${this.baseUrl}notice/add-notice/${id}`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  statusUpadte(id: number, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put(`${this.baseUrl}doc/update-document/${id}`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }

  videosService(id: number = 0, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put(`${this.baseUrl}publication/add-video/${id}`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }


  // albumService(id: number = 0, payload: any): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //     'Content-Type': 'application/json'
  //   });

  //   return this.httpClient.put(`${this.baseUrl}publication/add-album/${id}`, payload, { headers })
  //     .pipe(catchError(this.handleError.bind(this)));
  // }

  albumService(id: number = 0, payload: any): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.put(`${this.baseUrl}publication/add-album/${id}`, formData)
      .pipe(catchError(this.handleError.bind(this)));
    // return this.httpClient.post(this.baseUrl + 'publication/add-albumall', formData)
    //   .pipe(catchError(this.handleError.bind(this)));
  }
  alertServiceUpdate(id: number, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put(`${this.baseUrl}notice/update-alerts/${id}`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  alertService(id: number, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(`${this.baseUrl}notice/add-alerts`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  eventService(id: number, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put(`${this.baseUrl}notice/add-events/${id}`, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  noticeBoardService(id: number, payload: any): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //   'Content-Type': 'application/json'
    // });

    // return this.httpClient.put(`${this.baseUrl}notice/add-notice-board/${id}`, payload, { headers })
    //   .pipe(catchError(this.handleError.bind(this)));
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key])
      }
    }
    let url = this.baseUrl + 'notice/add-notice-board';
    if (id !== undefined && id !== null) {
      url += `?id=${id}`;
    }
    return this.httpClient.post(url, formData)
      .pipe(catchError(this.handleError.bind(this)));
  }

  noticeBoardServiceUpdate(id: number, payload: any): Observable<any> {
    const formData: FormData = new FormData();

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key]); // for debugging
      }
    }

    return this.httpClient.put(this.baseUrl + `notice/add-notice-board/${id}`, formData)
      .pipe(catchError(this.handleError.bind(this)));
  }

  importantLinkServiceUpdate(id: number, payload: any): Observable<any> {
    const formData: FormData = new FormData();

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key]); // for debugging
      }
    }

    return this.httpClient.put(this.baseUrl + `notice/update-important-links/${id}`, formData)
      .pipe(catchError(this.handleError.bind(this)));
  }


  importantLinksService(id: number, payload: any): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //   'Content-Type': 'application/json'
    // });

    // return this.httpClient.put(`${this.baseUrl}notice/add-important-links/${id}`, payload, { headers })
    // .pipe(catchError(this.handleError.bind(this)));
    const formData: FormData = new FormData();

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key]); // for debugging
      }
    }
    let url = this.baseUrl + 'notice/add-important-links';
    if (id !== undefined && id !== null) {
      url += `?id=${id}`;
    }
    return this.httpClient.post(url, formData)
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
  affiliationGet(filters: any): Observable<any> {
    const params = new HttpParams()
      .set('type', filters.type || '')
      .set('session', filters.session || '')
      .set('sortAlpha', true);

    return this.httpClient.get(this.baseUrl + 'affiliation/get-affilation-users', { params })
      .pipe(catchError(this.handleError.bind(this)));
  }

  eventsGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'notice/get-events')
      .pipe(catchError(this.handleError.bind(this)));
  }

  resultSemGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'result/sem-get')
      .pipe(catchError(this.handleError.bind(this)));
  }

  resultGet(year: string, redg_no: string, semester: any, exam_held: string): Observable<any> {
    const params = new HttpParams()
      .set('year', year)
      .set('redg_no', redg_no)
      .set('semester', semester)
      .set('exam_held', exam_held);

    return this.httpClient.get(this.baseUrl + 'result/get-result', { params })
      .pipe(catchError(this.handleError.bind(this)));
  }

  noticeBoardGet(params?: any): Observable<any> {
    let url = this.baseUrl + 'notice/get-notice-board';
    if (params !== undefined && params !== null) {
      url += `?isimportant=${params}`;
    }
    return this.httpClient.get(url).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  importantLinkGet(params?: any): Observable<any> {
    let url = this.baseUrl + 'notice/get-important-links';
    if (params !== undefined && params !== null) {
      url += `?isimportant=${params}`;
    }
    return this.httpClient.get(url).pipe(
      catchError(this.handleError.bind(this))
    );
    // return this.httpClient.get(this.baseUrl + 'notice/get-important-links')
    //   .pipe(catchError(this.handleError.bind(this)));
  }


  coursesession(payload: any, id: number): Observable<any> {
    return this.httpClient.put(this.baseUrl + `course/add-course-session/${id}`, payload)
      .pipe(catchError(this.handleError.bind(this)));
  }
  coursesyllabus(payload: any, id: number): Observable<any> {
    return this.httpClient.put(this.baseUrl + `course/add-course-syllabus/${id}`, payload)
      .pipe(catchError(this.handleError.bind(this)));
  }
  TestimonialService(payload: any): Observable<any> {
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
  MnetorService(payload: any): Observable<any> {
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
  // PressService(payload: any): Observable<any> {
  PressService(payload: any): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.post(this.baseUrl + 'publication/add-press', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }

  ReportService(payload: any): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.post(this.baseUrl + 'report/add-report', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  MagzineService(payload: any): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.post(this.baseUrl + 'report/add-magzine', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  albumAllService(payload: any): Observable<any> {
    const formData: FormData = new FormData();

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        if (key === 'files' && Array.isArray(payload.files)) {
          // Append each file with the same key: 'files'
          payload.files.forEach((file: File) => {
            formData.append('files', file, file.name);
          });
        } else {
          formData.append(key, payload[key]);
        }
      }
    }

    return this.httpClient.post(this.baseUrl + 'publication/add-albumall', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  MediaService(payload: any): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.post(this.baseUrl + 'publication/add-media', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }

  ModalService(payload: any, id: any): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.put(this.baseUrl + 'modal/add-modal/' + id, formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  fileService(payload: any): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.post(this.baseUrl + 'doc/add-file', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  fileUpdateService(id: any, payload: any): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.put(this.baseUrl + 'doc/update-document/' + id, formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  affiliationService(payload: any): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.post(this.baseUrl + 'affiliation/add-affilation', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  resultService(payload: any): Observable<any> {

    return this.httpClient.post(this.baseUrl + 'result/semester', payload)
      .pipe(catchError(this.handleError.bind(this)));
  }
  resultServiceUpdate(payload: any, id: number): Observable<any> {
    return this.httpClient.put(this.baseUrl + 'result/' + id, payload)
      .pipe(catchError(this.handleError.bind(this)));
  }

  affiliationUpdateService(payload: any, id: number): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.put(this.baseUrl + 'affiliation/update-affilation/' + id, formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  bannerUpdateService(payload: any, id: number): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.put(this.baseUrl + 'banner/update-banner/' + id, formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  courseUpdateService(payload: any, id: number): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.put(this.baseUrl + 'course/update-course-file/' + id, formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  mentorUpdateService(payload: any): Observable<any> {
    const formData: any = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        // Ensure file is handled correctly
        if (payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name); // Append file with its original name
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
    return this.httpClient.put(this.baseUrl + 'mentor/update-mentor/' + payload?.id, formData)
      .pipe(catchError(this.handleError.bind(this)));
  }

  MerchandiesService(payload: any): Observable<any> {
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
    return this.httpClient.delete(this.baseUrl + 'course/delete-course-session/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  courseSyllabus(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'course/delete-course-syllabus/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  testimonialDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Testimonial/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  modalDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'modal/delete-modal/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  pressDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'publication/delete-press/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  reportDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'report/delete-report/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  magzineDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'report/delete-magzine/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  albumDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'publication/delete-albumall/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  VideoDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'publication/delete-video/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  merchandiesDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Merchandies/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  mentorDelete(id: number, value: string): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `mentor/delete-mentor?id=${id}&value=${value}`)
      .pipe(catchError(this.handleError.bind(this)));
  }


  coursesessionGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'course/get-course-session')
      .pipe(catchError(this.handleError.bind(this)));
  }
  coursesyllabusGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + `course/get-course-syllabus`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  coursesessionGetById(id: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'course/get-course-session/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  coursesessionGetFileById(id: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'course/get-course-file/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }


  getdownloadableFile(type: string) {
    return this.httpClient.delete(`${this.baseUrl}file${type}`)
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
  pressGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'publication/get-press')
      .pipe(catchError(this.handleError.bind(this)));
  }
  reportGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'report/get-report')
      .pipe(catchError(this.handleError.bind(this)));
  }
  magzineGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'report/get-magzine')
      .pipe(catchError(this.handleError.bind(this)));
  }
  albumGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'publication/get-album')
      .pipe(catchError(this.handleError.bind(this)));
  }
  courseFileGet(id: any): Observable<any> {
    return this.httpClient.get(this.baseUrl + `course/get-course-file?${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  albumGetAll(id?: any): Observable<any> {
    let url = this.baseUrl + 'publication/get-albumall';
    if (id) {
      url += `?id=${id}`;
    }
    return this.httpClient.get(url)
      .pipe(catchError(this.handleError.bind(this)));
  }

  mediaGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'publication/get-media')
      .pipe(catchError(this.handleError.bind(this)));
  }
  modalGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'modal/get-modal')
      .pipe(catchError(this.handleError.bind(this)));
  }
  videosGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'publication/get-videos')
      .pipe(catchError(this.handleError.bind(this)));
  }


  mentorGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'mentor/get-mentor')
      .pipe(catchError(this.handleError.bind(this)));
  }
  mentoruserGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'mentor/get-mentor-user')
      .pipe(catchError(this.handleError.bind(this)));
  }
  fileGet(type: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + `doc/getFiles?type=${type}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  fileGetAdmin(type: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + `doc/getFilesadmin?type=${type}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  affiliationGetAdmin(page: number, pageSize: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + `affiliation/get-affilation-admin?page=${page}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  // mentorGet(): Observable<any> {
  //   return this.httpClient.get(this.baseUrl + 'Merchandies')
  //    .pipe(catchError(this.handleError.bind(this)));
  // }
  fileDelete(id: number, type: string, value: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}doc/deletFiles?id=${id}&type=${type}&value=${value}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  courseFileDelete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}course/delete-course-file/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  affiliationDelete(id: number, value: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}affiliation/affilation-delete?id=${id}&value=${value}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  resultDelete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}result/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }
  bannerDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'banner/delete-banner/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  noticeDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'notice/delete-notice-board/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  importantLinkDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'notice/delete-important-links/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  alertDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'notice/delete-alerts/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }


  updatePassword(data: { id: any; currentPassword: string; newPassword: string }): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}client/update-password`, data);
  }


  handleError(error: any): Observable<never> {
    console.log(error?.error)
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      if (error.error.errors) {
        errorMessage = Object.values(error.error.errors).flat().join(' ');
      } else {
        errorMessage = error.error.message || errorMessage;
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
