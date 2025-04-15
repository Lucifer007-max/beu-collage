import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  syllabus: any;
  courseList: any;
  semaster: any;
  wfile: any;
  loader: boolean = false;
  semesterID: any;
  sessionID: any;
  dataList: any;
  sessionYear: any;
  constructor(private service: ApiService, private FB: FormBuilder) { }

  ngOnInit() {
    this.getCourseFile();
    this.getSyllabus();
    this.getSessionList();
    {
      this.syllabus = this.FB.group({
        sessionYear: ['', Validators.required],
        sessionID: ['', Validators.required],
        branchCode: ['', Validators.required],
        branchName: ['', Validators.required],
      })
    }
    this.semaster = [
      { title: "1 Semester", id: 1 },
      { title: "2 Semester", id: 2 },
      { title: "3 Semester", id: 3 },
      { title: "4 Semester", id: 4 },
      { title: "5 Semester", id: 5 },
    ]



    
  }


  onItemSelect(item: any, type: any) {
    if (type === 'sem') {
      this.semesterID = item.target.value
    } else if (type === "sessionYear") {
      this.sessionYear = item.target.value
    } else {
      this.sessionID = item.target.value
    }
    console.log(item?.target.value)
  }

  handleDelete(id:any) {
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

  handleSubmit() {
    this.loader = true;
    // file: { type: DataTypes.INTEGER, allowNull: false },
    // semester: { type: DataTypes.STRING, allowNull: false },
    // sessionID: { type: DataTypes.STRING, allowNull: false, },

    const payLoad = {
      "semester": this.semesterID,
      "sessionID": this.sessionID,
      "sessionYear": this.sessionYear,
      "file": this.wfile || this.wfile,
    }

    const service = this.service.courseFileService(payLoad);
    //  this.isUpdate ? this.service.bannerUpdateService(payLoad,this.bannerID) :

    service.subscribe((res: any) => {
      if (res.status) {
        this.getCourseFile()
        this.syllabus.reset()
        this.service.SuccessSnackbar(res.message)
        this.loader = false;
      } else {
        this.service.SuccessSnackbar('something went wrong...!!')
        this.loader = false;
      }
    }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    })
  }

  getSessionList() {
    this.service.coursesessionGet().subscribe((res: any) => {
      this.courseList = res;
    })
  }

  getSyllabus() {
    this.service.coursesyllabusGet().subscribe((res: any) => {
      this.syllabus = res;
    })
  }

  getCourseFile() {
    this.service.courseFileGet().subscribe((res) => {
      console.log(res)
      this.dataList = res
    })
  }
}


