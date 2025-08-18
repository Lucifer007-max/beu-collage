import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affilation',
  templateUrl: './affilation.component.html',
  imports: [CommonModule, SharedModule],
  standalone: true,
  styleUrls: ['./affilation.component.scss']
})
export default class AffilationComponent {
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

  selectedYear: number = new Date().getFullYear();
  years: string[] = [];


  constructor(private service: ApiService, private FB: FormBuilder, public router: Router) {
    this.getFile();
  }

  ngOnInit() {
    this.fileForm = this.FB.group({
      file: [null, Validators.required],
      title: [null, Validators.required],
      url: [null, Validators.required],
      type: [null, Validators.required],
      district: [null, Validators.required]
    });

    for (let year = 2023; year <= 2025; year++) {
      this.years.push(`${year}-${(year + 1).toString().slice(-2)}`);
    }


  }
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
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
    this.service.affiliationGetAdmin(page, pageSize).subscribe((res: any) => {
      this.List = res;
      this.totalRecords = res.totalRecords;
      this.currentPage = page;
      this.pageSize = pageSize;
    });
  }

  handleChange(e: any) {
    const selectedValue = e.target.value;
    this.fileForm.patchValue({
      type: selectedValue
    });

  }

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

  handleSubmit() {
    this.loader = true;

    const payload = {
      file: this.selectedFile || this.selectedFileName,
      title: this.fileForm.value.title,
      url: this.fileForm.value.url,
      type: this.fileForm.value.type,
      session: this.selectedYear || this.selectedSession,
      district : this.fileForm.value.district
    }
    // console.log(payload)
    const service = this.isUpdate ? this.service.affiliationUpdateService(payload, this.listId) : this.service.affiliationService(payload)
    service.subscribe(
      (res: any) => {
        if (res.status) {
          this.service.SuccessSnackbar(res.message);
          this.fileForm.reset();
          this.selectedFile = null;
          this.getFile();
        } else {
          this.service.ErrorSnackbar(res);
        }
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
    this.service.affiliationDelete(id, value).subscribe((res: any) => {
      this.List = res;
      this.loaders = false;
      this.getFile()
    });
  }


  handleEdit(data: any) {
    this.fileForm.patchValue({
      title: data.title,
      url: data.url,
      type: data.type,
    });
    this.selectedYear = data.session;
    console.log(data)
    this.listId = data.id
    this.selectedSession = data.session
    this.selectedFileName = data.file;
    setTimeout(() => {
      this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    this.isUpdate = true
  }


}
