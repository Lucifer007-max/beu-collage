import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-admin-media',
  templateUrl: './admin-media.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],

  styleUrls: ['./admin-media.component.scss']
})
export default class AdminMediaComponent {
  mediaForm: any;
  wfile: File | any = null;
  loader: boolean = false;
  mediaList: any; selectedFile: any;
  imgUrl = environment.imgUrl
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.getMedia();
  }


  ngOnInit() {
    {
      this.mediaForm = this.FB.group({
        file: [null, Validators.required],
      })
    }
  }


  // Handle file selection
  onFileSelect(event: any) {
    const file = event.target.files[0];

    if (file) {
      const allowedExtensions = ['png', 'jpg', 'jpeg'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!allowedExtensions.includes(fileExtension!)) {
        this.service.ErrorSnackbar("Invalid file type. Only PDF & DOCX allowed.");
        return;
      }

      console.log(file, this.selectedFile)
      this.selectedFile = file;
      this.mediaForm.patchValue({ file: this.selectedFile });
    }
  }

  handleSubmit() {
    if (this.mediaForm.valid) {
      this.loader = true;
      console.log(this.selectedFile)
      const payLoad = {
        "file": this.selectedFile,
      }
      this.service.MediaService(payLoad).subscribe((res: any) => {
        if (res.status) {
          this.getMedia();
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

  getMedia() {
    this.service.mediaGet().subscribe((res: any) => {
      this.mediaList = res;
    });
  }
  handleDelete(id: number) {
    this.service.pressDelete(id).subscribe((res) => {
      this.getMedia()
      this.service.SuccessSnackbar(res.message);
    }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    })
  }
}
