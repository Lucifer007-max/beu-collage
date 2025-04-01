import { Component } from '@angular/core';
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
  imgUrl: any = environment.imgUrl;
  selectedFile: any; // Store selected file

  constructor(private service: ApiService, private FB: FormBuilder, public router: Router) {
    this.getFile();
    console.log(this.router.url.split('/')[2].split('-')[1].toUpperCase())
  }

  ngOnInit() {
    this.fileForm = this.FB.group({
      file: [null, Validators.required],
      type: [this.router.url.split('/')[2].split('-')[1], Validators.required], // Default type
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
    if (this.fileForm.invalid || !this.selectedFile) {
      this.service.ErrorSnackbar('Form is invalid or no file selected');
      return;
    }

    this.loader = true;
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append("file", this.selectedFile, this.selectedFile.name);
    }
    formData.append("type", this.fileForm.value.type);

    // Debugging: Check if FormData has values
    // for (const) {
    console.log(this.selectedFile); // Properly logs key-value pairs
    // }
    const payload = {
      file: this.selectedFile,
      type: this.fileForm.value.type
    }
    this.service.fileService(payload).subscribe(
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
    this.service.fileGet(this.router.url.split('/')[2].split('-')[1]).subscribe((res: any) => {
      this.List = res;
    });
  }
}
