import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';


@Component({
  selector: 'app-course-upload',
  templateUrl: './course-upload.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./course-upload.component.scss']
})
export default class CourseUploadComponent {
  courseForm!: any;
  courseList: any;
  filteredSessions: any[] = []; // filtered by course
  filteredBranches: any[] = []; // filtered by session
  courseOptions: any[] = [];
  semaster: any;
  branchFilter: any = { branch: '' };
  wfile: any;
  loader: boolean = false;
  semesterID: any;
  sessionID: any;
  dataList: any;
  sessionYear: any;
  sessionListing: any;
  isDisable: boolean = true
  branchID: any;
  courseID: any;
  id: any = 0;
  selectedFileName: string = ""
  @ViewChild('formSection') formSection!: ElementRef;
  isUpdate: boolean = false;
  cousteListsyllabus: any;

  constructor(private service: ApiService, private FB: FormBuilder) { }

  ngOnInit() {
    {
      this.courseForm = this.FB.group({
        courseID: ['', Validators.required],
        sessionID: ['', Validators.required],
        sessionYear: ['', Validators.required],
        semID: ['', Validators.required],
        file: [null, Validators.required]
      });
    }
    this.getCourseFile();
    this.getSyllabus();
    this.getSessionList();

    this.semaster = [
      { title: "1 Semester", id: 1 },
      { title: "2 Semester", id: 2 },
      { title: "3 Semester", id: 3 },
      { title: "4 Semester", id: 4 },
      { title: "5 Semester", id: 5 },
    ]

    this.courseOptions = [
      { "id": 1, title: 'B.Tech' },
      { "id": 2, title: 'M.Tech' },
      { "id": 3, title: 'PHD' }
    ]

  }


  onItemSelect(item: any, type: any) {

    switch (type) {
      case 'branch':
        console.log(item?.target?.value)
        this.sessionID = item?.target?.value
        break;
      case 'sem':
        this.semesterID = item?.target?.value
        break;
      case 'branchfilter':
        this.branchFilter = item?.target?.value;
        this.getCourseFile()
        break;

      default:
        break;
    }

    // console.log(this.sessionYear, item)
    // if (type === 'sem') {
    //   this.semesterID = item.target.value
    // } else if (type === "sessionYear") {
    //   this.sessionYear = item.target.value
    // }else if(type === 'branchfilter') {
    //   this.branchFilter = item.target.value;
    //   this.getCourseFile()
    // } else if(type === 'branch') {
    //   this.branchID = item.target.value;
    //   // this.getCourseFile()
    // } else {
    //   console.log(item?.target.value)
    //   this.sessionID = item.target.value
    // }
  }

  handleDelete(id: any) {
    this.service.courseFileDelete(id).subscribe((res) => {
      this.getCourseFile()
    })
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.wfile = event.target.files[0];
      console.log(this.wfile)
    }
  }

  onCourseChange(event: any) {
    const selectedCourseId = event.target.value;
    // console.log(selectedCourseId)
    this.courseID = selectedCourseId
    // this.isDisable = false;
    this.filteredBranches = this.cousteListsyllabus.filter((branch: any) => branch.courseID == selectedCourseId);
  }

  handleSubmit() {
    this.loader = true;

    const payLoad = {
      courseID: this.courseID || this.courseForm.value.courseID,
      semester: this.semesterID || this.courseForm.value.semID,
      sessionID: this.sessionID || this.courseForm.value.sessionID,
      sessionYear: this.sessionYear || this.courseForm.value.sessionYear,
      file: this.wfile || this.selectedFileName,
    };
    // console.log(payLoad)

    const service = this.isUpdate ? this.service.courseUpdateService(payLoad, this.id) : this.service.courseFileService(payLoad)
    service.subscribe({
      next: (res: any) => {
        if (res.status === 200) {
          this.getCourseFile();
          // this.syllabus.reset();
          this.loader = false;
          this.service.SuccessSnackbar(res.message);
        } else {
          this.loader = false;
          this.service.ErrorSnackbar('Something went wrong...!!' || res.message);
        }
        this.loader = false;
      },
      error: (err) => {
        this.service.ErrorSnackbar(err.message);
        this.loader = false;
      }
    });
  }

  getSyllabus() {
    this.service.coursesyllabusGet().subscribe((res: any) => {
      this.cousteListsyllabus = res;
      // this.filteredBranches = res;
    });
  }

  onSessionChange(event: any) {
    const selectedSessionID = event.target.value;
    this.sessionYear = event.target.value;
    // this.filteredBranches = this.syllabus.filter((branch:any) => branch.sessionID === selectedSessionID);

  }


  getSessionList() {
    this.service.coursesessionGet().subscribe((res: any) => {
      this.filteredSessions = res;
      console.log(res)
    })
  }

  filterChnage(type: any, e: any) {
    const { value } = e.target;
    console.log(type,value)
    switch (type) {
      case 'course':
        this.branchFilter.branch = value;
        this.getCourseFile();
        break;

      default:
        break;
    }
  }

  getCourseFile() {
    this.service.courseFileGet(this.branchFilter).subscribe((res) => {
      console.log(res)
      this.dataList = res
    })
  }


  handleEdit(data: any) {
    if (this.courseForm && typeof this.courseForm.patchValue === 'function') {
      this.courseForm.patchValue({
        courseID: data.courseID,
        sessionYear: data.sessionYear,
        sessionID: data.sessionID,
        semID: data.semester
      });

      this.selectedFileName = data.file;
      this.id = data.id;
      setTimeout(() => {
        this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      this.isUpdate = true;
    } else {
      console.error('courseForm not initialized or not a FormGroup');
    }
  }


}


