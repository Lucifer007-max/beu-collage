import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone:true,
  imports:[SharedModule, CommonModule],
  styleUrls: ['./modal.component.scss']
})
export default class ModalComponent {

  imagePreview: string | ArrayBuffer | null = null;

  modalForm: any;
  wfile: File | any = null;
  loader: boolean = false;
  modalList: any; selectedFile: any;
  imgUrl = environment.imgUrl
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.getModal();
  }


  ngOnInit() {
    {
      this.modalForm = this.FB.group({
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

      // console.log(file, this.selectedFile)
      this.selectedFile = file;
      this.modalForm.patchValue({ file: this.selectedFile });
    }
    if (file) {
      this.modalForm.patchValue({ file: file });
      this.modalForm.get('file')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  handleSubmit() {
    if (this.modalForm.valid) {
      this.loader = true;
      // console.log(this.selectedFile)
      const payLoad = {
        "modalUrl": this.selectedFile,
      }
      this.service.ModalService(payLoad, 1).subscribe((res: any) => {
        if (res.status) {
          this.getModal();
          this.modalForm.reset();
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

  getModal() {
    // this.service.modalGet().subscribe((res: any) => {
      // });
      this.service.modalGet().subscribe((res: any) => {
        // if (res && res.file) {

          this.modalList = res;
        this.imagePreview = res.data[0].modalUrl;  // assuming it's a full image URL
        console.log(this.imagePreview)
        // this.modalForm.patchValue({ type: res.type || 'acts' });
      // }
    });
  }
  handleDelete(id: number) {
    this.service.modalDelete(id).subscribe((res) => {
      this.getModal()
      this.service.SuccessSnackbar(res.message);
    }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    })
  }



}
