import { Component } from '@angular/core';
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
  fileForm: any = FormGroup;
  loader: boolean = false;
  List: any;
  imgUrl: any = environment.imgUrl;
  selectedFile: any;
  totalRecords: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;


  constructor(private service: ApiService, private FB: FormBuilder, public router: Router) {
    this.getFile();
  }

  ngOnInit() {
    this.fileForm = this.FB.group({
      file: [null, Validators.required],
      title: [null, Validators.required],
      url: [null, Validators.required],
      type: [null, Validators.required],
      session:[null, Validators.required]
    });
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

  onDateSelect(event: any) {
    const fullValue = event.target.value; // e.g., "2025-01"
    const year = fullValue.split('-')[0]; // Extract "2025"
    this.fileForm.patchValue({
      session: year
    });
    // this.fileForm.get('file')?.setValue(year);
  }

  handleSubmit() {
    this.loader = true;

    const payload = {
      file: this.selectedFile,
      title: this.fileForm.value.title,
      url: this.fileForm.value.url,
      type: this.fileForm.value.type,
      session: this.fileForm.value.session
    }
    this.service.affiliationService(payload).subscribe(
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


}
