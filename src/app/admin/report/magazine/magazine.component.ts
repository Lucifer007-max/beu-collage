import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  standalone: true,
  imports: [SharedModule, CommonModule],
  styleUrls: ['./magazine.component.scss']
})
export default class MagazineComponent {
  magzineForm: any;
  wfile: File | any = null;
  loader: boolean = false;
  annualreportList: any;
  selectedFile: any;
  selectedThumbnail: any;
  imgUrl:string = environment.imgUrl;
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.getMagzine();
  }


  ngOnInit() {
    {
      this.magzineForm = this.FB.group({
        thumbnail: ['', Validators.required],
        file: [null, Validators.required],
      })
    }
  }


  // Handle file selection
  onFileSelect(event: any, type: string) {
    const file = event.target.files[0];

    if (file) {

      if (type === 'file') {
        const allowedExtensions = ['pdf', 'docx'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (!allowedExtensions.includes(fileExtension!)) {
          this.service.ErrorSnackbar("Invalid file type. Only PDF & DOCX allowed.");
          return;
        }

        this.selectedFile = file;
        this.magzineForm.patchValue({ file: this.selectedFile });
      } else {
        const allowedExtensions = ['jpg', 'png','jpeg'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (!allowedExtensions.includes(fileExtension!)) {
          this.service.ErrorSnackbar("Invalid file type. Only jpg,png allowed.");
          return;
        }
        this.selectedThumbnail = file;
        this.magzineForm.patchValue({ thumbnail: this.selectedThumbnail });

      }
    }
  }

  handleSubmit() {
    if (this.magzineForm.valid) {
      this.loader = true;
      const payLoad = {
        "thumbnail": this.selectedThumbnail,
        "file": this.selectedFile,
      }
      this.service.MagzineService(payLoad).subscribe((res: any) => {
        if (res.status) {
          this.getMagzine();
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

  getMagzine() {
    this.service.magzineGet().subscribe((res: any) => {
      this.annualreportList = res;
    });
  }
  handleDelete(id: number) {
    this.service.magzineDelete(id).subscribe((res) => {
      this.getMagzine()
      this.service.SuccessSnackbar(res.message);
    }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    })
  }
}
