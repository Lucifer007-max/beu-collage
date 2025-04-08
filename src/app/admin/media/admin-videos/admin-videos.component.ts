import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './admin-videos.component.html',
  standalone:true,
  imports: [CommonModule, SharedModule],
 styleUrls: ['./admin-videos.component.scss']
})
export default class AdminVideosComponent {
  videosForm: any;
  wfile: File | any = null;
  loader: boolean = false;
  videosList:any;
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.getVideos();
   }


  ngOnInit() {
    {
      this.videosForm = this.FB.group({
        url: ['', Validators.required],
      })
    }
  }
  handleSubmit() {
    if (this.videosForm.valid) {
      this.loader = true;
      const payLoad = {
        "videoURL": this.videosForm.value.url,
      }
      console.log(payLoad)
      this.service.videosService(0,payLoad).subscribe((res: any) => {
        if (res.status) {
          this.getVideos();
          this.service.SuccessSnackbar(res.message);
        } else {
          this.service.ErrorSnackbar(res || 'Something went wrong...!!');
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

  getVideos() {
    this.service.videosGet().subscribe((res: any) => {
      this.videosList = res;
    });
  }
  handleDelete(id:number){
    this.service.VideoDelete(id).subscribe((res) => {
      // console.log(res)
      this.getVideos()
      this.service.SuccessSnackbar(res.message);
    } ,(err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
  })
  }
}
