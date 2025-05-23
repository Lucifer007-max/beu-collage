import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-add-syllabus',
  templateUrl: './add-syllabus.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./add-syllabus.component.scss']
})
export default class AddSyllabusComponent {
  syllabus: any;
  // dropdownList: any;
  selectedItems: any;
  // dropdownSettings: any;
  // wfile: File | any = null;
  // tags: [] | any = [];
  courseList: any;
  loader: boolean = false;
  sloader: boolean = false;
  courseOptions: any = [];
  id: number = 0
  syllabusList: any;
  constructor(private service: ApiService, private FB: FormBuilder) { }
  ngOnInit() {
    {
      this.syllabus = this.FB.group({
        courseID: ['', Validators.required],
        branchCode: ['', Validators.required],
        branchName: ['', Validators.required],
      })
    }
    this.getSessionList();
    this.getSyllabusList();

    this.courseOptions = [
      { "id": 1, title: 'B.Tech' },
      { "id": 2, title: 'M.Tech' },
      { "id": 3, title: 'Ph.D' }
    ]
  }
  onItemSelect(item: any) {
    console.log(item.target.value);
    this.selectedItems = item.target.value
  }



  handleSubmit() {
    if (this.syllabus.valid) {
      this.sloader = true;
      const payLoad = {
        "courseID": this.selectedItems,
        "branchCode": this.syllabus.value.branchCode,
        "branchName": this.syllabus.value.branchName,
      }
      this.service.coursesyllabus(payLoad, this.id).subscribe((res: any) => {
        if (res.status) {
          this.getSessionList();
          this.getSyllabusList();
          this.syllabus.reset()
          this.service.SuccessSnackbar(res.message);
        } else {
          this.service.ErrorSnackbar('Something went wrong...!!');
        }
        this.sloader = false;
      }, (err) => {
        this.service.ErrorSnackbar(err.message);
        this.sloader = false;
      });
    } else {
      this.service.ErrorSnackbar('Form is invalid');
    }
  }



  getSessionList() {
    this.service.coursesessionGet().subscribe((res: any) => {
      this.courseList = res;
    })
  }

  getSyllabusList() {
    this.service.coursesyllabusGet().subscribe((res: any) => {
      this.syllabusList = res;

    })
  }
  handleDelete(id: number) {
    this.loader = true;
    this.service.courseSyllabus(id).subscribe((res) => {
      // console.log(res)
      // this.getSessionList()
      this.getSyllabusList();
      this.service.SuccessSnackbar(res.message);
      this.loader = false;
    }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    })
  }
  @ViewChild('formSection') formSection!: ElementRef;
  isUpdate: boolean = false;

  handleEdit(data: any) {
    console.log(data,this.syllabus)

    this.syllabus.patchValue({
      courseID: data.courseID,
      branchCode: data.branchCode,
      branchName: data.branchName
    })
    this.id = data.id
    setTimeout(() => {
      this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    this.isUpdate = true
  }
}
