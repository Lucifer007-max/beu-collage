import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  imports: [CommonModule, SharedModule],
  standalone: true,
  styleUrls: ['./result.component.scss']
})
export default class ResultComponent {
  @ViewChild('formSection') formSection!: ElementRef;
  fileForm: any = FormGroup;
  loader: boolean = false;
  List: any;
  imgUrl: any = environment.imgUrl;
  selectedFile: any;
  totalRecords: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  loaders: boolean = false;
  selectedFileName = '';
  selectedSession = '';
  isUpdate: boolean = false;
  listId: any;
  semId: any;
  selectedYear: number = new Date().getFullYear();
  years: string[] = [];
  courseList: any = []
  cousteListsyllabus: any = [];
  courseid: any;
  examData: any = [];
  constructor(private service: ApiService, private FB: FormBuilder, public router: Router) {
    this.getFile();

  }

  // constructor(public router: Router, private service: ApiService) {
  //   console.log("Current URL:", this.router.url);


  // }

  ngOnInit() {
    this.fileForm = this.FB.group({
      sessionID: [null],
      session: [null, Validators.required],
      title: [null, Validators.required],
      batchYear: [null, Validators.required],
      publishDate: [null, Validators.required],
      semId: [null, Validators.required],
    });

    for (let year = 2023; year <= 2025; year++) {
      this.years.push(`${year}-${(year + 1).toString().slice(-2)}`);
    }
    this.getSession()

  }

  getSession() {
    this.service.coursesessionGet().subscribe((res: any) => {
      this.courseList = res;
      // console.log(res.length)
    })
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getSyllabus() {
    this.service.coursesyllabusGet().subscribe((res: any) => {
      this.cousteListsyllabus = res;
      // this.filteredBranches = res;
    });
  }

  // Handle file selection
  onFileSelect(event: any) {
    const file = event.target.files[0];

    if (file) {
      const allowedExtensions = ['pdf', 'docx'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!allowedExtensions.includes(fileExtension!)) {
        this.service.ErrorSnackbar("Invalid file type. Only PDF & DOCX allowed.");
        return;
      }

      this.selectedFile = file; // Store file
      console.log(file, this.selectedFile)
      this.selectedFileName = file.name
      this.fileForm.patchValue({ file: file });
    }
  }


  // getFile() {
  //   this.service.affiliationGetAdmin().subscribe((res: any) => {
  //     this.List = res;
  //   });
  // }
  getFile(page: number = 1, pageSize: number = 10) {
    // this.service.affiliationGetAdmin(page, pageSize).subscribe((res: any) => {
    //   this.List = res;
    //   this.totalRecords = res.totalRecords;
    //   this.currentPage = page;
    //   this.pageSize = pageSize;
    // });

    this.service.resultSemGet().subscribe((res: any) => {
      // Transform the data for binding

      this.examData = res.map((item: any) => {
        return {
          course: `${item.courseName}`, // You can replace this with actual course name if available
          exams: item.exams.map((exam: any) => ({
            id: exam.id,
            course: `${item.courseid}`,
            name: exam.examName,
            batchYear: exam.batchYear,
            semId: exam.semId,
            session: `${exam.session}`,
            published: new Date(exam.publishDate).toLocaleDateString()
          }))
        };
      });
    });
  }

  // handleChange(e: any) {
  //   const selectedValue = e.target.value;
  //   this.fileForm.patchValue({
  //     type: selectedValue
  //   });

  // }

  // / Handle year change event
  onYearChange() {
    console.log("Selected Year:", this.selectedYear);
    // You can add any additional logic you need to handle the change here
  }

  // onDateSelect(event: any) {
  //   const fullValue = event.target.value; // e.g., "2025-01"
  //   const year = fullValue.split('-')[0]; // Extract "2025"
  //   this.fileForm.patchValue({
  //     session: year
  //   });
  //   this.selectedSession = ''
  //   // this.fileForm.get('file')?.setValue(year);
  // }
  handleChnage(e: any) {
    console.log(e.target.value)
    this.courseid = e.target.value

  }
  handleSemId(e: any) {
    console.log(e.target.value)
    this.semId = e.target.value

  }

  handleSubmit() {
    this.loader = true;

    const payload = {
      courseid: this.courseid,
      examName: this.fileForm.value.title,
      publishDate: this.fileForm.value.publishDate,
      batchYear: this.fileForm.value.batchYear,
      session: this.fileForm.value.session,
      semId: this.semId
    }
    // console.log(payload)
    const service = this.isUpdate ? this.service.resultServiceUpdate(payload, this.listId) : this.service.resultService(payload)
    service.subscribe(
      (res: any) => {
        // if (res) {
        this.service.SuccessSnackbar(res.msg);
        this.fileForm.reset();
        this.selectedFile = null;
        this.getFile();
        // } else {
        //   this.service.ErrorSnackbar(res);
        // }
        this.loader = false;
      },
      (err) => {
        this.service.ErrorSnackbar(err.message);
        this.loader = false;
      }
    );

  }

  handleDelete(id: number, value: number) {
    this.loaders = true;
    this.service.resultDelete(id).subscribe((res: any) => {
      this.List = res;
      this.loaders = false;
      this.getFile()
    });
  }


  handleEdit(data: any) {
    console.log(data)
    // Convert publishDate to yyyy-MM-dd (for input[type="date"])
    const formattedDate = data.published
      ? new Date(data.published).toISOString().split('T')[0]
      : null;
    console.log(formattedDate)
    // Patch form fields
    this.fileForm.patchValue({
      session: data.session,
      title: data.name,
      batchYear: data.batchYear,
      publishDate: formattedDate, // formatted
      semId: data.semId,
      sessionID: data.course.toString(), // or data.courseid if that's correct
    });

    // Set class variables
    this.courseid = data.course.toString();
    this.semId = data.semId;
    this.listId = data.id;

    // Scroll into view
    setTimeout(() => {
      this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    this.isUpdate = true;
  }



}
