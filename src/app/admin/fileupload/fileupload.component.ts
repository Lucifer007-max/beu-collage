import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./fileupload.component.scss']
})
export default class FileuploadComponent {
  fileForm: any = FormGroup;
  loader: boolean = false;
  List: any;
  id: any;
  imgUrl: any = environment.imgUrl;
  selectedFile: any; // Store selected file
  loaders: boolean = false;
  selectedFileName: string = ''
  constructor(private service: ApiService, private FB: FormBuilder, public router: Router) {
    this.getFile();
    console.log(this.router.url.split('/')[2].split('-')[1].toUpperCase())
  }

  ngOnInit() {
    this.fileForm = this.FB.group({
      // file: [null, Validators.required],
      title: [null, Validators.required],
      desc: [null, Validators.required],
      docdate: [null],
      docnumber: [null],
      type: [this.router.url.split('/')[2].split('-')[1]], // Default type
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
      this.fileForm.patchValue({ file: file });
    }
  }

  // Upload File
  handleSubmit() {
    console.log(this.fileForm)
    if (this.fileForm.invalid) {
      this.service.ErrorSnackbar('Form is invalid or no file selected');
      return;
    }

    this.loader = true;
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append("file", this.selectedFile, this.selectedFile.name);
    }
    formData.append("type", this.fileForm.value.type);
    formData.append("title", this.fileForm.value.title);
    formData.append("desc", this.fileForm.value.desc);
    formData.append("docdate", this.fileForm.value.docdate);
    formData.append("docnumber", this.fileForm.value.docnumber);

    // Debugging: Check if FormData has values
    const payload = {
      file: this.selectedFile || this.selectedFileName,
      type: this.fileForm.value.type,
      title: this.fileForm.value.title,
      desc: this.fileForm.value.desc,
      docdate: this.fileForm.value.docdate,
      docnumber: this.fileForm.value.docnumber

    }
    const service = this.isUpdate ? this.service.fileUpdateService(this.id, payload) : this.service.fileService(payload)
    service.subscribe(
      (res: any) => {
        if (res.status) {
          this.service.SuccessSnackbar(res.message);
          this.fileForm.reset();
          this.selectedFile = null;
          this.getFile();
        } else {
          this.service.ErrorSnackbar('Something went wrong...!!');
        }
        this.loader = false;
      },
      (err) => {
        this.service.ErrorSnackbar(err.message);
        this.loader = false;
      }
    );
  }


  // Fetch files list
  getFile() {
    this.service.fileGetAdmin(this.router.url.split('/')[2].split('-')[1]).subscribe((res: any) => {
      this.List = res;
    });
  }



  handleDelete(id: number, value: number) {
    this.loaders = true;
    this.service.fileDelete(id, this.router.url.split('/')[2].split('-')[1], value).subscribe((res: any) => {
      this.List = res;
      this.loaders = false;
      this.getFile()
    });
  }
  @ViewChild('formSection') formSection!: ElementRef;
  isUpdate: boolean = false;

  handleEdit(data: any, type: any) {
    console.log(data)
    let selectedFile = '';
    switch (this.router.url.split('/')[2].split('-')[1]) {
      case 'acts':
        selectedFile = data.actsFile;
        break;
      case 'circular':
        selectedFile = data.circularFile;
        break;
      case 'notification':
        selectedFile = data.notificationFile;
        break;
      case 'downloads':
        selectedFile = data.downloadsFile;
        break;
      case 'minutes':
        selectedFile = data.minutesFile;
        break;
      case 'letter':
        selectedFile = data.letterFile;
        break;
      case 'curriculum':
        selectedFile = data.curriculumFile;
        break;
    }

    this.fileForm.patchValue({
      title: data.title,
      desc: data.desc,
      docdate: data.docdate,
      docnumber: data.docnumber,
      type: this.router.url.split('/')[2].split('-')[1]
    });
    this.id = data.id
    this.selectedFileName = selectedFile; // now this will have correct file name
    setTimeout(() => {
      this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    this.isUpdate = true
  }
}
