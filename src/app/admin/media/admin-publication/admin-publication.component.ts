import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-admin-publication',
  templateUrl: './admin-publication.component.html',
  standalone:true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./admin-publication.component.scss']
})
export default class AdminPublicationComponent {
  publicationForm: any;
  wfile: File | any = null;
  loader: boolean = false;
  publicationList:any;selectedFile:any;
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.getPress();
   }


  ngOnInit() {
    {
      this.publicationForm = this.FB.group({
        title: ['', Validators.required],
        file: [null, Validators.required],
      })
    }
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

      console.log(file, this.selectedFile)
      this.selectedFile = file;
      this.publicationForm.patchValue({ file: this.selectedFile });
    }
  }

  handleSubmit() {
    if (this.publicationForm.valid) {
      this.loader = true;
      console.log(this.selectedFile)
      const payLoad = {
        "pressTitle": this.publicationForm.value.title,
        "file": this.selectedFile,
      }
      this.service.PressService(payLoad).subscribe((res: any) => {
        if (res.status) {
          this.getPress();
          this.service.SuccessSnackbar(res.message);
        } else {
          this.service.ErrorSnackbar('Something went wrong...!!');
        }
        this.loader = false;
      }, (err) => {
        this.service.ErrorSnackbar(err.message);
        this.loader = false;
      });
    } else {
      this.service.ErrorSnackbar('Form is invalid');
    }
  }

  getPress() {
    this.service.pressGet().subscribe((res: any) => {
      this.publicationList = res;
    });
  }
  handleDelete(id:number){
    this.service.pressDelete(id).subscribe((res) => {
      this.getPress()
      this.service.SuccessSnackbar(res.message);
    } ,(err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
  })
  }

}
