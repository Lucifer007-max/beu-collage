import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ApiService } from 'src/service/api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, SharedModule, NgMultiSelectDropDownModule],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export default class AddCourseComponent {
  courseForm: any;
  dropdownList: any;
  selectedItems: any;
  dropdownSettings: any;
  wfile: File | any = null;
  tags: [] | any = [];
  courseList: any;
  loader: boolean = false;
  sloader: boolean = false;
  courseOptions: any = [];
  id: number = 0
  constructor(private service: ApiService, private FB: FormBuilder) { }
  ngOnInit() {
    {
      this.courseForm = this.FB.group({
        courseID: [null],
        session: ['', Validators.required],
      })
    }
    this.getSession()
    this.courseOptions = [
      { "id": 1, title: 'B.Tech' },
      { "id": 2, title: 'M.Tech' },
      { "id": 3, title: 'PHD' }
    ]
  }
  onItemSelect(item: any) {
    console.log(item.target.value);
    this.selectedItems = item.target.value
  }



  handleSubmit() {
    if (this.courseForm.valid) {
      this.sloader = true;
      const payLoad = {
        "courseID": this.selectedItems,
        "session": this.courseForm.value.session,
      }
      this.service.coursesession(payLoad, this.id).subscribe((res: any) => {
        if (res.status) {
          this.getSession();
          this.courseForm.reset()
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


  onFileSelect(event: any): void {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 100 * 1024) { // Size validation: 100KB
        this.service.ErrorSnackbar('File size exceeds 100KB');
        console.error("File size exceeds 100KB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          // if (img.width !== 300 || img.height !== 300) {
          //   this.service.ErrorSnackbar('Image dimensions are not 300x300 pixels');
          //   console.error("Image dimensions are not 300x300 pixels");
          //   return;
          // } else {
          this.wfile = file;
          console.log(this.wfile);
          this.courseForm.patchValue({
            courseImage: file
          });
          this.courseForm.get('courseImage')?.updateValueAndValidity();
          // }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  getSession() {
    this.service.coursesessionGet().subscribe((res: any) => {
      this.courseList = res;
      // console.log(res.length)
    })
  }

  handleDelete(id: number) {
    this.loader = true;
    this.service.courseDelete(id).subscribe((res) => {
      // console.log(res)
      this.getSession()
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
    console.log(data)
    this.courseForm.patchValue({
      session: data.session,
      courseID:data.courseID
    })
    this.id = data.id
    setTimeout(() => {
      this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    this.isUpdate = true
  }
}


