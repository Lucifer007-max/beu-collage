import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./mentor.component.scss']
})
export default class MerchandiseComponent {
  wfile: File | any = null;
  loader: boolean = false;
  testimonialList:any;
  mentorForm:any;
  mentorList:any
  imgUrl = environment.imgUrl
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.mentorGet();
   }


   ngOnInit() {
    this.mentorForm = this.FB.group({
      mentorImage: ['', Validators.required], // Image Upload
      mentortitle: ['', Validators.required], // Title
      role: ['', Validators.required], // Role
      position: ['', Validators.required], // Position
    });
  }
  handleDelete(id:number){
    this.service.merchandiesDelete(id).subscribe((res) => {
      // console.log(res)
      this.mentorGet()
      this.service.SuccessSnackbar(res.message);
      } ,(err) => {
        this.service.ErrorSnackbar(err.message);
        this.loader = false;
    })
  }



  handleSubmit() {
    if (this.mentorForm.valid) {
      this.loader = true;
      const payLoad = {
        "mentortitle": this.mentorForm.value.mentortitle,
        "mentorImage": this.mentorForm.value.mentorImage,
        "role": this.mentorForm.value.role,
        "position": this.mentorForm.value.position,
      }
      this.service.MnetorService(payLoad).subscribe((res: any) => {
        if (res.status) {
          this.service.SuccessSnackbar(res.message);
          this.mentorForm.reset()
          this.mentorGet()
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



  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mentorForm.patchValue({ mentorImage: file });
    }
  }

  mentorGet(){
    this.service.mentorGet().subscribe((res:any) => {
      this.mentorList = res
    })
  }
}
