import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-admin-photo',
  templateUrl: './admin-photo.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./admin-photo.component.scss']
})
export default class AdminPhotoComponent {
  albumForm: any;
  albumallForm: any;
  wfile: File | any = null;
  loader: boolean = false;
  loader1: boolean = false;
  albumList: any;
  selectedFile: any;
  albumAllList: any;
  imgURL = environment.imgUrl
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.getAlbum();
    this.getAlbumAll();
  }


  ngOnInit() {
    {
      this.albumForm = this.FB.group({
        title: ['', Validators.required],
        thumbnail: [null, Validators.required],
      })
      this.albumallForm = this.FB.group({
        file: ['', Validators.required],
        albumID: ['', Validators.required],
      })
    }
  }


  // Handle file selection
  onFileSelect(event: any, type: any) {
    const file = event.target.files[0];
    if (type === 'thumbnail') {
      if (file) {
        const allowedExtensions = ['jpg', 'png', 'jepg'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!allowedExtensions.includes(fileExtension!)) {
          this.service.ErrorSnackbar("Invalid file type. Only 'jpg', 'png', 'jepg' allowed.");
          return;
        }
        console.log(this.selectedFile, file)
        this.selectedFile = file;
        this.albumForm.patchValue({ thumbnail: file });
      }
    } else {
      if (file) {
        const allowedExtensions = ['jpg', 'png', 'jepg'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!allowedExtensions.includes(fileExtension!)) {
          this.service.ErrorSnackbar("Invalid file type. Only 'jpg', 'png', 'jepg' allowed.");
          return;
        }

        this.selectedFile = file;
        console.log(this.selectedFile, file)
        this.albumallForm.patchValue({ file: this.selectedFile });
      }
    }
  }

  handleAlbum(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected Album ID:', selectedValue);
    this.albumallForm.patchValue({ albumID: selectedValue });
  }

  // }



  handleSubmit() {
    if (this.albumForm.valid) {
      this.loader1 = true;
      const payLoad = {
        "title": this.albumForm.value.title,
        "thumbnail": this.selectedFile,
      }
      this.service.albumService(0, payLoad).subscribe((res: any) => {
        console.log(res.status)
        this.service.SuccessSnackbar(res.message);
        this.loader1 = false;
          this.getAlbum();
          this.albumAllList();
      }, (err) => {
        this.service.ErrorSnackbar(err.message);
        this.loader1 = false;
      });
    } else {
      this.service.ErrorSnackbar('Form is invalid');
    }
  }


  handleSubmit1() {
    if (this.albumallForm.valid) {
      this.loader = true;
      const payLoad = {
        "title": this.albumallForm.value.albumID,
        "file": this.selectedFile,
      }
      this.service.albumALlService(payLoad).subscribe((res: any) => {
        if (res.status) {
          this.getAlbum();
          this.getAlbumAll();
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

  getAlbum() {
    this.service.albumGet().subscribe((res: any) => {
      this.albumList = res;
    });
  }

  getAlbumAll() {
    this.service.albumGetAll().subscribe((res: any) => {
      this.albumAllList = res;
    });
  }
  handleDelete(id: number) {
    this.service.albumDelete(id).subscribe((res) => {
      this.getAlbum()
      this.getAlbumAll()
      this.service.SuccessSnackbar(res.message);
    }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    })
  }
}
